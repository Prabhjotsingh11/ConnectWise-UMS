const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET;

const jwtmiddlewareResident = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  // console.log(authHeader);

  if (!token) {
    res.send("NO Token Found");
    return;
  }
  try {
    const residentemail = jwt.verify(token, Secret);
    const user = await Prisma.resident.findUnique({
      where: { Email: residentemail.user.email },
    });
    // console.log("bhai");

    if (!user) {
      return res.status(403).json({ error: "Invalid resident user." });
    }
    req.residentemail = residentemail;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
const jwtmiddlewareGigWorker = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Use lowercase "authorization"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.send("NO Token Found");
    return;
  }

  try {
    const workeremail = jwt.verify(token, Secret);
    // console.log(workeremail.user.email);
    const worker = await Prisma.gigWorkers.findUnique({
      where: { Email: workeremail.user.email },
    });

    if (!worker) {
      return res.status(403).json({ error: "Invalid gig worker." });
    }

    req.workeremail = workeremail;
    next();
  } catch (err) {
    console.log(err);
  }
};

const jwtmiddlewarevalidate = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Use lowercase "authorization"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.send("NO Token Found");
    return;
  }

  try {
    const email = jwt.verify(token, Secret);
    // console.log(email);
    let user = await Prisma.gigWorkers.findUnique({
      where: { Email: email.user.email },
    });
    if (user) {
      return res.status(200).json({ valid: true, role: "gig" });
    }

    user = await Prisma.resident.findUnique({
      where: { Email: email.user.email },
    });
    if (user) {
      return res.status(200).json({ valid: true, role: "resident" });
    }

    return res.status(401).json({ valid: false, message: "User not found" });
  } catch (err) {
    return res
      .status(401)
      .json({ valid: false, message: "Token expired or invalid" });
  }
};

const generateToken = (useremail) => {
  return jwt.sign({ user: useremail }, Secret, { expiresIn: 1800 });
};

module.exports = {
  generateToken,
  jwtmiddlewareResident,
  jwtmiddlewareGigWorker,
  jwtmiddlewarevalidate,
};
