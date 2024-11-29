import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  const salesChartData = {
    labels: stats.monthlySales.map((item) => item._id),
    datasets: [
      {
        label: "Total Sales ($)",
        data: stats.monthlySales.map((item) => item.totalSales),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const ordersChartData = {
    labels: stats.monthlySales.map((item) => item._id),
    datasets: [
      {
        label: "Total Orders",
        data: stats.monthlySales.map((item) => item.totalOrders),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-black mb-4">Welcome Admin!</h1>

      <div className="py-6">
        <Link
          to="/add-new-book"
          className="inline-block py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        >
          Add New Book
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{stats.totalOrders}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl">${stats.totalSales.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold">Trending Books</h2>
          <p className="text-2xl">{stats.trendingBooks}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Books</h2>
          <p className="text-2xl">{stats.totalBooks}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="p-4 bg-white rounded shadow mb-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales Overview</h2>
          <div className="chart-container" style={{ height: "400px" }}>
            <Bar data={salesChartData} options={chartOptions} />
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow flex-1">
          <h2 className="text-lg font-semibold mb-4">Monthly Orders Overview</h2>
          <div className="chart-container" style={{ height: "400px" }}>
            <Bar data={ordersChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
