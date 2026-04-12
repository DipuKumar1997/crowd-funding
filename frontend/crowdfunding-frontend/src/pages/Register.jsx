// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axios";
//
// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", form); // Adjust URL to match your backend
//       alert("Registration successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert("Registration failed.");
//     }
//   };
//
//   return (
//     <div className="form-container">
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create an Account</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Full Name</label>
//         <input
//           className="input-field"
//           type="text"
//           placeholder="John Doe"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//
//         <label>Email</label>
//         <input
//           className="input-field"
//           type="email"
//           placeholder="Enter your email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />
//
//         <label>Password</label>
//         <input
//           className="input-field"
//           type="password"
//           placeholder="Create a password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required
//         />
//
//         <button type="submit" className="btn">Register</button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: "15px" }}>
//         Already have an account? <Link to="/login">Login here</Link>
//       </p>
//     </div>
//   );
// };
//
// export default Register;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Register.css"; // See the improved CSS below

const Register = () => {
  const navigate = useNavigate();
  // Aligned with Java Entity: firstName, lastName, email, password
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "", // Added optional fields
    role: "USER"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The 'form' object now matches your User entity structure
      await api.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Check if email already exists.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="name-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="John"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="123-456-7890"
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-submit">Register</button>
        </form>
        <p className="footer-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;