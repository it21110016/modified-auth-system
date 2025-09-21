import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for all authenticated users
router.get("/user-profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

// Admin-only route
router.get("/admin-dashboard", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard", user: req.user });
});

export default router;
