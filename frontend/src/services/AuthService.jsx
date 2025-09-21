import { auth_api } from "../utils/url";

const AuthService = {
  register: async (name, email, password) => {
    const response = await fetch(`${auth_api}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${auth_api}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Send cookies for refresh token
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("userRole", JSON.parse(atob(data.accessToken.split(".")[1])).role);
    return data;
  },

  refreshToken: async () => {
    const response = await fetch(`${auth_api}/refresh-token`, {
      method: "POST",
      credentials: "include", // Include refresh token cookie
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  },

  logout: async () => {
    await fetch(`${auth_api}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
  },
};

export default AuthService;
