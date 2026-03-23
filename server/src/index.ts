import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

// Connect to the database when the serverless function is initialized
mongoose.connect(config.mongoUri).catch((err) => {
  console.error('Database connection error:', err);
  process.exit(1);
});

// Export the app for Vercel
export default app;

