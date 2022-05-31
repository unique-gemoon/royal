import db from "../models/index.model.js";

const Comment = db.comment;
const Pli = db.pli;

export function newComment(req, res) {
  if (String(req.body.message).length) {
    Comment.create({
      userId: req.user.id,
      pliId: req.pli.id,
      ancestryId: req?.ancestry?.id ? req.ancestry.id : null,
      parentId: req?.parent?.id ? req.parent.id : null,
      message: req.body.message,
    })
      .then((comment) => {
        res.status(200).json({
          message: "ok",
          comment: { id: comment.id },
        });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send({
      message: "Vous ne pouvez pas poster un commentaire vide.",
    });
    return;
  }
}

export function checkPli(req, res, next) {
  if (parseInt(req.body.pliId)) {
    Pli.findOne({
      where: {
        id: req.body.pliId,
      },
    })
      .then((pli) => {
        if (pli) {
          req.pli = pli;
          next();
        } else {
          res.status(400).send({
            message: "Pli non existe.",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        return;
      });
  } else {
    res.status(400).send({
      message: "Identifiant pli non définie.",
    });
  }
}

export function checkParentComment(req, res, next) {
  if (parseInt(req.body.parentId)) {
    Comment.findOne({
      where: {
        id: req.body.parentId,
      },
    })
      .then((comment) => {
        if (comment) {
          req.parent = comment;
          next();
        } else {
          res.status(400).send({
            message: "Le commentaire destiné n'existe pas.",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        return;
      });
  } else {
    req.parent = {};
    next();
  }
}

export function checkAncestryComment(req, res, next) {
  if (parseInt(req.body.ancestryId)) {
    Comment.findOne({
      where: {
        id: req.body.ancestryId,
      },
    })
      .then((comment) => {
        if (comment) {
          req.ancestry = comment;
          next();
        } else {
          res.status(400).send({
            message: "Le commentaire ascendance n'existe pas.",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        return;
      });
  } else {
    req.ancestry = {};
    next();
  }
}
