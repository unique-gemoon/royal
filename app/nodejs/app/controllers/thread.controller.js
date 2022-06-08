import db from "../models/index.model.js";

const Thread = db.thread;
const ThreadUsers = db.threadUsers;
const User = db.user;
const Message = db.message;
const ThreadThreadUsers = Thread.hasMany(ThreadUsers);
const ThreadUsersThread = ThreadUsers.belongsTo(Thread);
const ThreadUsersUser = ThreadUsers.belongsTo(User);
const ThreadMessages = Thread.hasMany(Message);
const Op = db.Sequelize.Op;

export function newThread(req, res) {
  Thread.findOne({
    attributes: ["id"],
    include: [
      {
        attributes: [],
        model: ThreadUsers,
        association: ThreadThreadUsers,
        as: "threadUsers",
        required: true,
        where: {
          userId: {
            [Op.in]: [req.user.id, req.body.userId],
          },
        },
      },
    ],
    group: ["id"],
    having: db.Sequelize.literal("count(thread.id) = 2"),
    subQuery: false,
  })
    .then((thread) => {
      if (thread) {
        res.status(200).send({ message: "ok", thread: { id: thread.id } });
      } else {
        Thread.create(
          {
            threadUsers: [{ userId: req.user.id }, { userId: req.body.userId }],
          },
          {
            include: [
              {
                model: ThreadUsers,
                association: ThreadThreadUsers,
                as: "threadUsers",
              },
            ],
          }
        )
          .then((thread) => {
            res.status(200).send({ message: "ok", thread: { id: thread.id } });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function listThreads(req, res) {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const start = (page - 1) * perPage;

  ThreadUsers.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "threadId"] },
    include: [
      {
        attributes: ["id"],
        model: Thread,
        association: ThreadUsersThread,
        as: "thread",
        required: true,
        include: [
          {
            attributes: [],
            model: ThreadUsers,
            association: ThreadThreadUsers,
            as: "threadUsers",
            required: true,
            where: {
              userId: req.user.id,
            },
          },
          {
            attributes: { exclude: ["updatedAt", "threadId"] },
            model: Message,
            association: ThreadMessages,
            as: "messages",
            order: [["createdAt", "DESC"]],
            limit: 1,
          },
        ],
      },
      {
        attributes: ["username"],
        model: User,
        association: ThreadUsersUser,
        as: "user",
        required: true,
      },
    ],
    where: { userId: { [Op.ne]: req.user.id } },
    offset : start,
    limit: perPage,
    order: [["id", "DESC"]],
  })
    .then((threads) => {
      res.status(200).send({ message: "ok", threads });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function checkThread(req, res, next) {
  if (parseInt(req.body.threadId) || parseInt(req.query.threadId)) {
    const threadId = parseInt(req.body.threadId) ? parseInt(req.body.threadId) : parseInt(req.query.threadId);
    Thread.findOne({
      attributes: ["id"],
      include: [
        {
          attributes: [],
          model: ThreadUsers,
          association: ThreadThreadUsers,
          as: "threadUsers",
          required: true,
          where: {
            userId: req.user.id,
          },
        },
      ],
      where: { id: threadId },
    })
      .then((thread) => {
        if (thread) {
          req.thread = thread;
          next();
        } else {
          res
            .status(400)
            .send({ message: "Vous n'êtes pas liée à cette file de discussion." });
          return;
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        return;
      });
  } else {
    res
      .status(400)
      .send({ message: "Identifiant fil de discussion non définie." });
    return;
  }
}
