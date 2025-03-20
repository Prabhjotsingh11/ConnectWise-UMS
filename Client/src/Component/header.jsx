import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white py-4 px-6 shadow-md border-b border-gray-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Left Section: App Name and Signed-in User */}
        <div className="flex flex-col">
          <h1
            className="text-4xl font-semibold tracking-wide drop-shadow-md"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            <span className="text-[#023047]">Connect</span>
            <span className="text-[#eb5e28]">Wise</span>
          </h1>

          {/* Display username if signed in */}
          {email && (
            <p className="text-sm text-gray-600 mt-1">
              Signed in as:{" "}
              <span className="font-medium text-[#023047]">{email}</span>
            </p>
          )}
        </div>

        {/* Login/Logout Button */}
        <button
          onClick={email ? handleLogout : handleLogin}
          className="px-5 py-2 text-white font-medium rounded-lg transition duration-300 shadow-md 
                 hover:shadow-lg bg-[#14213D] hover:bg-[#eb5e28]"
        >
          {email ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Header;
