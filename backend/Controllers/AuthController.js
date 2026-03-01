const AdminService = require('../Services/AdminService');
const { asyncHandler } = require('../Utils/http');

// Login unique pour ADMIN / SUPER_ADMIN
exports.login = asyncHandler(async (req, res) => {
  const { admin, token } = await AdminService.logAdmin(req.body || {});

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24h
    sameSite: 'lax',
  });

  res.status(200).json(admin);
});

