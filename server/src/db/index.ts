import mongoose from "mongoose";
import { dbConfig } from "../config/db.config";

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.DB_CONNECTION_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Failed to connect to DB with reason: ", err?.toString());
    throw err;
  }
};

export { connectDB };
