import jwt from "jsonwebtoken";
import User from "../models/User.js";
// const nodemailer = require("nodemailer");

// Generate Access Token (Short-lived)
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, email: user.email, name: user.name }, process.env.ACCESS_SECRET, { expiresIn: "15m" }); // 15 minutes expiry
};

// Generate Refresh Token (Long-lived)
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_SECRET, { expiresIn: "7d" }); // 7 days expiry
};

// User Registration
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "Email already exists" });

    user = new User({ name, email, password, role});

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000});

    res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = (req, res, next) => {
  try {
    res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) }); // Clear refresh token
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

