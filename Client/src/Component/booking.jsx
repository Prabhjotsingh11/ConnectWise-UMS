import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Booking = () => {
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.validToken);
  const navigate = useNavigate();
  if (!userEmail) navigate("/unauthorized");
  const { workerId } = useParams();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [description, setDescription] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const AlltimeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
  ];

  useEffect(() => {
    if (date) {
      bookedslots();
    }
  }, [date]);

  const filterAvailableSlots = (AlltimeSlots, booked) => {
    const filteredSlots = AlltimeSlots.filter((slot) => !booked.includes(slot));
    setAvailableSlots(filteredSlots);
  };

  const bookedslots = async () => {
    const url = `http://localhost:8080/booking/${workerId}/${date}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      filterAvailableSlots(AlltimeSlots, data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !timeSlot || !description) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const url = `http://localhost:8080/booking/${workerId}/${userEmail}`;
      const book = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          timeSlot,
          description,
        }),
      });

      const response = await book.json();
      setDate(""), setDescription(""), setTimeSlot("");
      navigate("/dashboard");
      // console.log(response);
    } catch (err) {
      console.log(err);
    }

    alert("Booking successful!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-xl shadow-lg bg-white w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#023047]">
          Book a Slot
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 📅 Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today.toISOString().split("T")[0]}
              max={maxDate.toISOString().split("T")[0]}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] transition-all text-gray-700"
              required
            />
          </div>

          {/* ⏰ Time Slot Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Time Slot
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] transition-all text-gray-700"
              required
            >
              <option value="" disabled>
                -- Select a Time Slot --
              </option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* ✍️ Work Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the work to be done"
              className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] transition-all text-gray-700"
              required
            ></textarea>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#023047] text-white font-bold py-3 rounded-lg hover:bg-[#eb5e28] transition-all"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
