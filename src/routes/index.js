const express = require('express');
const publicRoute = require('./public.route');
const adminRoute = require('./admin.route');
const userRoute = require('./user.route');
const router = express.Router();
const authentication = require('../middlewares/auth');

router.get('/', ((req, res) => {
    res.status(200).send({
        "message" : "Welcome to User Management API",
        "created_by" : "Muhammad Danil Muis"
    })
  })
);
// route for public
router.use('/', publicRoute);

// middlware to check authenticated users
router.use(authentication.verifyToken);

// route for every authenticated user
router.use('/profile', userRoute);

// route for admin
router.use('/users', authentication.adminCheck, adminRoute);

module.exports = router;
