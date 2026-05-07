const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to generate access token (15 minutes expiry)
const generateAccessToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET || "fallback_secret",
    { expiresIn: "15m" }
  );
};

// Helper function to generate refresh token (7 days expiry)
const generateRefreshToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET || "fallback_secret", 
    { expiresIn: "7d" }
  );
};

// 🔹 UPDATED Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("🎯 REGISTER ATTEMPT:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // ✅ MANUAL HASHING ONLY (No pre-save hook)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("🔐 Hashed password:", hashedPassword);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword, // Direct save hashed password
    });

    await user.save();
    console.log("✅ User saved to database");

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.email);
    const refreshToken = generateRefreshToken(user._id, user.email);

    console.log("🎉 Registration successful for:", user.email);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// 🔹 UPDATED Login Controller (With Extensive Debugging)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("\n=== 🔍 LOGIN ATTEMPT START ===");
    console.log("📧 Email received:", email);
    console.log("🔑 Password received:", password);

    // Validation
    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password;

    console.log("🔎 Searching user:", cleanEmail);
    
    // Find user
    const user = await User.findOne({ email: cleanEmail });
    console.log("👤 User found:", user ? "YES" : "NO");

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("📋 User details:", {
      id: user._id,
      email: user.email,
      name: user.name,
      passwordHash: user.password.substring(0, 30) + "..."
    });

    // Compare passwords
    console.log("🔐 Comparing passwords...");
    const isPasswordValid = await bcrypt.compare(cleanPassword, user.password);
    console.log("✅ Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Password comparison FAILED");
      
      // Additional debug info
      console.log("🔧 Hash format check - starts with $2b$:", user.password.startsWith('$2b$'));
      console.log("🔧 Hash length:", user.password.length);
      
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("🎉 LOGIN SUCCESSFUL for user:", user.email);

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.email);
    const refreshToken = generateRefreshToken(user._id, user.email);

    console.log("=== ✅ LOGIN COMPLETE ===\n");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// 🔹 Refresh Token Controller (Same)
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    console.log("🔄 Refresh token request received");

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || "fallback_secret");
    
    // Check if user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ Refresh token valid for user:", user.email);

    // Generate new tokens
    const newAccessToken = generateAccessToken(user._id, user.email);
    const newRefreshToken = generateRefreshToken(user._id, user.email);

    return res.json({
      success: true,
      message: "Tokens refreshed successfully",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });

  } catch (error) {
    console.error("❌ Token refresh error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during token refresh",
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};