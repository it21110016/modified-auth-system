import { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Decode token and set user
  const decodeAndSetUser = (token) => {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUser({
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No token found");
        decodeAndSetUser(token);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await AuthService.login(email, password);
    decodeAndSetUser(data.accessToken);
  };

  const register = async (name, email, password) => {
     await AuthService.register(name, email, password);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
