/**
 * Prime Motors — server.js
 * Express API server
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const servicesRoutes = require('./services');
const contactRoutes = require('./contact');
const app = express();
const PORT = process.env.PORT || 3001;

/* ─── MIDDLEWARE ─── */
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  const now = new Date().toLocaleTimeString('pt-BR');
  console.log(`[${now}] ${req.method} ${req.path}`);
  next();
});

/* ─── ROUTES ─── */
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Prime Motors API está funcionando!',
    version: '1.0.0',
    endpoints: {
      services: 'GET /api/services',
      contact:  'POST /api/contact',
    },
  });
});

app.use('/api/services', servicesRoutes);
app.use('/api/contact',  contactRoutes);

/* ─── 404 HANDLER ─── */
app.use((_req, res) => {
  res.status(404).json({ status: 'error', message: 'Rota não encontrada.' });
});

/* ─── ERROR HANDLER ─── */
app.use((err, _req, res, _next) => {
  console.error('Erro interno:', err);
  res.status(500).json({ status: 'error', message: 'Erro interno do servidor.' });
});

/* ─── START ─── */
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║     🔧 PRIME MOTORS API SERVER 🔧    ║');
  console.log('╠══════════════════════════════════════╣');
  console.log(`║  Porta  : ${PORT}                        ║`.slice(0, 42) + '║');
  console.log(`║  Env    : ${process.env.NODE_ENV || 'development'}              ║`.slice(0, 42) + '║');
  console.log('║  Status : Online ✅                  ║');
  console.log('╚══════════════════════════════════════╝\n');
  console.log(`  → GET  http://localhost:${PORT}/`);
  console.log(`  → GET  http://localhost:${PORT}/api/services`);
  console.log(`  → POST http://localhost:${PORT}/api/contact\n`);
});

module.exports = app;