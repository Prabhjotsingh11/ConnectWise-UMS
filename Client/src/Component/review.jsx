import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { gigemail, queryid } = useParams();
  const useremail = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  useEffect(() => {
    if (!useremail) {
      navigate("/unauthorized");
    }
  }, [useremail]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { rating, comment, gigemail, queryid };
    // console.log(useremail);
    try {
      const url = `http://localhost:8080/rating/${useremail}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setComment("");
        setRating(0);
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="p-6 max-w-md w-full bg-white rounded-2xl shadow-lg text-[#023047] border border-gray-300">
        <h2 className="text-xl font-semibold text-center mb-4">
          Rate Your Experience
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                star <= rating ? "text-[#eb5e28] scale-110" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eb5e28]"
          placeholder="Leave a comment..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-[#023047] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#eb5e28] transition-all duration-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
