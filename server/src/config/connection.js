import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/habit-flow-db"
    );
    console.log(">>> DB Connected");
  } catch (error) {
    console.log(error);
  }
};
