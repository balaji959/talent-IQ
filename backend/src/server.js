
import express from 'express';
import { ENV } from './lib/env.js';
// ONLY ONE OF THESE!
const app = express(); 

// ... rest of your code ...
app.get('/', (req, res) => {
  res.status(200).json({ message: 'success from api' });
});

app.listen(ENV.PORT, () => {
  console.log('SERVER STARTED ON PORT' + ENV.PORT);
});