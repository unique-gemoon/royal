import db from "../models/index.model.js";

const Message = db.message;
const User = db.user;
const MessageUser = Message.belongsTo(User);

export function newMessage(req, res) {
  if (String(req.body.message).length) {
    Message.create({
      userId: req.user.id,
      threadId: req.thread.id,
      message: req.body.message,
    })
      .then((message) => {
        res.status(200).send({ message: "ok.", data: { id: message.id } });
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
      res.status(200).send({ message: "ok.", messages, total: req.total });
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
