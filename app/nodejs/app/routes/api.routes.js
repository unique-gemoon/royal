import { Router } from "express";
import path from "path";
const __dirname = process.cwd();

const apiRoutes = Router();

apiRoutes.get("/public/:dir(*)/:url(*)", (req, res) => {
  console.log(req.params.url);
  console.log(req.params.dir);
  console.log(__dirname);
  res.sendFile(
    path.resolve(__dirname + "/public/" + req.params.dir + "/" + req.params.url)
  );
});

export default apiRoutes;
