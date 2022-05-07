const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();


router.get('/', userController.getProfile);
router.put('/', userController.updateProfile);

module.exports = router;
