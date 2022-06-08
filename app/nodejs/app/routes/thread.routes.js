import { Router } from "express";
import passport from "passport";
import { listThreads, newThread } from "../controllers/thread.controller.js";

const threadRoutes = Router();

threadRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  newThread
);

threadRoutes.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  listThreads
);

export default threadRoutes;
