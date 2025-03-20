import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user?.email);

  useEffect(() => {
    if (!email) {
      navigate("/unauthorized");
    }
  }, [email]);

  const showWorker = (category) => {
    navigate(`/all/${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 text-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6 flex-wrap gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/history")}
            className="px-6 py-2 border border-[#eb5e28] text-[#eb5e28] rounded-md hover:bg-[#eb5e28] hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Review Bookings
          </button>
          <button
            onClick={() => navigate("/completed_tickets")}
            className="px-6 py-2 border border-[#eb5e28] text-[#eb5e28] rounded-md hover:bg-[#eb5e28] hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Completed Tickets
          </button>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 border border-[#eb5e28] text-[#eb5e28] rounded-md hover:bg-[#eb5e28] hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
        >
          Upcoming Bookings
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-6 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#023047]">What We Do</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            We offer essential utility management services to make your life
            easier. Whether it’s electrical work, plumbing, or general
            maintenance, our trusted professionals are here to help.
          </p>
        </section>

        {/* Services Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#023047]">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Electrician Service",
                desc: "Expert electrical maintenance and repair for your home.",
                category: "electrician",
              },
              {
                title: "Plumber Service",
                desc: "Reliable plumbing solutions at your fingertips.",
                category: "plumber",
              },
              {
                title: "HVAC Service",
                desc: "Professional heating, ventilation, and air conditioning services.",
                category: "HVAC",
              },
            ].map((service, index) => (
              <div
                key={index}
                onClick={() => showWorker(service.category)}
                className="p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-[#023047] to-[#035c8a] text-white"
              >
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-lg">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Learn More Button */}
      <div className="flex justify-center py-6">
        <button
          onClick={() => navigate("/aboutus")}
          className="px-6 py-3 bg-gradient-to-r from-[#eb5e28] to-[#d44a1f] text-white rounded-md hover:from-[#d44a1f] hover:to-[#eb5e28] transition-all duration-300 transform hover:scale-105"
        >
          About Us
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;
