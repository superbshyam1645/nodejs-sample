const mongoose = require("mongoose");
const AsyncHandler = require("express-async-handler");
mongoose.set("strictQuery", false);

const MONGO_URI = process.env.MONGO_URI;
console.log("Mongo URI:", MONGO_URI);

const connectDB = AsyncHandler(async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error Connecting Database: ", error.message);
    throw error;
  }
});

module.exports = connectDB;
