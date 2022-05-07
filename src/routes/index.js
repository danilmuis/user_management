const express = require('express');
require('express-group-routes');

const publicRoute = require('./public.route');
const userRoute = require('./user.route');
const router = express.Router();

router.get('/', ((req, res) => {
    res.status(200).send({
        "message" : "Welcome to User Management API",
        "created_by" : "Muhammad Danil Muis"
    })
  })
);
router.use('/', publicRoute);
router.use('/users', userRoute);

module.exports = router;
