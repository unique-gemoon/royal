import { Router } from "express";
import passport from "passport";
import { blockThread, checkThread, listThreads, newThread, TotalNewMessages } from "../controllers/thread.controller.js";

const threadRoutes = Router();

threadRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  newThread
);

threadRoutes.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  TotalNewMessages,
  listThreads
);

threadRoutes.post(
  "/block",
  passport.authenticate("jwt", { session: false }),
  checkThread,
  blockThread,
);

export default threadRoutes;
