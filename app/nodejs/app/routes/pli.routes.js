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
  findSondageOptionsVotesById,
  findSondageNotVotesById,
  addNotVoteSondagePli,
} from "../controllers/pli.controller.js";
import { checkDataPli, checkDataPliTime, checkSondageNotVotes, checkSondagePliIsVoted } from "../middleware/checkPli.js";
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
  findSondageOptionsVotesById,
  checkSondagePliIsVoted,
  addVoteSondagePli
);

pliRoutes.post(
  "/sondage/not-vote",
  passport.authenticate("jwt", { session: false }),
  findSondageNotVotesById,
  checkSondageNotVotes,
  addNotVoteSondagePli
);

export default pliRoutes;
