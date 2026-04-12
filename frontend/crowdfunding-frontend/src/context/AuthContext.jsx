import {createContext, useContext, useEffect, useState} from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
      const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
    }, []);
   const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data.data;
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);