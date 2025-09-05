
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
