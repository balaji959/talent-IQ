
import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
const app = express(); 
// ... top of your code ... 

// ... routes ...

const __dirname = path.resolve(); // gives /opt/render/project/src/backend

if (ENV.NODE_ENV === 'production' || process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
  //                                         ↑      ↑
  //                              src/backend → src → project root

  console.log("Looking for frontend at:", frontendPath);

  app.use(express.static(frontendPath));

  app.get('/{*path}', (req, res) => {
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
const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING AT: http://localhost:${PORT}`);
  console.log(`Try health check at: http://localhost:${PORT}/health`);
});