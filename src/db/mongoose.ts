import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
 
export const connectDb = async () => {
  try {
    await mongoose
      .connect(uri)
      .then((c) =>
        console.log("Databse connected successfully", c.connection.host)
      );
  } catch (error) {
    console.log("Database failed to connect ", error);
  }
};
