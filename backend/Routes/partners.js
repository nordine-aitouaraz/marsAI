const express = require('express');
const PartnerController = require('../Controllers/PartnerController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Public: liste + détail des partenaires (pour la page Partenaires)
router.get('/', PartnerController.list);
router.get('/:id', PartnerController.get);

// Admin uniquement: création / mise à jour / suppression (réservé au super_admin)
const onlySuperAdmin = ['super_admin'];

router.post(
  '/',
  authenticate,
  authorize(onlySuperAdmin),
  PartnerController.create
);

router.put(
  '/:id',
  authenticate,
  authorize(onlySuperAdmin),
  PartnerController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(onlySuperAdmin),
  PartnerController.remove
);

module.exports = router;

