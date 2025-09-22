import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import * as openid from "openid-client";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { generateAccessToken, generateRefreshToken } from "./controllers/authController.js";

connectDB();
dotenv.config();

const { Issuer, generators } = openid;

const app = express();

app.use(express.json());
app.use(cookieParser());

const {
  OIDC_ISSUER,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI,
  APP_JWT_SECRET,
  APP_URL
} = process.env;

let client;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || /^https?:\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}(:\d+)?$/.test(origin) || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(morgan("dev"));

// Global Rate Limiter (Limit each IP to 100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});
app.use(limiter);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Discover Google’s OpenID config
(async () => {
  try {
    const issuer = await Issuer.discover(OIDC_ISSUER);
    client = new issuer.Client({
      client_id: OIDC_CLIENT_ID,
      client_secret: OIDC_CLIENT_SECRET,
      redirect_uris: [OIDC_REDIRECT_URI],
      response_types: ['code'],
    });
    console.log("✅ OIDC client initialized");
  } catch (err) {
    console.error("❌ OIDC discovery failed:", err);
  }
})();

app.get('/auth/start', (req, res) => {
  if (!client) {
    return res.status(503).send('OIDC client not initialized yet, try again in a moment.');
  }

  const state = generators.state();
  const nonce = generators.nonce();

  res.cookie('oidc_state', state, { httpOnly: true, sameSite: 'lax' });
  res.cookie('oidc_nonce', nonce, { httpOnly: true, sameSite: 'lax' });

  const url = client.authorizationUrl({
    scope: 'openid email profile',
    state,
    nonce,
  });
  res.redirect(url);
});

app.get('/auth/callback', async (req, res) => {
  try {
    const params = client.callbackParams(req);
    const state = req.cookies['oidc_state'];
    const nonce = req.cookies['oidc_nonce'];

    const tokenSet = await client.callback(OIDC_REDIRECT_URI, params, { state, nonce });
    const claims = tokenSet.claims();

    // Build your own JWT session
    const appToken = jwt.sign(
      { sub: claims.sub, email: claims.email, name: claims.name },
      APP_JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('app_session', appToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true in production with HTTPS
      maxAge: 60 * 60 * 1000,
    });

    // App-level user object
    const user = { id: claims.sub, name: claims.name, email: claims.email, role: 'user' };

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token securely in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //  set to true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect with access token + user info (frontend stores access token only)
    const redirectUrl = `${APP_URL}/oauth-success?accessToken=${accessToken}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=${user.role}`;
    res.redirect(redirectUrl);

  } catch (err) {
    console.error(err);
    res.status(500).send('Auth failed');
  }
});

app.get("/api/v1/auth/session", (req, res) => {
  try {
    const token = req.cookies.app_session;
    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const decoded = jwt.verify(token, APP_JWT_SECRET);

    // Default role = user if none in token
    const role = decoded.role || "user";

    res.json({
      name: decoded.name,
      email: decoded.email,
      role,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid session" });
  }
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Auth Service running on port ${PORT}`));