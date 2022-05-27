import { Router } from "express";
import authRoutes from "./auth.routes.js";
import apiRoutes from "./api.routes.js";
import pliRoutes from "./pli.routes.js";
import userRoutes from "./user.routes.js";
import notificationRoutes from "./notification.routes.js";

var router = Router();

router.use("/", apiRoutes);

router.use("/auth", authRoutes);

router.use("/pli", pliRoutes);

router.use("/user", userRoutes);

router.use("/notification", notificationRoutes);

export default router;
