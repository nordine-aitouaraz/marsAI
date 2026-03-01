const path = require('path');
const MovieService = require('../Services/MovieService');
const { asyncHandler, HttpError } = require('../Utils/http');

exports.list = asyncHandler(async (req, res) => {
  const data = await MovieService.list();
  res.json(data);
});

exports.listWinners = asyncHandler(async (req, res) => {
  const data = await MovieService.listWinners();
  res.json(data);
});

exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await MovieService.getById(id);
  res.json(data);
});


exports.create = asyncHandler(async (req, res) => {
  const data = await MovieService.create(req.body || {});
  res.status(201).json(data);
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await MovieService.update(id, req.body || {});
  res.json(data);
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await MovieService.remove(id);
  res.status(204).send();
});

exports.listAssets = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.listAssets(movieId);
  res.json(data);
});

exports.addAssets = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const files = req.files || {};

  const stillFiles = files.stills || [];
  const subtitleFiles = files.subtitle || [];

  if (!stillFiles.length && !subtitleFiles.length) {
    throw new HttpError(400, 'No asset files provided');
  }

  const payloads = [];

  stillFiles.forEach((file) => {
    const relPath = path
      .relative(path.join(__dirname, '..'), file.path)
      .replace(/\\/g, '/');
    const ext = (path.extname(file.filename) || '').replace('.', '').toLowerCase() || null;

    payloads.push({
      asset_type: 'still',
      file_path: relPath,
      file_format: ext,
    });
  });

  if (subtitleFiles[0]) {
    const file = subtitleFiles[0];
    const ext = (path.extname(file.filename) || '').toLowerCase();
    if (ext !== '.srt') {
      throw new HttpError(400, 'Subtitle file must be .srt');
    }

    const relPath = path
      .relative(path.join(__dirname, '..'), file.path)
      .replace(/\\/g, '/');

    payloads.push({
      asset_type: 'subtitle',
      file_path: relPath,
      file_format: 'srt',
    });
  }

  const createdAssets = [];
  // On insère chaque asset séparément
  for (const payload of payloads) {
    // MovieService.addAsset retourne un tableau (résultat SQL), on l'aplatit
    const rows = await MovieService.addAsset(movieId, payload);
    if (Array.isArray(rows)) {
      createdAssets.push(...rows);
    } else if (rows) {
      createdAssets.push(rows);
    }
  }

  res.status(201).json(createdAssets);
});

exports.listCollaborators = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.listCollaborators(movieId);
  res.json(data);
});

exports.addCollaborator = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.addCollaborator(movieId, req.body || {});
  res.status(201).json(data);
});

exports.listTags = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.listTags(movieId);
  res.json(data);
});

exports.addTag = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const label = (req.body && req.body.label) || null;
  const data = await MovieService.addTag(movieId, label);
  res.status(201).json(data);
});

exports.removeTag = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const tagId = Number(req.params.tagId);
  const data = await MovieService.removeTag(movieId, tagId);
  res.json(data);
});

exports.getAiDeclaration = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.getAiDeclaration(movieId);
  res.json(data);
});

exports.upsertAiDeclaration = asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const data = await MovieService.upsertAiDeclaration(movieId, req.body || {});
  res.json(data);
});

