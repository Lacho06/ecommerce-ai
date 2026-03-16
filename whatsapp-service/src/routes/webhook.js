const { Router } = require('express');

const router = Router();

// POST /webhook
// Evolution API envía aquí todos los eventos de la instancia
router.post('/', (req, res) => {
  const event = req.body;

  // Responder inmediatamente para que Evolution API no reintente
  res.status(200).json({ received: true });

  const eventType = event?.event;

  switch (eventType) {
    case 'MESSAGES_UPSERT':
      handleIncomingMessage(event);
      break;

    case 'CONNECTION_UPDATE':
      handleConnectionUpdate(event);
      break;

    case 'QRCODE_UPDATED':
      handleQrUpdate(event);
      break;

    default:
      console.log(`[webhook] Evento no manejado: ${eventType}`);
  }
});

function handleIncomingMessage(event) {
  const message = event?.data;
  if (!message) return;

  const from = message.key?.remoteJid;
  const text = message.message?.conversation || message.message?.extendedTextMessage?.text;

  console.log(`[webhook] Mensaje de ${from}: ${text}`);

  // TODO: Agregar lógica de respuesta automática o reenviar al backend
}

function handleConnectionUpdate(event) {
  const { state, statusReason } = event?.data || {};
  console.log(`[webhook] Conexión: ${state} (${statusReason})`);
}

function handleQrUpdate(event) {
  const qrcode = event?.data?.qrcode;
  console.log(`[webhook] QR actualizado: ${qrcode?.base64 ? 'base64 disponible' : qrcode?.code}`);
}

module.exports = router;
