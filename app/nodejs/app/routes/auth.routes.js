import { Router } from "express";
import passport from "passport";
import {checkEmailExiste, checkDuplicateUsernameOrEmail, checkTokenExiste, checkDataSignin, checkDataSignup, deleteAccount} from "../middleware/checkUser.js";
import * as controller from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/login", checkDataSignin, controller.signin);

authRoutes.post("/register", checkDataSignup, checkDuplicateUsernameOrEmail, controller.signup);

authRoutes.post("/forgot-password", checkEmailExiste, controller.forgotPassword);

authRoutes.post("/rest-password", checkTokenExiste, controller.restPassword);

authRoutes.post("/refresh-token", controller.verifyRefreshToken);

authRoutes.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({id : req.user.id , username : req.user.username,email : req.user.email});
  }
);

authRoutes.get(
  "/delete-account",
  passport.authenticate("jwt", { session: false }),
  deleteAccount
);

// Route for logging user out
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json("logout successful");
});

export default authRoutes;
