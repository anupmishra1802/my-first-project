const mongoose = require('mongoose');

const mongoDB = async () => {
  try {
    console.log("Connecting to MongoDB:", process.env.MONGO_URL); // debug
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB not connected
  }
};

module.exports = mongoDB;
