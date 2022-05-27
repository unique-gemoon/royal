import { Router } from "express";
import passport from "passport";
import {
    findNotifications,
    findNotificationsNewAccount,
    findNotificationsNewComment,
    findNotificationsNewSubscriber,
    findNotificationsSubscriberNewPli,
    pliNotification,
    seenNotification
} from "../controllers/notification.controller.js";

const notificationRoutes = Router();

notificationRoutes.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  findNotificationsNewAccount,
  findNotificationsNewSubscriber,
  findNotificationsSubscriberNewPli,
  findNotificationsNewComment,
  findNotifications
);

notificationRoutes.post(
  "/seen",
  passport.authenticate("jwt", { session: false }),
  seenNotification
);

notificationRoutes.get(
  "/new",
  passport.authenticate("jwt", { session: false }),
  pliNotification
);

export default notificationRoutes;
