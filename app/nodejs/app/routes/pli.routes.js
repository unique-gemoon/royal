import { Router } from "express";
import passport from "passport";
import { findPliUserNotElapsed, newPli } from "../controllers/pli.controller.js";
import { checkDataPli } from "../middleware/checkPli.js";
import { uploadMedia } from "../middleware/uploadMedia.js";

const pliRoutes = Router();

pliRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  findPliUserNotElapsed,
  uploadMedia,
  checkDataPli,
  newPli
);

export default pliRoutes;
