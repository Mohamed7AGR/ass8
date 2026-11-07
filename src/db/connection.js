import mongoose from "mongoose";
import configService from "../config/config.service.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(configService.DB_URI);
    await mongoose.syncIndexes();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
