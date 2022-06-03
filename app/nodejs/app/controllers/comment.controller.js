import db from "../models/index.model.js";

const Comment = db.comment;
const User = db.user;
const Pli = db.pli;
const CommentUser = Comment.belongsTo(User, { foreignKey: "userId" });

export function newComment(req, res, next) {
  if (String(req.body.message).length) {
    Comment.create({
      userId: req.user.id,
      pliId: req.pli.id,
      ancestryId: req?.ancestry?.id ? req.ancestry.id : null,
      parentId: req?.parent?.id ? req.parent.id : null,
      message: req.body.message,
    })
      .then((comment) => {
        req.comment = {
          id: comment.id,
          userId: comment.userId,
          user: { id: comment.userId, username: req.user.username },
          pliId: comment.pliId,
          createdAt: comment.createdAt,
          ancestry: comment.ancestryId ? req.ancestry : null,
          ancestryId: comment.ancestryId
        };
        next();
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
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: User,
          association: CommentUser,
          as: "user",
          attributes: ["id", "username"],
        },
      ],
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
