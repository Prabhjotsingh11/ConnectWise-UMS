import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const email = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  const navigate = useNavigate();
  if (!email) navigate(`/unauthorized`);
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const url = `http://localhost:8080/dash/${email}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure correct casing
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log("Dashboard Data:", data.allbooking);
        setDashboardData(data.allbooking);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  const handleReschedule = (gigId) => {
    alert(`Reschedule feature coming soon for Gig ID: ${gigId}`);
  };

  // const handlePayNow = (gigId) => {
  //   alert(`Redirecting to payment for Gig ID: ${gigId}`);
  // };

  const handleCancelBooking = async (gigId) => {
    // const confirmCancel = window.confirm(
    //   "Are you sure you want to cancel this booking?"
    // );
    const url = `http://localhost:8080/cancel/${gigId}`;
    const Cancelgig = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Ensure correct casing
        "Content-Type": "application/json",
      },
    });

    if (Cancelgig.ok) {
      alert(`Booking cancelled for Gig ID: ${gigId}`);
      const updatedData = dashboardData.filter((gig) => gig.QueryId !== gigId);
      setDashboardData(updatedData);
    } else {
      alert(
        `There is some issue at our side for cancelling request for Gig ID: ${gigId}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#023047] animate-fade-in">
        Upcoming Tickets
      </h1>

      {dashboardData.length > 0 ? (
        <div className="space-y-6 max-w-3xl mx-auto">
          {dashboardData.map((gig, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slide-up"
            >
              <h2 className="text-2xl font-semibold text-[#023047]">
                {gig.Category}
              </h2>
              <p className="text-gray-600 mt-2">
                <span className="font-bold text-[#eb5e28]">Description:</span>{" "}
                {gig.Description}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#eb5e28]">Booked Date:</span>{" "}
                {gig.BookedDate}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#eb5e28]">Booked Slot:</span>{" "}
                {gig.BookedSlot}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#eb5e28]">
                  Gig Operator Email:
                </span>{" "}
                {gig.Gigoperator.Email}
              </p>

              {/* Buttons */}
              <div className="mt-4 space-x-4">
                <button
                  className="bg-[#023047] text-white px-4 py-2 rounded-lg hover:bg-[#03466F] transition-all duration-200"
                  onClick={() => handleReschedule(gig.QueryId)}
                >
                  Reschedule
                </button>
                <button
                  className="bg-[#eb5e28] text-white px-4 py-2 rounded-lg hover:bg-[#fc7b49] transition-all duration-200"
                  onClick={() => handleCancelBooking(gig.QueryId)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Available Data Currently</p>
      )}
    </div>
  );
};

export default Dashboard;
