// src/db/database.js
const mongoose = require('mongoose');
const { DB_NAME } = require('../constants.js');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI not set. Skipping DB connection (dev mode).');
      return;
    }
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${DB_NAME}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    // Do not crash in dev if DB is not reachable
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
