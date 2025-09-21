import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:opacity-90">
          MyApp
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-md font-medium cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline font-medium">
                Login
              </Link>
              <Link to="/signup" className="hover:underline font-medium">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
