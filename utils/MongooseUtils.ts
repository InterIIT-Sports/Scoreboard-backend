import mongoose from "mongoose";

export const connectToDatabase = () => {
  const MONGO_URI = process.env.MONGO_URI || "";
  mongoose.connect(MONGO_URI).then(() => console.log("Connected to DB"));
};

// TODO: Create crud utils
