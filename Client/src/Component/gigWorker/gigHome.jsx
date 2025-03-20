import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GigHome = () => {
  const email = useSelector((state) => state.user?.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/unauthorized");
    }
  }, [email]);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#023047] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Hey GIG!</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => navigate("/gigdashboard")}
                  className="px-6 py-2 border border-[#eb5e28] text-[#eb5e28] rounded-md 
                        hover:bg-[#eb5e28] hover:text-white transition duration-300 shadow-md"
                >
                  View Bookings
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            A modern and responsive platform for managing your gigs efficiently.
          </p>
          <button
            onClick={() => navigate("/gigdashboard")}
            className="px-6 py-3 bg-[#023047] text-white font-semibold rounded-lg shadow-lg 
                   hover:bg-[#eb5e28] transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#023047] text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2025 <span className="font-bold">ConnectWise</span>. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GigHome;
