import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
    const token = localStorage.getItem("adminToken");

    console.log("Admin token from localStorage:", token);

    if (!token) {
        console.log("No admin token found. Redirecting to /admin.");
        return <Navigate to="/admin" />;
    }

    try {
        const user = JSON.parse(atob(token.split('.')[1]));
        console.log("Decoded user from token:", user);

        console.log("Decoded JWT Payload:", user);

        const userName = user?.username;
        console.log("User's username from token:", userName);

        const isTokenExpired = user?.exp < Date.now() / 1000;
        if (isTokenExpired) {
            console.log("Token has expired. Redirecting to /admin.");
            return <Navigate to="/admin" />;
        }

    } catch (error) {
        console.log("Error decoding token:", error.message);
        return <Navigate to="/admin" />;
    }

    console.log("Admin token is valid. Rendering the protected route.");
    return <Outlet />;
};

export default AdminPrivateRoute;
