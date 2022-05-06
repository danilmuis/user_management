const express = require('express');
require('express-group-routes');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const router = express.Router();

router.get('/', ((req, res) => {
    res.status(200).send({
        "message" : "Welcome to User Management API",
        "created_by" : "Muhammad Danil Muis"
    })
  })
);


module.exports = router;
