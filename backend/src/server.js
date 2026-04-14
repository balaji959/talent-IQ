import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { serve as Server } from 'inngest/express';
import cors from 'cors';
import { inngest, functions } from './lib/inngest.js';
import { Webhook } from 'svix';
import { clerkMiddleware } from '@clerk/express';

import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

console.log('CLERK KEY:', process.env.CLERK_PUBLISHABLE_KEY?.slice(0, 10));

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post('/api/clerk/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(req.body, req.headers);
  } catch (err) {
    console.error('Webhook verify error:', err);
    return res.status(400).json({ error: 'Invalid webhook' });
  }

  try {
    await inngest.send({
      name: `clerk.${evt.type}`,
      data: evt.data
    });
    console.log('Inngest event sent:', evt.type);
  } catch (err) {
    console.error('Inngest send error:', err);
  }

  res.json({ received: true });
});

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.use("/api/inngest", Server({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});


if (process.env.NODE_ENV === 'production') {
  const frontendPath = process.env.RENDER
    ? '/opt/render/project/src/frontend/dist'
    : path.join(__dirname, '..', '..', '..', 'frontend', 'dist');

  console.log("Looking for frontend at:", frontendPath);

  app.use(express.static(frontendPath));

  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

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