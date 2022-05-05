import { Router } from "express";
import authRoutes from "./auth.routes.js";
import apiRoutes from "./api.routes.js";
import pliRoutes from "./pli.routes.js";

var router = Router();

router.use("/", apiRoutes);

router.use("/auth", authRoutes);

router.use("/pli", pliRoutes);

export default router;
