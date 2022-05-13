import { Router } from "express";
import path from "path";
const __dirname = process.cwd();

const apiRoutes = Router();

apiRoutes.get("/public/:dir(*)/:url(*)", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/public/" + req.params.dir + "/" + req.params.url)
  );
});

export default apiRoutes;
