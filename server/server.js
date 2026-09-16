// ─── EXPRESS SERVER (backend entry point) ───────────────────────────────────
// Serves the /api/* JSON API (models → controllers → routes).
// In production it also serves the built frontend from ../dist
// (run `npm run build` first, then `npm run server`).

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8901;

app.use(cors());
app.use(express.json());
app.use(compression());

// API data is static — cache at the browser/proxy + gzip on the wire.
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
}, api);

// Production: serve the Vite build + SPA fallback (only if dist exists).
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Oatly API listening on http://localhost:${PORT}`);
});

export default app;
