const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://evolution-api:8080';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE = process.env.EVOLUTION_INSTANCE || 'ecommerce-bot';

const client = axios.create({
  baseURL: EVOLUTION_API_URL,
  headers: { apikey: EVOLUTION_API_KEY },
});

// ── Instancia ──────────────────────────────────────────────────────────────

async function createInstance(instanceName = INSTANCE) {
  const { data } = await client.post('/instance/create', {
    instanceName,
    qrcode: true,
    integration: 'WHATSAPP-BAILEYS',
  });
  return data;
}

async function getInstanceStatus(instanceName = INSTANCE) {
  const { data } = await client.get(`/instance/connectionState/${instanceName}`);
  return data;
}

async function getInstanceQr(instanceName = INSTANCE) {
  const { data } = await client.get(`/instance/connect/${instanceName}`);
  return data;
}

async function restartInstance(instanceName = INSTANCE) {
  const { data } = await client.put(`/instance/restart/${instanceName}`);
  return data;
}

async function deleteInstance(instanceName = INSTANCE) {
  const { data } = await client.delete(`/instance/delete/${instanceName}`);
  return data;
}

async function fetchInstances() {
  const { data } = await client.get('/instance/fetchInstances');
  return data;
}

// ── Mensajes ───────────────────────────────────────────────────────────────

async function sendText(number, text, options = {}) {
  const { data } = await client.post(`/message/sendText/${INSTANCE}`, {
    number,
    text,
    delay: options.delay ?? 1000,
    linkPreview: options.linkPreview ?? true,
    ...(options.quoted && { quoted: options.quoted }),
  });
  return data;
}

async function sendMedia(number, mediaUrl, mediatype, caption = '', fileName = '') {
  const { data } = await client.post(`/message/sendMedia/${INSTANCE}`, {
    number,
    mediatype,   // image | video | document | audio
    media: mediaUrl,
    caption,
    fileName,
  });
  return data;
}

async function checkNumber(numbers) {
  const { data } = await client.post(`/chat/whatsappNumbers/${INSTANCE}`, {
    numbers: Array.isArray(numbers) ? numbers : [numbers],
  });
  return data;
}

// ── Webhook ────────────────────────────────────────────────────────────────

async function setWebhook(url, events) {
  const { data } = await client.post(`/webhook/set/${INSTANCE}`, {
    url,
    webhook_by_events: false,
    webhook_base64: false,
    events,
  });
  return data;
}

module.exports = {
  INSTANCE,
  createInstance,
  getInstanceStatus,
  getInstanceQr,
  restartInstance,
  deleteInstance,
  fetchInstances,
  sendText,
  sendMedia,
  checkNumber,
  setWebhook,
};