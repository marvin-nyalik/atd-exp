import mongoose from 'mongoose';

const connectDB = async (uri) => {
  await mongoose.connect(uri);
};

export default connectDB;
