import { Router } from "express";
import passport from "passport";
import { isConnectedUser } from "../controllers/auth.controller.js";
import { findAllPlisNotElapsed, findPliUserNotElapsed, newPli } from "../controllers/pli.controller.js";
import { checkDataPli } from "../middleware/checkPli.js";
import { uploadMedia } from "../middleware/uploadMedia.js";

const pliRoutes = Router();

pliRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  isConnectedUser,
  findPliUserNotElapsed,
  uploadMedia,
  checkDataPli,
  newPli
);

pliRoutes.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  findAllPlisNotElapsed
);

export default pliRoutes;
