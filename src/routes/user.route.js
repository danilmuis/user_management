const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const validation = require('../helpers/validation');

router.get('/', userController.getProfile);
router.put('/', validation.validateUpdateProfile, userController.updateProfile);

module.exports = router;
