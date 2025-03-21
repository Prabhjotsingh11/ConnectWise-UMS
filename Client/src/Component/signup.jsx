import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupSuccess } from "../Features/userSlice";

const SignupComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [flatnumber, setFlatnumber] = useState("");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactnumber] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-connectwise.prabhjotsingh.tech/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            name,
            flatnumber,
            address,
            contactnumber,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(signupSuccess({ email: data.email, token: data.token }));
        navigate("/home");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert("Signup failed");
      console.error("Error in signup:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffffff]">
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-xl border border-gray-300 mt-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#023047]">
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#eb5e28]"
              placeholder="Enter your name"
            />
          </div>

          {/* Flat Number */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Flat Number
            </label>
            <input
              type="text"
              value={flatnumber}
              onChange={(e) => setFlatnumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#eb5e28]"
              placeholder="Enter your flat number"
            />
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#eb5e28]"
              placeholder="Enter your address"
            />
          </div>

          {/* Contact Number */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              value={contactnumber}
              onChange={(e) => setContactnumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#eb5e28]"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#eb5e28]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#eb5e28]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#023047] text-white py-2 rounded-md hover:bg-[#d94c1f] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#eb5e28] font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
