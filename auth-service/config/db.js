import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://pasindukushan11:S3bNO7Pe71KLkGaS@logging-app.ubeio.mongodb.net/?retryWrites=true&w=majority&appName=logging-app');
    console.log(`✅ ${process.env.DB_NAME} connected`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
