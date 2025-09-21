import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import apiRequest from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { user_api } from "../utils/url";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiRequest(`${user_api}/user-profile`);
        setUser(data.user);
      } catch (err) {
        console.error("Unauthorized", err);
        logout();
        navigate('/login'); // redirect to login page
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-blue-500" />
        <span className="ml-2 text-gray-700">Loading User Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-green-600">
          <FontAwesomeIcon icon={faUser} />
          User Dashboard
        </h2>

        {user && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faUser} className="text-green-500" />
              <p><span className="font-semibold">Name:</span> {user.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-green-500" />
              <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
