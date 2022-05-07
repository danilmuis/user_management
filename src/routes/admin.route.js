const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const validation = require('../helpers/validation');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', validation.validateAddUser, userController.add);
router.delete('/:id', userController.deleteById);
router.put('/:id', validation.validateUpdateUser, userController.updateById);

module.exports = router;
