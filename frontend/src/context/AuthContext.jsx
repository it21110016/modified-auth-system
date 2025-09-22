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
      let token = localStorage.getItem("accessToken");

      if (token) {
        // Normal login flow
        decodeAndSetUser(token);
      } else {
        // OAuth flow: check backend session
        const res = await fetch("http://localhost:5000/api/v1/auth/session", {
          credentials: "include", // important for cookies
        });

        if (!res.ok) throw new Error("No session");
        const data = await res.json();

        // Store role in localStorage (for consistency)
        localStorage.setItem("userRole", data.role || "user");

        setUser(data);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);

// useEffect(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const accessToken = urlParams.get("accessToken");

//   if (accessToken) {
//     localStorage.setItem("accessToken", accessToken);

//     // Decode and set user
//     decodeAndSetUser(accessToken);

//     // Clean up URL
//     window.history.replaceState({}, document.title, "/");
//   }
// }, []);

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
