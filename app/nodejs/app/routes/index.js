const router = require('express').Router();
const authRoutes = require('./auth.routes');
const apiRoutes = require('./api.routes');

router.use('/', apiRoutes);

router.use('/auth', authRoutes);

module.exports = router;