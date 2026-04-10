
import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
const app = express(); 
// ... top of your code ...
const __dirname = path.resolve(); 

// ... routes ...

if (ENV.NODE_ENV === 'production' || process.env.NODE_ENV === 'production') {
  // We are already at the root (/opt/render/project/src)
  // So we just go INTO frontend/dist. DO NOT use '../'
  const frontendPath = path.join(__dirname, 'frontend', 'dist');

  console.log("Looking for frontend at:", frontendPath); // This will help us debug in the logs!

  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}
// ... rest of your code ...
app.get("/health", (req, res) => {
  res.status(200).json({ message: 'success from' });
});

app.get("/books", (req, res) => {
  res.status(200).json({ message: 'this is the book endpoint' });
});
// Fallback to 5001 if ENV.PORT is missing

app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING AT: http://localhost:${PORT}`);
  console.log(`Try health check at: http://localhost:${PORT}/health`);
});