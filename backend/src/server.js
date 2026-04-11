import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './lib/env.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname = /opt/render/project/src/backend/src

if (ENV.NODE_ENV === 'production' || process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', '..', '..', 'frontend', 'dist');
  // src → backend → src → project = /opt/render/project/src/frontend/dist

  console.log("Looking for frontend at:", frontendPath);

  app.use(express.static(frontendPath));

  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.get("/health", (req, res) => {
  res.status(200).json({ message: 'success from' });
});

app.get("/books", (req, res) => {
  res.status(200).json({ message: 'this is the book endpoint' });
});

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING AT: http://localhost:${PORT}`);
  console.log(`Try health check at: http://localhost:${PORT}/health`);
});