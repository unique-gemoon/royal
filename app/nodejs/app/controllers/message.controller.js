import db from "../models/index.model.js";

const Message = db.message;
const User = db.user;
const MessageUser = Message.belongsTo(User);
const Op = db.Sequelize.Op;

export function newMessage(req, res) {
  if (req.thread.blocked) {
    res.status(400).send({ message: "Ce fil de discussion est bloqué." });
    return;
  }

  if (String(req.body.message).length) {
    Message.create({
      userId: req.user.id,
      threadId: req.thread.id,
      message: req.body.message,
    })
      .then((message) => {
        res.status(200).send({
          message: "ok.",
          msg: {
            id: message.id,
            userId: message.userId,
            threadId: message.threadId,
            message: message.message,
            createdAt: message.createdAt,
            seen: message.seen,
          },
        });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send({
      message: "Vous ne pouvez pas poster un message vide.",
    });
    return;
  }
}

export function listMessages(req, res) {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const start = (page - 1) * perPage;

  Message.findAll({
    attributes: { exclude: ["updatedAt", "threadId"] },
    include: [
      {
        attributes: ["username"],
        model: User,
        association: MessageUser,
        as: "user",
        required: true,
      },
    ],
    where: {
      threadId: req.thread.id,
    },
    offset: start,
    limit: perPage,
    order: [["createdAt", "DESC"]],
  })
    .then((messages) => {
      res.status(200).send({ message: "ok.", messages, total: req.total , totalNewMessages:req.totalNewMessages});
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function totalMessages(req, res, next) {
  Message.count({
    where: {
      threadId: req.thread.id,
    },
  })
    .then((total) => {
      req.total = total;
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function seenMessages(req, res, next) {
  Message.update(
    { seen: true },
    { where: { threadId: req.thread.id, userId: { [Op.ne]: req.user.id } } }
  )
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
