const AdminService = require('../Services/AdminService');
const { asyncHandler } = require('../Utils/http');

exports.me = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const data = await AdminService.getById(id);
  res.json(data);
});

exports.list = asyncHandler(async (req, res) => {
  const data = await AdminService.list();
  res.json(data);
});

exports.get = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminService.getById(id);
  res.json(data);
});

exports.create = asyncHandler(async (req, res) => {
  const data = await AdminService.create(req.body || {});
  res.status(201).json(data);
});

exports.logAdmin = asyncHandler(async (req, res) => {
  const { admin, token } = await AdminService.logAdmin(req.body || {});

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000, // 1h
    sameSite: 'lax',
  });

  res.status(200).json(admin);
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.status(204).send();
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = await AdminService.update(id, req.body || {});
  res.json(data);
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await AdminService.remove(id);
  res.status(204).send();
});

