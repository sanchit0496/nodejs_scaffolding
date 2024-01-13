const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the CRUD routes for users
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

module.exports = router;