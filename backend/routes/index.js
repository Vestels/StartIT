const express = require('express');
const router = express.Router();
const usersRoute = require('./users');
const profileRoute = require('./profile');
const filterRoute = require('./filters');
const jobsRoute = require('./jobs');

router.use('/users', usersRoute);
router.use('/profile', profileRoute);
router.use('/filters', filterRoute);
router.use('/jobs', jobsRoute);

module.exports = router;