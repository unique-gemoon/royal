import { Router } from "express";
import passport from "passport";
import { newPli } from '../controllers/pli.controller.js';

const apiRoutes = Router();

apiRoutes.post("/pli/new", passport.authenticate("jwt", { session: false }), newPli);

export default apiRoutes;