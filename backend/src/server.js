import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { serve as Server } from 'inngest/express';
import cors from 'cors';
import { inngest, functions } from './lib/inngest.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname = /opt/render/project/src/backend/src

//middleware
app.use(express.json());
//credentials: true allows cookies to be sent in cross-origin requests, which is necessary for authentication and session management when the frontend and backend are on different domains or ports.
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));



// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/inngest", Server({client: inngest, functions}));
// API Routes
app.get("/health", (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

app.get("/books", (req, res) => {
  res.status(200).json({ message: 'this is the book endpoint' });
});

// Static files and SPA fallback (production only)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = process.env.RENDER 
    ? '/opt/render/project/src/frontend/dist'
    : path.join(__dirname, '..', '..', '..', 'frontend', 'dist');

  console.log("Looking for frontend at:", frontendPath);

  app.use(express.static(frontendPath));

  // SPA fallback - must be after all API routes
 app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = ENV.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ SERVER RUNNING AT: http://localhost:${PORT}`);
      console.log(`Try health check at: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
