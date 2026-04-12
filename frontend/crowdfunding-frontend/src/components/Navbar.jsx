import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fafafa",
      }}
    >
      {/* Left Side */}
      <div>
        <Link to="/" style={{ marginRight: "15px", fontWeight: "bold" }}>
          CrowdFund
        </Link>

        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>

        {/* ✅ Visible only when logged in */}
        {user && (
          <>
            <Link to="/create" style={{ marginRight: "10px" }}>
              Create Campaign
            </Link>

            <Link to="/dashboard" style={{ marginRight: "10px" }}>
              Dashboard
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div>
        {!user ? (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              Login
            </Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome 👋
            </span>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;