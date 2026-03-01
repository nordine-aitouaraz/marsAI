const express = require('express');
const { asyncHandler } = require('../Utils/http');
const { ping } = require('../Utils/db');
const adminRoutes = require('./admins');
const filmmakerRoutes = require('./filmmakers');
const movieRoutes = require('./movies');
const adminFilmsRoutes = require('./adminFilms');
const juryRoutes = require('./jury');
const authRoutes = require('./auth');
const partnerRoutes = require('./partners');
const newsletterRoutes = require('./newsletters');
const festivalPhaseRoutes = require('./festivalPhase');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());

router.use('/health', asyncHandler(async (req, res) => {
  await ping();
  res.json({ status: 'ok' });
}));

router.use('/admins', adminRoutes);// Admin CRUD
router.use('/admin/films', adminFilmsRoutes);// Admin gestion des films
router.use('/filmmakers', filmmakerRoutes);// Filmmaker CRUD
router.use('/movies', movieRoutes);// CRUD movies + POST /api/movies/submit (soumission publique)
router.use('/auth', authRoutes);
router.use('/jury', juryRoutes);// Jury public + admin CRUD
router.use('/partners', partnerRoutes);// Partenaires public + admin CRUD
router.use('/newsletters', newsletterRoutes);// Gestion des newsletters par les admins
router.use('/festival-phase', festivalPhaseRoutes);// Phase du festival + timer

module.exports = router;

