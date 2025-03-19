require('dotenv').config();
const mongoose = require('mongoose');

const { url } = require('./utils/config');
mongoose.set('strictQuery', false);

const connectDB = mongoose.connect(url)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return mongoose;
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

console.log("NODE_ENV:", process.env.NODE_ENV);

module.exports = { mongoose, connectDB };
