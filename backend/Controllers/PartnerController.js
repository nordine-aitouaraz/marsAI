const PartnerService = require('../Services/PartnerService');
const { asyncHandler } = require('../Utils/http');

exports.list = asyncHandler(async (req, res) => {
  const data = await PartnerService.list();
  res.json(data);
});

exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await PartnerService.getById(id);
  res.json(data);
});

exports.create = asyncHandler(async (req, res) => {
  const data = await PartnerService.create(req.body || {});
  res.status(201).json(data);
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await PartnerService.update(id, req.body || {});
  res.json(data);
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await PartnerService.remove(id);
  res.status(204).send();
});

