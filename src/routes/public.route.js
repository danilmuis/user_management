const express = require('express');
const publicController = require('../controllers/public.controller');
const router = express.Router();

router.post('/login', publicController.login);

module.exports = router;
