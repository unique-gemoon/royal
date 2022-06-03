import db from "../models/index.model.js";

const Citation = db.citation;
const Pli = db.pli;
const User = db.user;
const CitationUser = Citation.belongsTo(User, { foreignKey: "userId" });

export function newCitation(req, res) {
  if (String(req.body.message).length) {
    Citation.create({
      userId: req.user.id,
      pliId: req.pli.id,
      ancestryId: req?.ancestry?.id ? req.ancestry.id : null,
      message: req.body.message,
    })
      .then((citation) => {
          res.status(200).send({
            message: "ok.",
            citation: {
              id: citation.id,
              userId: citation.userId,
              user: { id: citation.userId, username: req.user.username },
              pliId: citation.pliId,
              createdAt: citation.createdAt,
              ancestry: citation.ancestryId ? req.ancestry : null,
              ancestryId: citation.ancestryId
            }
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

export function checkAncestryCitation(req, res, next) {
  if (parseInt(req.body.ancestryId)) {
    Citation.findOne({
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: User,
          association: CitationUser,
          as: "user",
          attributes: ["id", "username"],
        }],
      where: {
        id: req.body.ancestryId,
      },
    })
      .then((ancestry) => {
        if (ancestry) {
          req.ancestry = ancestry;
          next();
        } else {
          res.status(400).send({
            message: "La citation ascendance n'existe pas.",
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

