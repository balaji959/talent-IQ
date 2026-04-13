import dotenv from 'dotenv';

dotenv.config({quiet: true}); // This loads the variables from your .env file

export const ENV = {
  PORT: process.env.PORT || 5173, // Fallback to 5173 if PORT is missing
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || 'production',
  CLIENT_URL: process.env.CLIENT_URL,
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_SECRET_KEY: process.env.STREAM_SECRET_KEY,

};

