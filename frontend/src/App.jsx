import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Access from "./pages/Access";
import Fallback from "./pages/Fallback";
import OauthSuccess from "./pages/OauthSuccess";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-success" element={<OauthSuccess />} />
          <Route path="/access-denied" element={<Access />} />
          <Route path="/*" element={<Fallback />} />

          {/* Protected User Route */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user-profile" element={<Dashboard />} />
          </Route>

          {/* Admin-only Route */}
          <Route element={<AdminRoute allowedRoles={["admin"]}/>}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
