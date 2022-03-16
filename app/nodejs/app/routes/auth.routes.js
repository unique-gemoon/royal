import { Router } from "express";
import passport from "passport";
import checkDuplicateUsernameOrEmail from "../middleware/checkDuplicateUsernameOrEmail.js";
import * as controller from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/login", controller.signin);

authRoutes.post("/register", checkDuplicateUsernameOrEmail, controller.signup);

authRoutes.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json(req.user);
  }
);

// Route for logging user out
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json("logout successful");
});

export default authRoutes;
