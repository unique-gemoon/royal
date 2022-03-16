import db from "../models/index.model.js";

const User = db.user;

export default function checkEmailExiste(req, res, next) {
  // Username
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      res.status(400).send({
        message: "Cet email ne dispose d'aucun compte sur notre platform.",
      });
      return;
    }
    next();
  });
}
