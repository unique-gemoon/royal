import { Router } from "express";
import passport from "passport";
import { listMessages, newMessage, seenMessages, totalMessages } from "../controllers/message.controller.js";
import { checkThread, TotalNewMessages } from '../controllers/thread.controller.js';

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
  seenMessages,
  TotalNewMessages,
  listMessages
);

messageRoutes.post(
  "/seen",
  passport.authenticate("jwt", { session: false }),
  checkThread,
  seenMessages,
  (req,res)=>{
    res.status(200).send({ message: "ok" });
  }
);

export default messageRoutes;
