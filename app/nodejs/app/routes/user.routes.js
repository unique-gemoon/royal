import { Router } from "express";
import passport from "passport";
import {
  findSubscribersList,
  findSubscriber,
  subscribe,
  unsubscribe,
  findSubscriptionsList,
  searchUsersList,
  findNotifications,
  findNotificationsNewAccount,
  findNotificationsNewSubscriber,
  findNotificationsSubscriberNewPli,
  findNotificationsNewComment,
  seenNotification,
  subscribeNotification,
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
  findSubscribersList
);

userRoutes.get(
  "/subscriptions/list",
  passport.authenticate("jwt", { session: false }),
  findSubscriptionsList
);

userRoutes.get(
  "/search/list",
  passport.authenticate("jwt", { session: false }),
  searchUsersList
);

userRoutes.get(
  "/notifications",
  passport.authenticate("jwt", { session: false }),
  findNotificationsNewAccount,
  findNotificationsNewSubscriber,
  findNotificationsSubscriberNewPli,
  findNotificationsNewComment,
  findNotifications
);

userRoutes.post(
  "/seen/notification",
  passport.authenticate("jwt", { session: false }),
  seenNotification
);

export default userRoutes;
