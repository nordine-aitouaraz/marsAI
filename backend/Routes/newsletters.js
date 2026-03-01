const express = require('express');
const NewsletterController = require('../Controllers/NewsletterController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

const onlySuperAdmin = ['super_admin'];

// Liste des abonnés newsletter (admin uniquement)
router.get(
  '/subscribers',
  authenticate,
  authorize(onlySuperAdmin),
  NewsletterController.listSubscribers
);

// Envoi d’un message à tous les abonnés newsletter (admin uniquement)
router.post(
  '/send',
  authenticate,
  authorize(onlySuperAdmin),
  NewsletterController.send
);

// Inscription publique à la newsletter (Home, etc.)
router.post(
  '/subscribe',
  NewsletterController.subscribe
);

module.exports = router;

