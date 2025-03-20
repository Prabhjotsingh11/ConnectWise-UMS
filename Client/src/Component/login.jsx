import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Features/userSlice";
import { useNavigate, Link } from "react-router-dom";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess({ email: data.Email, token: data.token }));
        navigate("/home");
      } else {
        alert(data.error || "Login failed! Re-enter your credentials");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login failed! Re-enter your credentials");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffffff]">
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-xl border border-gray-300 mt-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#023047]">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
            />
          </div>
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#023047] text-white py-2 rounded-md hover:bg-[#d94c1f] transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#eb5e28] font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
          <p className="text-gray-700 mt-2">
            <Link
              to="/giglogin"
              className="text-[#eb5e28] font-medium hover:underline"
            >
              Login as gig
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
