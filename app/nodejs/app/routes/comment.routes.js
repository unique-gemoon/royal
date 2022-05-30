import { Router } from "express";
import passport from "passport";
import { checkParentComment, checkPli, newComment } from '../controllers/comment.controller.js';

const commentRoutes = Router();

commentRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkPli,
  checkParentComment,
  newComment
);


export default commentRoutes;
