import { Router } from "express";
import passport from "passport";
import { newPli } from "../controllers/pli.controller.js";
import { checkDataPli } from "../middleware/checkPli.js";

const apiRoutes = Router();

apiRoutes.post(
  "/pli/new",
  passport.authenticate("jwt", { session: false }),
  checkDataPli,
  newPli
);

export default apiRoutes;
