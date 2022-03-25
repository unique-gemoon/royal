import db from "../models/index.model.js";

const Pli = db.pli;

export function newPli(req, res) {
  Pli.create({
    content: req.body.content,
  })
    .then((pli) => {
      res.status(200).json({ response: pli });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
