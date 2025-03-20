const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const {
  jwtmiddlewareResident,
  jwtmiddlewareGigWorker,
  jwtmiddlewarevalidate,
  generateToken,
} = require("./jwt");
app.use(bodyParser.json());
const Prisma = new PrismaClient();

const port = process.env.PORT;

app.get("/", async (req, res) => {
  res.send("This is Home page");
});
app.post("/signup", async (req, res) => {
  try {
    const { email, password, name, flatnumber, address, contactnumber } =
      req.body;

    if (
      !email ||
      !password ||
      !name ||
      !flatnumber ||
      !address ||
      !contactnumber
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
      // Check if user already exists

    const existingUser = await Prisma.resident.findUnique({
      where: { Email: email },
    });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Create new resident
    const newResident = await Prisma.resident.create({
      data: {
        Email: email,
        Password: password,
        Name: name,
        FlatNumber: flatnumber,
        Address: address,
        ContactNumber: contactnumber,
      },
    });

    // console.log(email);
    const token = generateToken({ email: newResident.Email });

    // Send success response
    return res.status(201).send({ email: newResident.Email, token });
  } catch (err) {
    console.error("Error in /signup:", err);
    return res
      .status(500)
      .send("An error occurred while processing your request");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Prisma.resident.findUnique({
      where: {
        Email: email,
        // Password: password,
      },
    });
    if (!user || user.Password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const Email = user.Email;
    if (user) {
      const token = generateToken({ email });
      res.send({ token, Email });
    }
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "An error occurred while logging in" });
  } finally {
    await Prisma.$disconnect();
  }
});
app.post("/signup/gig", async (req, res) => {
  try {
    const { category, email, password, pricing, contactnumber } = req.body;

    if (!category || !email || !password || !pricing || !contactnumber) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await Prisma.gigWorkers.findUnique({
      where: {
        Email: email,
      },
    });

    if (user) {
      return res.status(400).send("User Already Exists");
    }

    const newWorker = await Prisma.gigWorkers.create({
      data: {
        Email: email,
        Password: password,
        Category: category,
        Pricing: pricing,
        ContactNumber: contactnumber,
        AvgRating: 0.0,
      },
    });

    const token = generateToken({ email: newWorker.Email });
    return res.status(201).json({ email: newWorker.Email, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while creating a gig worker.");
  } finally {
    await Prisma.$disconnect();
  }
});
app.post("/giglogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Prisma.gigWorkers.findUnique({
      where: {
        Email: email,
        // Password: password,
      },
    });

    if (!user || user.Password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const Email = user.Email;
    if (user) {
      const token = generateToken({ email });
      res.send({ token, Email });
    }
  } catch (err) {
    console.error("Error in /giglogin:", err);
    res.status(500).json({ error: "An error occurred while logging in" });
  } finally {
    await Prisma.$disconnect();
  }
});
app.get("/workers/:category", async (req, res) => {
  // console.log("AT BACKEND");
  const { category } = req.params;
  try {
    const worker = await Prisma.gigWorkers.findMany({
      where: {
        Category: {
          equals: category,
        },
      },
    });

    if (worker.length === 0) {
      return res.status(404).send("No Worker Available Currently");
    }
    // console.log(worker);
    res.json(worker);
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});
app.get("/booking/:workerId/:date", jwtmiddlewareResident, async (req, res) => {
  const { workerId, date } = req.params;
  // console.log(date);
  try {
    const bookings = await Prisma.query.findMany({
      where: {
        OperatorId: workerId,
        BookedDate: date.toString(),
      },
      select: {
        BookedSlot: true,
      },
    });

    const bookSlots = bookings.map((booking) => booking.BookedSlot.toString());
    // console.log(workerId);
    res.json(bookSlots);
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});
app.post("/booking/:workerId/:userEmail",jwtmiddlewareResident,async (req, res) => {
    const { workerId, userEmail } = req.params;
    // res.send('good')
    try {
      const { date, timeSlot, description } = req.body;
      const residentId = await Prisma.resident.findUnique({
        where: {
          Email: userEmail,
        },
        select: {
          ResidentId: true,
        },
      });
      const category = await Prisma.gigWorkers.findUnique({
        where: {
          WorkerId: workerId,
        },
        select: {
          Category: true,
        },
      });
      // console.log(workerId, userEmail, residentId, category);

      const newgig = await Prisma.query.create({
        data: {
          Category: category.Category,
          Description: description,
          BookedDate: date.toString(),
          BookedSlot: timeSlot.toString(),
          ResidentId: residentId.ResidentId,
          OperatorId: workerId,
        },
      });
      return res.json("booked");
    } catch (err) {
      console.log(err);
    } finally {
      await Prisma.$disconnect();
    }
  }
);

app.get("/dash/:email", jwtmiddlewareResident, async (req, res) => {
  // console.log("Bhai aa gaya");
  const { email } = req.params;
  try {
    const allbooking = await Prisma.query.findMany({
      where: {
        Resident: {
          Email: email,
        },
        Status: false,
      },
      select: {
        QueryId: true,
        Category: true,
        Description: true,
        BookedDate: true,
        BookedSlot: true,
        Gigoperator: {
          select: {
            Email: true,
          },
        },
      },
    });
    res.json({
      success: true,
      allbooking,
    });
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});

app.delete("/cancel/:gigId", jwtmiddlewareResident, async (req, res) => {
  const QueryId = req.params;
  console.log("delte kar rha hun bhai", QueryId);
  try {
    const dltgig = await Prisma.query.delete({
      where: {
        QueryId: QueryId.gigId,
      },
    });
    res.json(dltgig);
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});

app.get("/history/:email", jwtmiddlewareResident, async (req, res) => {
  // console.log("agay bhai");
  const { email } = req.params;
  try {
    const completedgigs = await Prisma.query.findMany({
      where: {
        Resident: {
          Email: email,
        },
        Status: true,
        reviewStatus: false,
      },
      select: {
        Category: true,
        QueryId: true,
        BookedDate: true,
        BookedSlot: true,
        Gigoperator: {
          select: {
            Email: true,
          },
        },
      },
    });
    res.json({
      completedgigs,
    });
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});
app.get("/completed_tickets/:email",jwtmiddlewareResident,async (req, res) => {
    const { email } = req.params;
    console.log("backend dost", email);
    try {
      const completedtickets = await Prisma.query.findMany({
        where: {
          Resident: {
            Email: email,
          },
          Status: true,
          reviewStatus: true,
        },
        select: {
          Category: true,
          Description: true,
          BookedDate: true,
          BookedSlot: true,
          Gigoperator: {
            select: {
              Email: true,
            },
          },
        },
      });
      res.json({ completedtickets });
    } catch (err) {
      console.log(err);
    } finally {
      await Prisma.$disconnect();
    }
  }
);
app.post("/rating/:useremail", jwtmiddlewareResident, async (req, res) => {
  // console.log("rating bhai");
  const useremail = req.params.useremail;
  const { rating, comment, gigemail, queryid } = req.body;
  try {
    await Prisma.reviewDetail.create({
      data: {
        GigId: queryid,
        WorkerEmail: gigemail,
        ResidentEmail: useremail,
        Rating: parseFloat(rating.toPrecision(2)),
        Comment: comment,
      },
    });

    await Prisma.query.update({
      where: {
        QueryId: queryid,
      },
      data: {
        reviewStatus: true,
      },
    });
    const reviews = await Prisma.reviewDetail.findMany({
      where: { WorkerEmail: gigemail },
      select: { Rating: true },
    });

    const totalRatings = reviews.length;
    const sumRatings = parseFloat(reviews.reduce((sum, review) => sum + review.Rating, 0)).toPrecision(2);
    const newAvgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    await Prisma.gigWorkers.update({
      where: { Email: gigemail },
      data: { AvgRating: newAvgRating },
    });

    res.json(queryid);
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});
app.get("/preview/:workerEmail", jwtmiddlewareResident, async (req, res) => {
  const { workerEmail } = req.params;
  // console.log(workerEmail);
  try {
    const data = await Prisma.reviewDetail.findMany({
      where: {
        WorkerEmail: workerEmail,
      },
      select: {
        GigId: true,
        ResidentEmail: true,
        WorkerEmail: true,
        Rating: true,
        Comment: true,
        CreatedAt: true,
      },
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});

app.get("/gigdash/:email", jwtmiddlewareGigWorker, async (req, res) => {
  const { email } = req.params;
  // console.log(email);
  // console.log("aaga bhai");
  try {
    const allbookings = await Prisma.query.findMany({
      where: {
        Gigoperator: {
          Email: email,
        },
        Status: false,
      },
      select: {
        QueryId: true,
        Category: true,
        Description: true,
        BookedDate: true,
        BookedSlot: true,
        Resident: {
          select: {
            Name: true,
            FlatNumber: true,
            Address: true,
            ContactNumber: true,
          },
        },
      },
    });
    res.json({
      success: true,
      allbookings,
    });
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});

app.put("/complete-gig/:QueryId", jwtmiddlewareGigWorker, async (req, res) => {
  // console.log("aagaya bhai")
  const { QueryId } = req.params;
  try {
    const gig = await Prisma.query.findUnique({
      where: { QueryId: QueryId },
    });

    if (!gig) {
      return res.status(404).json({ error: "Gig not found" });
    }

    const updatedGig = await Prisma.query.update({
      where: { QueryId: QueryId },
      data: { Status: true },
    });

    res.json({ message: "Gig marked as completed", updatedGig });
  } catch (err) {
    console.log(err);
  } finally {
    await Prisma.$disconnect();
  }
});
app.post("/validate-token",jwtmiddlewarevalidate,async(req,res)=>{
  res.status(200).json({ message: "Token validation complete" });
});
app.listen(port, () => {
  console.log(`Server running at PORT : ${port}`);
});
