const FilmmakerService = require('../Services/FilmmakerService');
const { asyncHandler } = require('../Utils/http');

exports.list = asyncHandler(async (req, res) => {
  const data = await FilmmakerService.list();
  res.json(data);
});

exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await FilmmakerService.getById(id);
  res.json(data);
});

exports.create = asyncHandler(async (req, res) => {
  const data = await FilmmakerService.create(req.body || {});
  res.status(201).json(data);
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await FilmmakerService.update(id, req.body || {});
  res.json(data);
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await FilmmakerService.remove(id);
  res.status(204).send();
});

