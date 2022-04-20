import { Router } from "express";
import passport from "passport";
import { newPli } from "../controllers/pli.controller.js";
import { checkDataPli } from "../middleware/checkPli.js";
import path from "path";
const __dirname = process.cwd();

const apiRoutes = Router();

apiRoutes.post(
  "/pli/new",
  passport.authenticate("jwt", { session: false }),
  checkDataPli,
  newPli
);

apiRoutes.get('/public/:dir(*)/:url(*)', (req, res) => {
  console.log(req.params.url);
  console.log(req.params.dir);
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname + '/public/' + req.params.dir+'/' + req.params.url))
})

export default apiRoutes;
