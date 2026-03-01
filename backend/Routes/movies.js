const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const MovieController = require('../Controllers/MovieController');
const FilmSubmissionController = require('../Controllers/FilmSubmissionController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});

// Storage pour les assets (captures & sous-titres)
const assetsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'assets');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const base = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, '_')
      .toLowerCase();
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  },
});

const uploadAssets = multer({
  storage: assetsStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 Mo par fichier, largement suffisant pour images + .srt
  },
});


// POST /api/movies/submit - Soumission publique (crée uniquement movie)
router.post('/submit', upload.single('video'), FilmSubmissionController.submit);

// GET /api/movies - Liste tous les films sélectionnés (catalogue)
router.get('/', MovieController.list);
// GET /api/movies/winners - Liste des films gagnants
router.get('/winners', MovieController.listWinners);
router.post('/', MovieController.create);

// GET /api/movies/:id - Détails d'un film
router.get('/:id', MovieController.get);

// ============================================
// Routes nested (ressources liées)
// ============================================

// POST /api/movies/:movieId/assets - Ajouter des assets (captures + sous-titres)
router.post(
  '/:movieId/assets',
  uploadAssets.fields([
    { name: 'stills', maxCount: 3 },
    { name: 'subtitle', maxCount: 1 },
  ]),
  MovieController.addAssets
);

// GET /api/movies/:movieId/collaborators - Liste des collaborateurs
router.post('/:movieId/collaborators', MovieController.addCollaborator);

// POST /api/movies/:movieId/tags - Ajouter un tag
router.post('/:movieId/tags', MovieController.addTag);

// PUT /api/movies/:movieId/ai-declaration - Mettre à jour la déclaration IA
router.put('/:movieId/ai-declaration', MovieController.upsertAiDeclaration);

module.exports = router;

