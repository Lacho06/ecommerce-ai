const { Router } = require('express');
const evolution = require('../services/evolution');

const router = Router();

// POST /messages/send/text
// Body: { number, text, delay?, linkPreview?, quoted? }
router.post('/send/text', async (req, res) => {
  const { number, text, ...options } = req.body;

  if (!number || !text) {
    return res.status(400).json({ error: 'number y text son requeridos' });
  }

  try {
    const data = await evolution.sendText(number, text, options);
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// POST /messages/send/media
// Body: { number, mediaUrl, mediatype, caption?, fileName? }
router.post('/send/media', async (req, res) => {
  const { number, mediaUrl, mediatype, caption, fileName } = req.body;

  if (!number || !mediaUrl || !mediatype) {
    return res.status(400).json({ error: 'number, mediaUrl y mediatype son requeridos' });
  }

  const validTypes = ['image', 'video', 'document', 'audio'];
  if (!validTypes.includes(mediatype)) {
    return res.status(400).json({ error: `mediatype debe ser uno de: ${validTypes.join(', ')}` });
  }

  try {
    const data = await evolution.sendMedia(number, mediaUrl, mediatype, caption, fileName);
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// POST /messages/check-number
// Body: { numbers: string | string[] }
router.post('/check-number', async (req, res) => {
  const { numbers } = req.body;

  if (!numbers) {
    return res.status(400).json({ error: 'numbers es requerido' });
  }

  try {
    const data = await evolution.checkNumber(numbers);
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

module.exports = router;
