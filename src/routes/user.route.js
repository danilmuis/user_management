const express = require('express');
require('express-group-routes');
const userController = require('../controllers/user.controller');
const authentication = require('../middlewares/auth');

const routers = express.Router();


routers.group('/', (router) => {
    router.use(authentication.verifyToken);
    router.get('/', userController.getAll);
    router.get('/:id', userController.getById);
    router.post('/', userController.add);
    router.delete('/:id', userController.deleteById);
    router.put('/:id', userController.updateById);
})
module.exports = routers;
