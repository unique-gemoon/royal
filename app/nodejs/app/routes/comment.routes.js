import { Router } from "express";
import passport from "passport";
import { checkAncestryComment, checkParentComment, checkPli, newComment } from '../controllers/comment.controller.js';
import { commentNotifications } from "../controllers/notification.controller.js";

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
