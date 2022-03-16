import db from "../models/index.model.js";

const User = db.user;

export default function checkTokenExiste(req, res, next) {
  // Username
  User.findOne({
    where: {
      passwordResetToken: req.body.token,
    },
  }).then((user) => {
    if (!user) {
      res.status(400).send({
        message: "Token invalide.",
      });
      return;
    }
    res.user = user;
    next();
  });
}
