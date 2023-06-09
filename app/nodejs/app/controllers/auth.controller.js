import jwt from "jsonwebtoken";
import db from "../models/index.model.js";
import sendEmail from "../services/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { getArrayString } from "../middleware/functions.js";

const User = db.user;
const Op = db.Sequelize.Op;

function generateTokens(user) {
  const payload = {
    iss: "Royalis",
    sub: user.id,
    username: user.username,
    email: user.email,
    roles: getArrayString(user.roles),
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3),
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  const refreshToken = jwt.sign(
    { ...payload, exp: new Date().setDate(new Date().getDate() + 7) },
    process.env.REFRESH_SECRET_KEY
  );
  return { token, refreshToken };
}

export function signin(req, res) {
  User.findOne({
    where: {
      [Op.or]: [{ email: req.body.username }, { username: req.body.username }],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message:
            "Nous sommes désolés, nous ne trouvons pas votre compte. Veuillez vérifier les informations de connexion.",
        });
      }

      if (!user.validPassword(req.body.password)) {
        return res
          .status(401)
          .send({ message: "Le mot de passe est incorrect." });
      }

      if (!user.enabled) {
        return res
          .status(401)
          .send({ message: "Nous sommes désolés, Ce compte est désactivé." });
      }

      User.update({ lastLogin: new Date() }, { where: { id: user.id } })
        .then((d) => {
          // Generate JWT token and refresh token
          const tokens = generateTokens(user);
          res.status(200).json({ ...tokens });
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
  const tokenConfirmEmail = crypto.randomBytes(20).toString("hex");
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    lastLogin: new Date(),
    tokenConfirmEmail 
  })
    .then((user) => {
      const response = sendEmail({
        from: "",
        to: req.body.email,
        subject: "Vérification d'email",
        tmp: "emails/verification_account.ejs",
        params: {
          user: res.user,
          url: process.env.CLIENT_ORIGIN + "?tokenConfirmEmail=" + tokenConfirmEmail,
        },
      });

      // Generate JWT token and refresh token
      const tokens = generateTokens(user);
      res.status(200).json({ ...tokens, message: "ok", email: response });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function forgotPassword(req, res) {
  const token = crypto.randomBytes(20).toString("hex");
  User.update(
    {
      passwordResetToken: token,
      passwordResetTokenAt: new Date(),
    },
    { where: { email: req.body.email } }
  )
    .then((d) => {
      const response = sendEmail({
        from: "",
        to: req.body.email,
        subject: "Mot de passe oublié",
        tmp: "emails/forgot_password.ejs",
        params: {
          user: res.user,
          url: process.env.CLIENT_ORIGIN + "?tokenRestPassword=" + token,
        },
      });

      res.status(200).json({ message: "ok", email: response });
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
      passwordResetToken: null,
      passwordResetTokenAt: null,
    },
    { where: { id: res.user.id } }
  )
    .then((d) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function confirmEmail(req, res) {
  User.update(
    {
      tokenConfirmEmail: "",
      confirmed: true,
    },
    { where: { id: res.user.id } }
  )
    .then((d) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function verifyRefreshToken(req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY,
      function (err, jwtPayload) {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: "Unauthorized access." });
        }
        return User.findByPk(jwtPayload.sub)
          .then((user) => {
            if (!user) {
              return res.status(500).send({ message: "user not existe" });
            }
            // Generate JWT token and refresh token
            const tokens = generateTokens(user);
            return res.status(200).json({ ...tokens });
          })
          .catch((err) => {
            return res.status(500).send({ message: err.message });
          });
      }
    );
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
}

export function isConnectedUser(req, res, next) {
  if (req.user) {
    next();
    return;
  }
  res.status(400).json({ message: "l'utilisateur n'existe pas" });
  return;
}

export function getUserAuthenticated(req, res, next) {
  let bearer, token;
  [bearer, token] = String(req.headers.authorization).split(" ");
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, jwtPayload) {
      if (!err) {
        User.findByPk(jwtPayload.sub).then((user) => {
          if (user) {
            req.user = user;
          }
        });
      }
    });
  }
  next();
}
