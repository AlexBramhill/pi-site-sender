import { serve } from '@hono/node-server';
import app from './app.js';

const PORT = 4000;

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server running at http://localhost:${PORT}`);