import { Router } from "express";
import passport from "passport";
import { checkAncestryCitation, newCitation } from "../controllers/citation.controller.js";
import { checkPli } from "../controllers/pli.controller.js";

const citationRoutes = Router();

citationRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkPli,
  checkAncestryCitation, 
  newCitation, 
);

export default citationRoutes;
