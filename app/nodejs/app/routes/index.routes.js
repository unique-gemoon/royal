import {Router} from 'express';
import authRoutes from "./auth.routes.js";
import apiRoutes  from "./api.routes.js";

var router = Router();

router.use("/", apiRoutes);

router.use("/auth", authRoutes);

export default router;
