const express = require('express');
const JuryController = require('../Controllers/JuryController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Public: liste et détail du jury
router.get('/', JuryController.list);
router.get('/:id', JuryController.get);

// Admin uniquement: création / mise à jour / suppression (réservé au super_admin)
const onlySuperAdmin = ['super_admin'];

router.post(
  '/',
  authenticate,
  authorize(onlySuperAdmin),
  JuryController.create
);

router.put(
  '/:id',
  authenticate,
  authorize(onlySuperAdmin),
  JuryController.update
);

router.delete(
  '/:id',
  authenticate,
  authorize(onlySuperAdmin),
  JuryController.remove
);

module.exports = router;

