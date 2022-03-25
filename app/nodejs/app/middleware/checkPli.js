import db from "../models/index.model.js";

const Pli = db.pli;

export function checkDataPli(req, res, next) {
  if (!req.body.content) {
    res.status(400).send({
      message: "no content",
    });
    return;
  }
  next();
}