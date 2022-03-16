import jwt from "jsonwebtoken";
import db from "../models/index.model.js";

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
      // Generate JWT token
      const token = generateToken(user);
      res.status(200).json({ token });
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
      // Generate JWT token
      const token = generateToken(user);
      res.status(200).json({ token });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
