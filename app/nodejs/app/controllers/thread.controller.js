import db from "../models/index.model.js";

const Thread = db.thread;
const ThreadUsers = db.threadUsers;
const User = db.user;
const Message = db.message;
const ThreadThreadUsers = Thread.hasMany(ThreadUsers);
const ThreadUsersThread = ThreadUsers.belongsTo(Thread);
const ThreadUsersUser = ThreadUsers.belongsTo(User);
const ThreadMessages = Thread.hasMany(Message);
const MessageUser = Message.belongsTo(User);
const Op = db.Sequelize.Op;

export function newThread(req, res) {
  if (req?.thread?.id) {
    res.status(200).send({ message: "ok", thread: { id: req.thread.id ,blocked : req.thread.blocked} });
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
        res.status(200).send({ message: "ok", thread: { id: thread.id , blocked : thread.blocked} });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
}

export function checkNewThread(req, res, next) {
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
      req.thread = thread;
      next();
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
        attributes: ["id", "blocked", "blockedBy"],
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
    offset: start,
    limit: perPage,
    order: [["id", "DESC"]],
  })
    .then((threads) => {
      res
        .status(200)
        .send({
          message: "ok",
          threads,
          totalNewMessages: req.totalNewMessages,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function checkThread(req, res, next) {
  if (parseInt(req.body.threadId) || parseInt(req.query.threadId)) {
    const threadId = parseInt(req.body.threadId)
      ? parseInt(req.body.threadId)
      : parseInt(req.query.threadId);
    Thread.findOne({
      attributes: ["id", "blocked", "blockedBy"],
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
          res.status(400).send({
            message: "Vous n'êtes pas liée à cette file de discussion.",
          });
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

export function blockThread(req, res) {
  if (req.thread.blocked && req.body.blocked) {
    res.status(400).send({ message: "Ce fil de discussion est déjà bloqué." });
    return;
  } else if (!req.thread.blocked && !req.body.blocked) {
    res
      .status(400)
      .send({ message: "Ce fil de discussion est déjà débloqué." });
    return;
  } else if (
    req.thread.blocked &&
    !req.body.blocked &&
    req.user.id != req.thread.blockedBy
  ) {
    res
      .status(400)
      .send({ message: "Vous ne pouvez pas débloqué ce fil de discussion." });
    return;
  }

  Thread.update(
    { blocked: req.body.blocked, blockedBy: req.user.id },
    { where: { id: req.thread.id } }
  )
    .then((response) => {
      res.status(200).send({ message: "ok" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function TotalNewMessages(req, res, next) {
  ThreadUsers.count({
    include: [
      {
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
            model: Message,
            association: ThreadMessages,
            as: "messages",
            where: {
              userId: { [Op.ne]: req.user.id },
              seen: false,
            },
          },
        ],
      },
    ],
    where: { userId: { [Op.ne]: req.user.id } },
  })
    .then((total) => {
      req.totalNewMessages = total;
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
