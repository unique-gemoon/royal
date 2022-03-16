import db from "../models/index.model.js";

const User = db.user;

export function checkDuplicateUsernameOrEmail(req, res, next) {
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

export function checkTokenExiste(req, res, next) {
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

export function checkEmailExiste(req, res, next) {
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
