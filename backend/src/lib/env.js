import dotenv from 'dotenv';

dotenv.config(); // This loads the variables from your .env file

export const ENV = {
  PORT: process.env.PORT || 3000, // Fallback to 3000 if PORT is missing
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || 'development', // Default to 'development' if NODE_ENV is missing
};

