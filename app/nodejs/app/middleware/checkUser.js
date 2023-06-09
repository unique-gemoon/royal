import db from "../models/index.model.js";
import { validateEmail } from "./functions.js";

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
        message: "Nom d'utilisateur déjà existant. Veuillez en choisir un autre.",
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
          message: "Un compte avec cette adresse email existe déjà. Veuillez vous connecter ou choisir une autre adresse courriel.",
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
        message: "Token invalide ou expiré.",
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
    res.user = user;
    next();
  });
}

export function checkTokenConfirmEmailExiste(req, res, next) {
  User.findOne({
    where: {
      tokenConfirmEmail: req.body.tokenConfirmEmail,
    },
  }).then((user) => {
    if (!user) {
      res.status(400).send({
        message: "Token invalide ou expiré.",
      });
      return;
    }
    res.user = user;
    next();
  });
}


export function checkDataSignin(req, res, next) {
  if (!req.body.username) {
    res
      .status(401)
      .send({ message: "Votre nom d'utilisateur ou adresse e-mail n'est pas correctement renseigné." });
    return;
  } else if (String(req.body.password).length < 6) {
    res.status(401).send({
      message: "Votre mot de passe doit contenir au moins 6 caractères.",
    });
    return;
  }
  next();
}

export function checkDataSignup(req, res, next) {
  if (!req.body.username) {
    res
      .status(401)
      .send({ message: "Votre username n'est pas correctement renseigné." });
    return;
  } else if (!validateEmail(req.body.email)) {
    res
      .status(401)
      .send({ message: "Votre email n'est pas correctement renseigné." });
    return;
  } else if (String(req.body.password).length < 6) {
    res.status(401).send({
      message: "Votre mot de passe doit contenir au moins 6 caractères.",
    });
    return;
  }
  next();
}

export function deleteAccount(req, res) {
  if (req.user) {
    req.user
      .destroy()
      .then(() => {
        res.status(200).json({ message: "Votre compte est bien supprimé." });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Oups! un problème est survenu durant la suppression du compte.",
        });
        return;
      });
  } else {
    res.status(401).send({
      message: "Utilisateur non défini",
    });
    return;
  }
}
