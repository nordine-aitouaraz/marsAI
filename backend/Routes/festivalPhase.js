const express = require('express');
const router = express.Router();

const {
  getCurrentPhase,
  setCurrentPhase,
} = require('../Services/FestivalPhaseService');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

// public – renvoie simplement la phase active
router.get('/', async (req, res, next) => {
  try {
    const phase = await getCurrentPhase();
    res.json({ phase });
  } catch (err) {
    next(err);
  }
});

// modification réservée au super_admin
router.put(
  '/',
  authenticate,
  authorize(['super_admin']),
  async (req, res, next) => {
    try {
      const { phase } = req.body;
      const newPhase = await setCurrentPhase(phase);
      res.json({ phase: newPhase });
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;

