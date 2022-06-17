import { Router } from "express";
import passport from "passport";
import { subscribeNotification } from "../controllers/notification.controller.js";
import {
  findSubscribersList,
  findSubscriber,
  subscribe,
  unsubscribe,
  findSubscriptionsList,
  searchUsersList,
  totalSubscribers,
  totalSubscriptions,
  totalNewSubscriptions,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post(
  "/subscribe",
  passport.authenticate("jwt", { session: false }),
  findSubscriber,
  subscribe,
  subscribeNotification
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
  totalSubscribers,
  findSubscribersList
);

userRoutes.get(
  "/subscriptions/list",
  passport.authenticate("jwt", { session: false }),
  totalSubscriptions,
  totalNewSubscriptions,
  findSubscriptionsList
);

userRoutes.get(
  "/search/list",
  passport.authenticate("jwt", { session: false }),
  searchUsersList
);

export default userRoutes;
