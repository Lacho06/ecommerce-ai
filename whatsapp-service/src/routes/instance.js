const { Router } = require('express');
const evolution = require('../services/evolution');

const router = Router();

// GET /instance/status
router.get('/status', async (req, res) => {
  try {
    const data = await evolution.getInstanceStatus();
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// GET /instance/qr
router.get('/qr', async (req, res) => {
  try {
    const data = await evolution.getInstanceQr();
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// GET /instance/list
router.get('/list', async (req, res) => {
  try {
    const data = await evolution.fetchInstances();
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// POST /instance/create  { instanceName? }
router.post('/create', async (req, res) => {
  try {
    const { instanceName } = req.body;
    const data = await evolution.createInstance(instanceName);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// POST /instance/restart
router.post('/restart', async (req, res) => {
  try {
    const data = await evolution.restartInstance();
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// DELETE /instance
router.delete('/', async (req, res) => {
  try {
    const data = await evolution.deleteInstance();
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

module.exports = router;
