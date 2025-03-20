import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Tickets = () => {
  const email = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  const navigate = useNavigate();
  // console.log(token);
  if (!email) navigate(`/unauthorized`);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/completed_tickets/${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setHistoryData(data.completedtickets || []);
      } catch (err) {
        console.error("Error fetching history data:", err);
      }
    };

    fetchHistoryData();
  }, [email]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-sans text-[#023047] mb-4 animate-fade-in">
        Completed Tickets
      </h2>

      {historyData.length === 0 ? (
        <p className="text-gray-500">No completed tickets found.</p>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 animate-slide-up">
          {historyData.map((ticket, index) => (
            <div
              key={index}
              className="border-b border-gray-300 p-3 last:border-none transition-all duration-300 hover:bg-gray-100 rounded-md"
            >
              <h3 className="text-xl font-medium text-[#023047]">
                {ticket.Category}
              </h3>
              <p className="text-gray-700">{ticket.Description}</p>
              <p className="text-sm text-gray-500">
                {ticket.BookedDate} • {ticket.BookedSlot}
              </p>
              <p className="text-sm text-[#eb5e28] font-semibold">
                Operator: {ticket.Gigoperator.Email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;
