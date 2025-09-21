import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import apiRequest from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { user_api } from "../utils/url";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await apiRequest(`${user_api}/admin-dashboard`,);
        setUser(data.user);
      } catch (err) {
        console.error("Unauthorized", err);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [logout, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-blue-500" />
        <span className="ml-2 text-gray-700">Loading Admin Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-blue-600">
          <FontAwesomeIcon icon={faUserShield} />
          Admin Dashboard
        </h2>

        {user && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faUserShield} className="text-blue-500" />
              <p><span className="font-semibold">Name:</span> {user.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
              <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
