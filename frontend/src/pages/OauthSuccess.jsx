// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    if (accessToken) {
      // Save data in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/user-profile", { replace: true });
      }
    }
  }, [navigate]);

  return <p className="text-center mt-20">Logging you in...</p>;
};

export default OAuthSuccess;
