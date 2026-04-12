import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // ⏳ wait until user loads from localStorage
  if (user === null) {
    return <div>Loading...</div>; // or Loader component
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;