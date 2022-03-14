const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});


module.exports = router;