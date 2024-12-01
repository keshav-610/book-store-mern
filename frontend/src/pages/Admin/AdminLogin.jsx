import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://book-store-mern-backend-navy.vercel.app/api/auth/admin", {
                username,
                password,
            });

            localStorage.setItem("adminToken", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error: ", error);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-12 rounded-lg shadow-lg w-1/3"> {/* Increased width */}
                <h2 className="text-3xl font-semibold text-center mb-8">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-lg font-bold text-gray-700" htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-700" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            autoComplete="off"
                        />
                    </div>

                    {error && <p className="text-red-600 text-lg text-center mb-6">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all duration-300 text-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
