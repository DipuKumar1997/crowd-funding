// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";
//
// const Login = () => {
//   const { login, user } = useAuth();
//   const navigate = useNavigate();
//   useEffect(() => {
//       if (user) {
//         // already logged in → redirect
//         if (user.role === "ROLE_ADMIN") {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       }
//     }, [user, navigate]);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//
//   const [loading, setLoading] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//
//     try {
//       await login(form.email, form.password);
//
//       // after login, user is already set in context
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//
//       //  role-based redirect
//       if (storedUser?.role === "ROLE_ADMIN") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//
//     } catch (err) {
//       console.error(err);
//       alert("Login failed. Check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="form-container">
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Welcome Back
//       </h2>
//
//       <form onSubmit={handleSubmit} autoComplete="on">
//         <label>Email</label>
//         <input
//           className="input-field"
//           type="email"
//           placeholder="Enter your email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//           required
//         />
//
//         <label>Password</label>
//         <input
//           className="input-field"
//           type="password"
//           placeholder="Enter your password"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//           required
//         />
//
//         <button type="submit" className="btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//
//       <p style={{ textAlign: "center", marginTop: "15px" }}>
//         Don't have an account?{" "}
//         <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// };
//
// export default Login;

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.email, form.password);
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser?.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo / Icon */}
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
             <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Log in to manage your campaigns and impact.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="on">

            {/* Email Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-700"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-indigo-600 hover:text-indigo-500">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-700"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-100 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Sign In"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">
                Join our community
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;