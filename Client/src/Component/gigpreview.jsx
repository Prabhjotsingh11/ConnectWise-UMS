import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Gigpreview = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  const { workerEmail } = useParams();
  // console.log(workerEmail);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) navigate(`/unauthorized`);
    const fetchData = async () => {
      try {
        const url = `http://localhost:8080/preview/${workerEmail}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure correct casing
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workerEmail) fetchData();
  }, [workerEmail]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-900 p-4">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-sans text-center mb-6 text-[#023047] animate-fade-in">
          Hireling's Preview
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-[#023047] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : data && data.length > 0 ? (
          <div className="space-y-4">
            {data.map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 p-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-slide-up"
              >
                <p>
                  <span className="text-[#eb5e28] font-semibold">
                    Resident Email:
                  </span>{" "}
                  {review.ResidentEmail}
                </p>
                <p>
                  <span className="text-[#eb5e28] font-semibold">
                    Worker Email:
                  </span>{" "}
                  {review.WorkerEmail}
                </p>
                <p>
                  <span className="text-[#eb5e28] font-semibold">Rating:</span>{" "}
                  ⭐ {review.Rating}/5
                </p>
                <p>
                  <span className="text-[#eb5e28] font-semibold">Comment:</span>{" "}
                  {review.Comment}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="text-[#eb5e28] font-semibold">
                    Created At:
                  </span>{" "}
                  {new Date(review.CreatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Gigpreview;
