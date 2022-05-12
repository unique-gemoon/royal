import { Router } from "express";
import passport from "passport";
import { getUserAuthenticated } from "../controllers/auth.controller.js";
import {
  findPliById,
  findAllPlisNotElapsed,
  findPliUserNotElapsed,
  newPli,
  updateAppearancePli,
} from "../controllers/pli.controller.js";
import { checkDataPli, checkDataPliTime } from "../middleware/checkPli.js";
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

pliRoutes.get("/list", getUserAuthenticated, findAllPlisNotElapsed);

pliRoutes.post(
  "/time",
  passport.authenticate("jwt", { session: false }),
  checkDataPliTime,
  findPliById,
  updateAppearancePli
);

export default pliRoutes;
