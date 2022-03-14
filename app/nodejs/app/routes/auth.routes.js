const router = require("express").Router();
const passport = require('passport');
const checkDuplicateUsernameOrEmail = require("../middleware/checkDuplicateUsernameOrEmail");
const controller = require("../controllers/auth.controller");

router.post("/login", controller.signin);

router.post("/register", checkDuplicateUsernameOrEmail, controller.signup);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json(req.user);
  }
);

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.json("logout successful");
});

module.exports = router;
