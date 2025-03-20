import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const History = () => {
  const email = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate("/unauthorized");
    const url = `http://localhost:8080/history/${email}`;

    const fetchHistoryData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setHistoryData(data.completedgigs || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistoryData();
  }, [email]);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-center text-[#023047] mb-6 animate-fade-in">
        Your Completed Gigs
      </h2>

      {historyData.length === 0 ? (
        <p className="text-gray-600 text-center animate-fade-in">
          No completed gigs yet.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {historyData.map((gig) => (
            <div
              key={gig.QueryId}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
            >
              <h3 className="text-xl font-semibold text-[#023047]">
                {gig.Category}
              </h3>
              <p className="text-gray-700 mt-1">
                {new Date(gig.BookedDate).toDateString()} at {gig.BookedSlot}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Handled by:{" "}
                <span className="text-[#eb5e28] font-medium">
                  {gig.Gigoperator?.Email || "Unknown"}
                </span>
              </p>

              <button
                onClick={() => {
                  navigate(`/review/${gig.Gigoperator.Email}/${gig.QueryId}`);
                }}
                className="mt-4 px-4 py-2 bg-[#023047] text-white rounded-md shadow hover:bg-[#eb5e28] transition-all duration-300"
              >
                Leave a Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
