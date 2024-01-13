const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define the CRUD routes for users
router.post('/', adminController.createAdmin);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.get('/', adminController.getAllAdmins);

module.exports = router;