import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Features/userSlice";
import { useNavigate, Link } from "react-router-dom";

const GigLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/giglogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      // console.log(email);
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess({ email: data.Email, token: data.token }));
        navigate("/gighome");
      } else {
        alert(data.error || "Login failed! Re-enter your credentials");
      }
      setEmail("");
      setPassword("");
      // console.log(uname);
    } catch (error) {
      alert("Login failed! Re-enter your credentials");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#023047]">
          Gig Login
        </h2>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#023047] text-white py-2 rounded-md hover:bg-[#012a3b] transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/gigsignup" className="text-[#eb5e28] hover:underline">
              Sign up as a new Gig Worker
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GigLogin;
