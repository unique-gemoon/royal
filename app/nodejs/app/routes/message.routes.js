import { Router } from "express";
import passport from "passport";
import { listMessages, newMessage, totalMessages } from "../controllers/message.controller.js";
import { checkThread } from '../controllers/thread.controller.js';

const messageRoutes = Router();

messageRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkThread,
  newMessage
);

messageRoutes.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  checkThread,
  totalMessages,
  listMessages
);

export default messageRoutes;
