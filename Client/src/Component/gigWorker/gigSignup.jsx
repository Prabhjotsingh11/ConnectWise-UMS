import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupSuccess } from "../../Features/userSlice";

const GigWorkerSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pricing, setPricing] = useState("");
  const [contactnumber, setContactnumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup/gig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          email,
          password,
          pricing: parseInt(pricing, 10),
          contactnumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(signupSuccess({ email: data.email, token: data.token }));
        navigate("/GigHome");
      } else {
        alert(data.error || "Signup failed");
        console.error("Signup failed");
      }
    } catch (error) {
      alert("Signup failed");
      console.error("Error in gig signup:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-5 text-center text-[#023047]">
        Gig Signup
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
            required
          >
            <option value="" disabled>
              Select your category
            </option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="HVAC">
              HVAC (Heating, Ventilation, and Air Conditioning)
            </option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <label
            htmlFor="pricing"
            className="block text-sm font-medium text-gray-700"
          >
            Pricing (INR)
          </label>
          <input
            type="number"
            id="pricing"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
            placeholder="Enter your pricing per hour"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label
            htmlFor="contactnumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="contactnumber"
            value={contactnumber}
            onChange={(e) => setContactnumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-[#023047] text-white p-2 rounded hover:bg-[#012a3b] transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default GigWorkerSignup;
