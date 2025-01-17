const express = require('express');
const router = express.Router();
const usersRoute = require('./users');
const profileRoute = require('./profile');
const filterRoute = require('./filters');

router.use('/users', usersRoute);
router.use('/profile', profileRoute);
router.use('/filters', filterRoute);

module.exports = router;