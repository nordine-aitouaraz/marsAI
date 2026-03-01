const express = require('express');
const FilmmakerController = require('../Controllers/FilmmakerController');

const router = express.Router();

router.get('/', FilmmakerController.list);
router.get('/:id', FilmmakerController.get);
router.post('/', FilmmakerController.create);
router.put('/:id', FilmmakerController.update);
router.delete('/:id', FilmmakerController.remove);

module.exports = router;

