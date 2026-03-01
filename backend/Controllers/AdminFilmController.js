const AdminFilmService = require('../Services/AdminFilmService');
const { asyncHandler } = require('../Utils/http');

// GET /api/admin/films
// Query: status (single) ou statuses (liste comma-separated, ex. statuses=selected,winner)
exports.list = asyncHandler(async (req, res) => {
  const { status, statuses, q } = req.query;
  const data = await AdminFilmService.list({
    status,
    statuses: statuses ? statuses.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
    search: q,
    currentUser: req.user,
  });
  res.json(data);
});

// GET /api/admin/films/:id
exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminFilmService.getById(id, req.user);
  res.json(data);
});

// PATCH /api/admin/films/:id/status
exports.updateStatus = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { status, decision_reason } = req.body || {};
  const data = await AdminFilmService.updateStatus(id, { status, decision_reason });
  res.json(data);
});

// PATCH /api/admin/films/:id/winner
exports.updateWinner = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { is_winner, ranking, category } = req.body || {};
  const data = await AdminFilmService.updateWinner(id, { is_winner, ranking, category });
  res.json(data);
});

// POST /api/admin/films/distribute
exports.distribute = asyncHandler(async (req, res) => {
  const { minReviewers } = req.body || {};
  const data = await AdminFilmService.distributeToAdmins(minReviewers);
  res.json(data);
});

// PATCH /api/admin/films/:id/review
exports.updateReview = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { rating, comment } = req.body || {};
  const data = await AdminFilmService.upsertReview(id, { rating, comment }, req.user);
  res.json(data);
});

// PATCH /api/admin/films/:id/flag
exports.updateFlag = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { flag } = req.body || {};
  const data = await AdminFilmService.updateFlag(id, { flag }, req.user);
  res.json(data);
});

// GET /api/admin/films/:id/reviews
exports.listReviews = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminFilmService.listReviews(id);
  res.json(data);
});

// GET /api/admin/films/green-flags - super admin : favoris (green flags) par admin
exports.listGreenFlagFavorites = asyncHandler(async (req, res) => {
  const data = await AdminFilmService.listGreenFlaggedByAdmin();
  res.json(data);
});

