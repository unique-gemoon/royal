import db from "../models/index.model.js";

const User = db.user;

export default function checkDuplicateUsernameOrEmail(req, res, next) {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Nom d'utilisateur est déjà utilisé!",
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Cet email est déjà utilisé!",
        });
        return;
      }
      next();
    });
  });
}
