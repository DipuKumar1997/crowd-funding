import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProjectDetails from "../pages/ProjectDetails";
import CreateProject from "../pages/CreateProject";
import Dashboard from "../pages/Dashboard";
import AdminPanel from "../pages/AdminPanel.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const AppRoutes = () => {
      const { user } = useAuth();

  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route  path="/admin"  element={   <ProtectedRoute role="ROLE_ADMIN"> <AdminPanel /> </ProtectedRoute> } />
          {/*<Route path="/admin"   element={ <ProtectedRoute role="ROLE_ADMIN"> <AdminPanel /> </ProtectedRoute>  } />*/}
          {/*<Route  path="/admin"  element={user?.role === "ROLE_ADMIN" ? <AdminPanel /> : <Navigate to="/" />} />*/}
          {/*<Route path="/admin"  element={ user?.role === "ADMIN" ? <AdminPanel /> : <Navigate  to="/" /> } />*/}
      </Routes>
  );
};

export default AppRoutes;