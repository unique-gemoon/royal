import { Router } from "express";
import passport from "passport";
import { getUserAuthenticated } from "../controllers/auth.controller.js";
import { pliNotifications } from "../controllers/notification.controller.js";
import {
  addNotVoteSondagePli,
  addVoteSondagePli,
  cancelTimeAppearancePli,
  findAllPlisNotElapsed,
  findPliAppearancesById,
  findPliUserNotElapsed,
  findSondageNotVotesById,
  findSondageOptionsVotesById,
  newPli,
  updateAppearancePli,
} from "../controllers/pli.controller.js";
import {
  checkDataPli,
  checkDataPliTime,
  checkSondageNotVotes,
  checkSondagePliIsVoted,
} from "../middleware/checkPli.js";
import { uploadMedia } from "../middleware/uploadMedia.js";

const pliRoutes = Router();

pliRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  findPliUserNotElapsed,
  uploadMedia,
  checkDataPli,
  newPli,
  pliNotifications
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
  "/time/cancel",
  passport.authenticate("jwt", { session: false }),
  findPliAppearancesById,
  cancelTimeAppearancePli
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
