import jwt from "jsonwebtoken";
import db from "../models/index.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";


const User = db.user;
const Op = db.Sequelize.Op;

function generateToken(user) {
  return jwt.sign(
    {
      iss: "Royalis",
      sub: user.id,
      username: user.username,
      email: user.email,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 7),
    },
    process.env.SECRET_KEY
  );
}

export function signin(req, res) {
  User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { username: req.body.email }],
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "E-mail ou nom d'utilisateur incorrect." });
      }

      if (!user.validPassword(req.body.password)) {
        return res.status(401).send({ message: "Mot de passe incorrect." });
      }

      if (!user.enabled) {
        return res.status(401).send({ message: "Ce compte est désactivé" });
      }

      User.update({ lastLogin: new Date() }, { where: { id: user.id } })
        .then((user) => {
          // Generate JWT token
          const token = generateToken(user);
          res.status(200).json({ token });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function signup(req, res) {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      User.update({ lastLogin: new Date() }, { where: { id: user.id } })
        .then((user) => {
          // Generate JWT token
          const token = generateToken(user);
          res.status(200).json({ token });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function forgotPassword(req, res) {
  User.update(
    {
      passwordResetToken: crypto.randomBytes(20).toString("hex"),
      passwordResetTokenAt: new Date(),
    },
    { where: { email: req.body.email } }
  )
    .then((user) => {
      res.status(200).json({ message : "ok" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function restPassword(req, res) {
  const password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10),
    null
  );
  
  User.update(
    {
      password,
      passwordResetToken: '',
      passwordResetTokenAt: null,
    },
    { where: { id: res.user.id } }
  )
    .then((user) => {
      res.status(200).json({ message : "ok" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
