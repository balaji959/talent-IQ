
import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
const app = express(); 
const __dirname = path.resolve();
// ... rest of your code ...
app.get("/health", (req, res) => {
  res.status(200).json({ message: 'success from' });
});
app.get("/books", (req, res) => {
  res.status(200).json({ message: 'this is the book endpoint' });
});
// make our app ready for deployment
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});
}

const PORT = ENV.PORT || 5001; // Fallback to 5001 if ENV.PORT is missing

app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING AT: http://localhost:${PORT}`);
  console.log(`Try health check at: http://localhost:${PORT}/health`);
});