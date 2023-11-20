import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI || "";
  return await mongoose.connect(MONGO_URI).then(() => console.log("Connected to DB"));
};
