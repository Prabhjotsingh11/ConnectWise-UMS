import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user?.validToken);
  // console.log(token);
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://backend-connectwise.prabhjotsingh.tech/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          if (data.role === "resident") {
            navigate("/home");
          } else if (data.role === "gig") {
            navigate("/gighome");
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error validating token:", error);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
      {/* Heading with fade-in animation */}
      <motion.h1
        className="text-5xl font-bold text-[#023047] drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-[#EB5E28]">ConnectWise</span>
      </motion.h1>

      {/* Description with staggered animations */}
      <motion.p
        className="text-lg text-gray-700 mt-6 max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        ConnectWise is a seamless platform that connects{" "}
        <span className="text-[#EB5E28] font-medium">
          new and existing residents
        </span>{" "}
        with{" "}
        <span className="text-[#023047] font-medium">skilled gig workers</span>.
      </motion.p>

      <motion.p
        className="text-lg text-gray-700 mt-4 max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Whether you need help with{" "}
        <span className="text-[#EB5E28] font-medium">
          electricity, plumbing, or HVAC
        </span>
        , our expert professionals are here to assist you.
      </motion.p>

      <motion.p
        className="text-lg text-gray-600 mt-4 max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Browse gig workers, check ratings and reviews, and book services at{" "}
        <span className="text-[#023047] font-medium">your convenience</span>.
      </motion.p>

      {/* Animated Get Started button */}
      <motion.button
        onClick={() => navigate("/aboutus")}
        className="mt-8 px-8 py-3 bg-[#EB5E28] text-white font-medium rounded-lg shadow-lg hover:bg-[#023047] transition"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        Get Started
      </motion.button>
    </div>
  );
}
