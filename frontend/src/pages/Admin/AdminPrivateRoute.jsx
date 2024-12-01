import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
    const token = localStorage.getItem("adminToken");

    console.log("Admin token from localStorage:", token);

    // If no token is found, redirect to /admin
    if (!token) {
        console.log("No admin token found. Redirecting to /admin.");
        return <Navigate to="/admin" />;
    }

    try {
        // Decode the JWT token
        const user = JSON.parse(atob(token.split('.')[1]));
        console.log("Decoded user from token:", user);

        // Log the entire decoded payload to see its structure
        console.log("Decoded JWT Payload:", user);

        // Retrieve the username from the token (the correct key is 'username')
        const userName = user?.username;  // Change from `name` to `username`
        console.log("User's username from token:", userName);

        // Check if the token is expired
        const isTokenExpired = user?.exp < Date.now() / 1000;
        if (isTokenExpired) {
            console.log("Token has expired. Redirecting to /admin.");
            return <Navigate to="/admin" />;
        }

    } catch (error) {
        console.log("Error decoding token:", error.message);
        return <Navigate to="/admin" />;
    }

    // If the token is valid, render the protected route
    console.log("Admin token is valid. Rendering the protected route.");
    return <Outlet />;
};

export default AdminPrivateRoute;
