import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://greatstack:186312@cluster0.ovanjzw.mongodb.net/TomatoDB?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
