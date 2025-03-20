import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-black">UNAUTHORIZED</h1>
      <p className="text-lg text-gray-700 mt-2">
        You do not have permission to view this page.
      </p>
      <p className="text-gray-500 mt-1">
        Please log in to access this content.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-2 bg-[#023047] text-white rounded-lg shadow hover:bg-[#eb5e28] transition-all duration-300 transform hover:scale-105"
      >
        Go to Login
      </button>
    </div>
  );
}
