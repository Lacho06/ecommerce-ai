const express = require('express');
const instanceRoutes = require('./routes/instance');
const messagesRoutes = require('./routes/messages');
const webhookRoutes = require('./routes/webhook');

const app = express();
app.use(express.json());

// ── Rutas ──────────────────────────────────────────────────────────────────
app.use('/instance', instanceRoutes);
app.use('/messages', messagesRoutes);
app.use('/webhook', webhookRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── Inicio ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`whatsapp-service corriendo en http://localhost:${PORT}`);
  console.log(`Evolution API: ${process.env.EVOLUTION_API_URL || 'http://evolution-api:8080'}`);
  console.log(`Instancia: ${process.env.EVOLUTION_INSTANCE || 'ecommerce-bot'}`);
});
