import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const Workers = () => {
  let { category } = useParams();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user?.email);
  const token = useSelector((state) => state.user?.validToken);
  useEffect(() => {
    if (!email) {
      navigate("/unauthorized");
    }
  }, [email]);

  const [AllWorker, setAllWorker] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search worker
  const [sortOrder, setSortOrder] = useState("desc"); // 📊 Sort rating
  const [priceRange, setPriceRange] = useState([0, 200]); // 💰 Pricing filter
  const [currentPage, setCurrentPage] = useState(1);
  const workersPerPage = 6; // 📄 Pagination limit

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/workers/${category}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAllWorker(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (category) fetchWorkers();
  }, [category]);

  // 🔍 Search filter
  const filteredWorkers = AllWorker.filter(
    (worker) =>
      worker.Email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      worker.Pricing >= priceRange[0] &&
      worker.Pricing <= priceRange[1]
  );

  // 📊 Sorting by rating
  const workersCopy = [...filteredWorkers];

  // Sort the copied array based on AvgRating
  const sortedWorkers = workersCopy.sort((workerA, workerB) => {
    // Determine the sorting order:
    // If sortOrder is "asc" (ascending), set orderFactor to 1
    // If sortOrder is "desc" (descending), set orderFactor to -1
    const orderFactor = sortOrder === "asc" ? 1 : -1;

    // Compare the AvgRating values of workerA and workerB
    // If orderFactor is 1, it will sort in ascending order
    // If orderFactor is -1, it will sort in descending order
    return orderFactor * (workerA.AvgRating - workerB.AvgRating);
  });

  // 📄 Pagination logic
  const startIndex = (currentPage - 1) * workersPerPage;
  const currentWorkers = sortedWorkers.slice(
    startIndex,
    startIndex + workersPerPage
  );

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedWorkers.length / workersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white text-[#023047] rounded-xl shadow-lg">
      <h1 className="text-3xl font-sans text-center mb-6 tracking-wide text-[#eb5e28]">
        {category} hirelings
      </h1>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by email"
          className="flex-1 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] transition-all text-[#023047] placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 📊 Sort Dropdown */}
        <select
          className="ml-4 p-3 bg-gray-100 border border-gray-300 rounded-lg text-[#023047] cursor-pointer focus:ring-2 focus:ring-[#eb5e28]"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Sort by Rating: Low → High</option>
          <option value="desc">Sort by Rating: High → Low</option>
        </select>

        {/* 💰 Price Filter */}
        <div className="ml-4 flex items-center space-x-3">
          <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            className="w-32 h-2 bg-gray-300 rounded-lg cursor-pointer accent-[#eb5e28]"
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Workers List */}
      {currentWorkers.length === 0 ? (
        <div className="text-center text-gray-500">Loading Data...</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentWorkers.map((worker) => (
            <div
              key={worker.WorkerId}
              className="p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <h2 className="text-lg font-semibold">{worker.Email}</h2>
              <p className="text-gray-600">📞 {worker.ContactNumber}</p>
              <p className="text-gray-600">💰 ₹{worker.Pricing}/hr</p>
              <p className="text-[#eb5e28] font-semibold">
                ⭐ {worker.AvgRating.toPrecision(2)}/5
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => navigate(`/preview/${worker.Email}`)}
                  className="px-4 py-2 bg-[#023047] text-white rounded-lg hover:bg-[#021c30] transition-all"
                >
                  Preview
                </button>

                <button
                  onClick={() => navigate(`/booking/${worker.WorkerId}`)}
                  className="px-4 py-2 bg-[#023047] text-white rounded-lg hover:bg-[#021c30] transition-all"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-[#eb5e28] rounded-lg hover:bg-[#023047] transition-all mx-2 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">{`Page ${currentPage}`}</span>
        <button
          onClick={nextPage}
          disabled={
            currentPage >= Math.ceil(sortedWorkers.length / workersPerPage)
          }
          className="px-4 py-2 bg-gray-200 text-[#eb5e28] rounded-lg hover:bg-[#023047] transition-all mx-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Workers;
