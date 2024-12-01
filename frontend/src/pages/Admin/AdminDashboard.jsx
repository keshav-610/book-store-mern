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
  import { IoMdAdd } from "react-icons/io";
  import { MdManageSearch } from "react-icons/md";

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const response = await fetch("https://book-store-mern-backend-navy.vercel.app/api/admin");
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
        <h1 className="text-4xl font-extrabold mb-4">Book Store Dashboard</h1>
        <div className="py-10 flex justify-center gap-32">
          <div>
            <Link
              to="/dashboard/add-new-book"
              className="flex flex-row items-center border p-2.5 w-fit rounded-lg border-green-600 text-green-600 hover:text-white hover:bg-green-700 transition-all duration-200 "
            >
              <IoMdAdd className="mr-2 text-lg" />
              Add New Book
            </Link>
          </div>
          <div>
            <Link
              to="/dashboard/manage-books"
              className="flex flex-row items-center border p-2.5 w-fit rounded-lg border-violet-500 text-violet-600 hover:text-white hover:bg-violet-700 transition-all duration-200"
            >
              <MdManageSearch className="mr-2 text-lg" />
              Manage Books</Link>
          </div>
        </div>



        <div className="flex justify-evenly mb-10">
          <div>
            <h1 className="mb-2 text-5xl font-bold text-center">{stats.totalOrders}</h1>
            <h3 className="text-gray-500 text-xl text-center">Total Orders</h3>
          </div>
          <div>
            <h1 className="mb-2 text-5xl font-bold text-center">${stats.totalSales.toFixed(2)}</h1>
            <h3 className="text-gray-500 text-xl text-center">Total Sales</h3>
          </div>
          <div>
            <h1 className="mb-2 text-5xl font-bold text-center">{stats.trendingBooks}</h1>
            <h3 className="text-gray-500 text-xl text-center">Trending Books</h3>
          </div>
          <div>
            <h1 className="mb-2 text-5xl font-bold text-center">{stats.totalBooks}</h1>
            <h3 className="text-gray-500 text-xl text-center">Total Books</h3>
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
