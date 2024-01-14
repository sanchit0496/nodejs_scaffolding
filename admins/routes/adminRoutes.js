const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { createAdminSchema } = require('../validations/adminValidation');


/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the admin
 *           example: 1
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the admin
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email of the admin
 *           example: john.doe@example.com
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john.doe@example.com
 */

// Middleware for validation
const validateAdminCreation = (req, res, next) => {
    const { error } = createAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Define the CRUD routes for users
router.post('/', validateAdminCreation, adminController.createAdmin);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.get('/', adminController.getAllAdmins);

module.exports = router;