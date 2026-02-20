import mongoose from "mongoose";

export const dbClient = () => {
  try {
    mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/todo-app");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};