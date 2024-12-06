import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
let isConnected = false;

// console.log(isConnected)
export const connectDb = async () => {
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }
 
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database failed to connect", error);
  }
};
  