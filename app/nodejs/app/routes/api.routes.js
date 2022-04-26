import { Router } from "express";
import passport from "passport";
import { newPli } from "../controllers/pli.controller.js";
import { checkDataPli } from "../middleware/checkPli.js";
import path from "path";
import multer from "multer";
const __dirname = process.cwd();

const apiRoutes = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("test");
    cb(null, "public/uploads/media/");
  },

  filename: function (req, file, cb) {
    console.log("test2");
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

apiRoutes.post(
  "/pli/new",
  passport.authenticate("jwt", { session: false }),
  checkDataPli,
  upload.array("files"),
  newPli
);

apiRoutes.get("/public/:dir(*)/:url(*)", (req, res) => {
  console.log(req.params.url);
  console.log(req.params.dir);
  console.log(__dirname);
  res.sendFile(
    path.resolve(__dirname + "/public/" + req.params.dir + "/" + req.params.url)
  );
});

export default apiRoutes;
