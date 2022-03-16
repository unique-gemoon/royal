import { Router } from "express";
import authMiddleware from "../middleware/isAuthenticated.js";

const apiRoutes = Router();

apiRoutes.get("/secrets", authMiddleware, (req, res) => {
  res.json("Talk is cheap. Show me the code. -Linus Torvalds");
});

export default apiRoutes;