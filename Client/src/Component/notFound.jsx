import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-5xl font-extrabold text-black drop-shadow-lg">
        NOT FOUND
      </h1>
      <p className="text-xl text-gray-800 mt-4 font-semibold">
        You don’t have permission to access this page.
      </p>
      <p className="text-gray-600 mt-2 max-w-md">
        Please log in with an authorized account to continue.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 px-6 py-3 bg-[#023047] text-white font-semibold rounded-lg shadow-md 
               hover:bg-[#eb5e28] transition-all duration-300 transform hover:scale-105"
      >
        Go to Login
      </button>
    </div>
  );
}
