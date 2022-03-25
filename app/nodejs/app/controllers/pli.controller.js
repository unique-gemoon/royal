import db from "../models/index.model.js";

const Pli = db.pli;

export function newPli(req, res) {
  res.status(200).json({ response: "new pli" });
}
