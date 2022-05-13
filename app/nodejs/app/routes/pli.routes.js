import { Router } from "express";
import passport from "passport";
import { getUserAuthenticated } from "../controllers/auth.controller.js";
import {
  findPliAppearancesById,
  findAllPlisNotElapsed,
  findPliUserNotElapsed,
  newPli,
  updateAppearancePli,
  addVoteSondagePli,
  findPliSondageOptionsVotesById,
} from "../controllers/pli.controller.js";
import { checkDataPli, checkDataPliTime, checkSondagePliIsVoted } from "../middleware/checkPli.js";
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
  findPliAppearancesById,
  updateAppearancePli
);

pliRoutes.post(
  "/sondage/vote",
  passport.authenticate("jwt", { session: false }),
  findPliSondageOptionsVotesById,
  checkSondagePliIsVoted,
  addVoteSondagePli
);

export default pliRoutes;
