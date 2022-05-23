import { Router } from "express";
import passport from "passport";
import {
  findSubscribersList,
  findSubscriber,
  subscribe,
  unsubscribe,
  findSubscriptionsList,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post(
  "/subscribe",
  passport.authenticate("jwt", { session: false }),
  findSubscriber,
  subscribe
);

userRoutes.post(
  "/unsubscribe",
  passport.authenticate("jwt", { session: false }),
  findSubscriber,
  unsubscribe
);

userRoutes.get(
  "/subscribers/list",
  passport.authenticate("jwt", { session: false }),
  findSubscribersList
);

userRoutes.get(
  "/subscriptions/list",
  passport.authenticate("jwt", { session: false }),
  findSubscriptionsList
);

export default userRoutes;
