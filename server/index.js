// ✅ Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Add this line

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // React frontend URL डाल सकते हो जैसे: "http://localhost:5173"
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Temporary Refresh Token Endpoint (Add this before routes)
app.post("/api/auth/refresh", (req, res) => {
  try {
    const { refreshToken } = req.body;

    console.log("🔄 Refresh token request received");

    if (!refreshToken) {
      return res.status(401).json({ 
        success: false,
        message: "Refresh token required" 
      });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    console.log("✅ Refresh token valid for user:", decoded.email);

    // Generate new access token
    const newAccessToken = jwt.sign(
      { 
        userId: decoded.userId, 
        email: decoded.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // 15 minutes expiry
    );

    // Generate new refresh token as well (optional)
    const newRefreshToken = jwt.sign(
      { 
        userId: decoded.userId, 
        email: decoded.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 7 days expiry
    );

    res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: "Tokens refreshed successfully"
    });

  } catch (error) {
    console.error("❌ Token refresh error:", error.message);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false,
        message: "Refresh token expired" 
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Internal server error during token refresh" 
    });
  }
});

// ✅ Import Routes
const authRoutes = require("./routes/auth.route");
const resumeRoutes = require("./routes/resume.route");

// ✅ Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch((err) =>
    console.error("❌ MongoDB connection failed:", err.message)
  );

// ✅ Default route (optional)
app.get("/", (req, res) => {
  res.send("🌐 Online Resume Builder Backend Running Successfully");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});