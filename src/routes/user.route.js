const express = require('express');
const userController = require('../controllers/user.controller');
// const jwtAuth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.add);
router.delete('/:id', userController.deleteById);
router.put('/:id', userController.updateById);
// router.post('/login', validate(authValidation.login), controller.login);
module.exports = router;
