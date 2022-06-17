import { sortByKey } from "../middleware/functions.js";
import db from "../models/index.model.js";

const User = db.user;
const Subscriber = db.subscriber;
const SubscriberNotifications = db.subscriberNotifications;
const PliNotifications = db.pliNotifications;
const CommentNotifications = db.commentNotifications;
const SubscriberNotificationsUser = SubscriberNotifications.belongsTo(User, {
  foreignKey: "userId",
});

export function subscribeNotification(req, res) {
  SubscriberNotifications.create({
    userId: req.subscriber.userId,
    subscriberId: req.subscriber.subscriberId,
  })
    .then((notification) => {
      res.status(200).json({
        message: "ok",
        notification: {
          type: "newSubscriber",
          id: notification.id,
          userId: notification.userId,
          subscriberId: notification.subscriberId,
          message:
            "Un nouveau abonné `" + req.user.username + "` sur ton compte.",
          createdAt: notification.createdAt,
          seen: false,
        },
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findNotificationsNewAccount(req, res, next) {
  User.findOne({
    attributes: ["id", "seenNotificationNewAccount", "createdAt"],
    where: {
      id: req.user.id,
    },
  })
    .then((user) => {
      if (user) {
        req.notifications = [
          {
            type: "newAccount",
            id: null,
            userId: user.id,
            subscriberId: null,
            commentId: null,
            pliId: null,
            message: "Création du compte",
            createdAt: user.createdAt,
            seen: user.seenNotificationNewAccount,
          },
        ];
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findNotificationsNewSubscriber(req, res, next) {
  SubscriberNotifications.findAll({
    include: [
      {
        model: User,
        association: SubscriberNotificationsUser,
        as: "user",
        attributes: ["username"],
      },
    ],
    where: {
      subscriberId: req.user.id,
    },
  })
    .then((notifications) => {
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        req.notifications.push({
          type: "newSubscriber",
          id: notification.id,
          userId: notification.userId,
          subscriberId: notification.subscriberId,
          commentId: null,
          pliId: null,
          message:
            "Un nouveau abonné `" +
            notification.user.username +
            "` sur ton compte.",
          createdAt: notification.createdAt,
          seen: notification.seen,
        });
      }
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findNotificationsSubscriberNewPli(req, res, next) {
  PliNotifications.findAll({
    where: {
      userId: req.user.id,
    },
  })
    .then((notifications) => {
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        req.notifications.push({
          type: "newPli",
          id: notification.id,
          userId: notification.userId,
          subscriberId: null,
          commentId: null,
          pliId: notification.pliId,
          message: "Un abonné a posté un pli.",
          createdAt: notification.createdAt,
          seen: notification.seen,
        });
      }
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findNotificationsNewComment(req, res, next) {
  CommentNotifications.findAll({
    where: {
      userId: req.user.id,
    },
  })
    .then((notifications) => {
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        req.notifications.push({
          type: "newComment",
          id: notification.id,
          userId: notification.userId,
          subscriberId: null,
          commentId: notification.commentId,
          pliId: notification.pliId,
          message: "Un nouveau commentaire a été posté sur votre pli.",
          createdAt: notification.createdAt,
          seen: notification.seen,
        });
      }
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findNotifications(req, res) {
  const page = parseInt(req.query.page) || 1;
  const perPage = 20;
  const start = (page - 1) * perPage;

  let allNotifications = req.notifications;
  let notificationsNotSeen = allNotifications.filter(
    (notification) => !notification.seen
  );

  let notifications = [];
  const total = allNotifications.length;
  if (allNotifications.length > 0) {
    notifications = [...allNotifications.sort(sortByKey("-createdAt"))].splice(
      start,
      perPage
    );
  }

  res.status(200).send({
    message: "ok",
    notifications,
    total,
    totalNew: notificationsNotSeen.length,
  });
}

export function seenNotification(req, res) {
  if (req.body.type == "newAccount") {
    User.update(
      { seenNotificationNewAccount: true },
      { where: { id: req.user.id } }
    )
      .then((response) => {
        res.status(200).send({ message: "ok" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.body.type == "newSubscriber" && parseInt(req.body.id)) {
    SubscriberNotifications.update(
      { seen: true },
      { where: { id: req.body.id, subscriberId: req.user.id } }
    )
      .then((response) => {
        res.status(200).send({ message: "ok" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.body.type == "newPli" && parseInt(req.body.id)) {
    PliNotifications.update(
      { seen: true },
      { where: { id: req.body.id, userId: req.user.id } }
    )
      .then((response) => {
        res.status(200).send({ message: "ok" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else if (req.body.type == "newComment" && parseInt(req.body.id)) {
    CommentNotifications.update(
      { seen: true },
      { where: { id: req.body.id, userId: req.user.id } }
    )
      .then((response) => {
        res.status(200).send({ message: "ok" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(500).send({ message: "Action non autorisé." });
  }
}

export function pliNotifications(req, res) {
  Subscriber.findAll({
    attributes: ["subscriberId"],
    where: {
      userId: req.user.id,
    },
  })
    .then((subscribers) => {
      let data = [];
      let cpsubscribers = [];

      if (subscribers.length > 0) {
        for (let i = 0; i < subscribers.length; i++) {
          const subscriber = subscribers[i];
          data.push({
            pliId: req.pli.id,
            userId: subscriber.subscriberId,
          });
          cpsubscribers.push(subscriber.subscriberId);
        }
        PliNotifications.bulkCreate(data, {
          ignoreDuplicates: true,
        })
          .then((response) => {
            res.status(200).send({
              message: "ok",
              pli: req.pli,
              subscribers: cpsubscribers,
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: err.message,
            });
          });
      } else {
        res.status(200).send({ message: "ok", pli: req.pli, subscribers: [] });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function pliNotification(req, res, next) {
  if (parseInt(req.query.pliId)) {
    PliNotifications.findOne({
      where: {
        userId: req.user.id,
        pliId: parseInt(req.query.pliId),
      },
    })
      .then((notification) => {
        if (notification) {
          res.status(200).send({
            message: "ok",
            notification: {
              type: "newPli",
              id: notification.id,
              userId: notification.userId,
              subscriberId: null,
              commentId: null,
              pliId: notification.pliId,
              message: "Un abonné a posté un pli.",
              createdAt: notification.createdAt,
              seen: notification.seen,
            },
          });
        } else {
          res.status(200).send({ message: "ok", notification: {} });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        return;
      });
  } else {
    next();
  }
}

export function commentNotification(req, res) {
  if (parseInt(req.query.commentId)) {
    CommentNotifications.findOne({
      where: {
        userId: req.user.id,
        commentId: parseInt(req.query.commentId),
      },
    })
      .then((notification) => {
        if (notification) {
          res.status(200).send({
            message: "ok",
            notification: {
              type: "newComment",
              id: notification.id,
              userId: notification.userId,
              subscriberId: null,
              commentId: req.query.commentId,
              pliId: notification.pliId,
              message: "Un nouveau commentaire vient d'être posté.",
              createdAt: notification.createdAt,
              seen: notification.seen,
            },
          });
        } else {
          res.status(200).send({ message: "ok", notification: {} });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        return;
      });
  } else {
    res.status(200).send({ message: "ok", notification: {} });
  }
}

export function seenSubscriptionsNotification(req, res) {
  Subscriber.update({ seen: true }, { where: { subscriberId: req.user.id } })
    .then((response) => {
      res.status(200).send({ message: "ok" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function commentNotifications(req, res) {
  let data = [];
  let users = [];
  users.push(req.user.id);
  if (req.user.id != req.pli.userId) {
    users.push(req.pli.userId);
  }

  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const id = users[i];
      data.push({
        pliId: req.pli.id,
        userId: id,
        commentId: req.comment.id,
      });
    }

    CommentNotifications.bulkCreate(data, {
      ignoreDuplicates: true,
    })
      .then((response) => {
        res.status(200).send({ message: "ok", comment: req.comment, users });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(200).send({ message: "ok", comment: req.comment, users: [] });
  }
}
