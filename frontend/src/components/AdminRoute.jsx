import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/access-denied" />; // Redirect unauthorized users
  }

  return <Outlet />;
};

export default AdminRoute;
