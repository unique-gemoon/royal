import { Router } from "express";
import passport from "passport";
import {
  blockThread,
  checkNewThread,
  checkThread,
  listThreads,
  newThread,
  TotalNewMessages,
} from "../controllers/thread.controller.js";

const threadRoutes = Router();

threadRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkNewThread,
  newThread
);

threadRoutes.post(
  "/check",
  passport.authenticate("jwt", { session: false }),
  checkNewThread,
  (req, res) => {
    if (req?.thread?.id) {
      res.status(200).send({ message: "ok", thread: { id: req.thread.id, blocked: req.thread.blocked } });
    } else {
      res.status(200).send({ message: "ok", thread: {} });
    }
  }
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
  blockThread
);

export default threadRoutes;
