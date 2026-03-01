const express = require('express');
const AdminFilmController = require('../Controllers/AdminFilmController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Toutes ces routes sont protégées ADMIN / SUPER_ADMIN
router.use(authenticate, authorize(['admin', 'super_admin']));

// GET /api/admin/films
router.get('/', AdminFilmController.list);

// GET /api/admin/films/green-flags - uniquement SUPER_ADMIN
router.get(
  '/green-flags',
  authorize(['super_admin']),
  AdminFilmController.listGreenFlagFavorites
);

// GET /api/admin/films/:id
router.get('/:id', AdminFilmController.get);

// PATCH /api/admin/films/:id/status - ADMIN et SUPER_ADMIN
router.patch(
  '/:id/status',
  authorize(['super_admin']),
  AdminFilmController.updateStatus
);

// PATCH /api/admin/films/:id/winner - uniquement SUPER_ADMIN
router.patch(
  '/:id/winner',
  authorize(['super_admin']),
  AdminFilmController.updateWinner
);

// PATCH /api/admin/films/:id/review
router.patch('/:id/review', AdminFilmController.updateReview);

// PATCH /api/admin/films/:id/flag - uniquement ADMIN (flag personnel)
router.patch(
  '/:id/flag',
  authorize(['admin']),
  AdminFilmController.updateFlag
);

// GET /api/admin/films/:id/reviews
router.get('/:id/reviews', AdminFilmController.listReviews);

// POST /api/admin/films/distribute - uniquement SUPER_ADMIN
router.post(
  '/distribute',
  authenticate,
  authorize(['super_admin']),
  AdminFilmController.distribute
);

module.exports = router;

