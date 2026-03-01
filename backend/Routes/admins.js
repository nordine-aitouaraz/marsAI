const express = require('express');
const AdminController = require('../Controllers/AdminController');
const { authenticate, authorize } = require('../Middlewares/authMiddleware');

const router = express.Router();

// Routes réservées au super_admin pour la gestion des comptes admins
router.get('/', authenticate, authorize(['super_admin']), AdminController.list);
router.get('/me', authenticate, AdminController.me);
router.get('/:id', authenticate, authorize(['super_admin']), AdminController.get);
router.post('/auth/signup', authenticate, authorize(['super_admin']), AdminController.create);
router.post('/auth/login', AdminController.logAdmin);
router.post('/auth/logout', authenticate, AdminController.logout);
router.put('/:id', authenticate, authorize(['super_admin']), AdminController.update);
router.delete('/:id', authenticate, authorize(['super_admin']), AdminController.remove);
module.exports = router;

