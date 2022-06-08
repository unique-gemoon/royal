import { Router } from "express";
import passport from "passport";
import {
  checkAncestryComment,
  checkParentComment,
  newComment
} from "../controllers/comment.controller.js";
import { commentNotifications } from "../controllers/notification.controller.js";
import { checkPli } from "../controllers/pli.controller.js";

const commentRoutes = Router();

commentRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkPli,
  checkParentComment,
  checkAncestryComment,
  newComment,
  commentNotifications
);

export default commentRoutes;
