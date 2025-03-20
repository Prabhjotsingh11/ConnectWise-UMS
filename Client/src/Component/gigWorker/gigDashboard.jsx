import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GigDashboard = () => {
  const email = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/unauthorized");
    }
  }, [email]);
  const [gigDashboard, setGigDashboard] = useState([]);

  useEffect(() => {
    if (!email) return;

    const fetchDashboard = async () => {
      const url = `http://localhost:8080/gigdash/${email}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log(data.allbookings);
        setGigDashboard(data.allbookings);
      } catch (err) {
        console.error("Error fetching gig dashboard:", err);
      }
    };

    fetchDashboard();
  }, [email]);

  const markAsComplete = async (QueryId) => {
    // console.log(QueryId);
    try {
      const url = `http://localhost:8080/complete-gig/${QueryId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedData = gigDashboard.filter(
          (gig) => gig.QueryId !== QueryId
        );
        setGigDashboard(updatedData);
      }
    } catch (err) {
      console.error("Error marking gig as complete:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-sans text-gray-800 mb-6 text-center">
        Gig Dashboard
      </h2>

      {gigDashboard.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">No bookings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gigDashboard.map((gig) => (
            <div
              key={gig.QueryId}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 
                     transition-transform hover:scale-105 duration-300"
            >
              <h3 className="text-xl font-semibold text-[#023047]">
                {gig.Category}
              </h3>
              <p className="text-gray-600 mt-2">{gig.Description}</p>

              <div className="mt-4 text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Booked Date:</span>{" "}
                  {gig.BookedDate}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {gig.BookedSlot}
                </p>
              </div>

              <div className="mt-4 border-t pt-4 text-gray-800">
                <h4 className="text-lg font-semibold text-[#eb5e28]">
                  Resident Details
                </h4>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {gig.Resident.Name}
                </p>
                <p>
                  <span className="font-semibold">Mobile:</span>{" "}
                  {gig.Resident.ContactNumber}
                </p>
                <p>
                  <span className="font-semibold">Flat No:</span>{" "}
                  {gig.Resident.FlatNumber}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {gig.Resident.Address}
                </p>
              </div>

              <button
                onClick={() => markAsComplete(gig.QueryId)}
                className={`mt-4 w-full px-4 py-2 rounded-md font-semibold transition-all 
                        ${
                          gig.Status === "true"
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-[#023047] text-white hover:bg-[#eb5e28]"
                        }`}
                disabled={gig.Status === "true"}
              >
                {gig.Status === "true" ? "Completed" : "Mark as Complete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigDashboard;
