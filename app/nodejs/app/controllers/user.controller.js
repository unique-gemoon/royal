import { sortByKey } from "../middleware/functions.js";
import db from "../models/index.model.js";

const User = db.user;
const Subscriber = db.subscriber;
const SubscriberNotifications = db.subscriberNotifications;
const SubscriberUser = Subscriber.belongsTo(User, { foreignKey: "userId" });
const SubscriberUserSubscriber = Subscriber.belongsTo(User, {
  foreignKey: "subscriberId",
});
const UserSubscribers = User.hasMany(Subscriber, {
  foreignKey: "subscriberId",
});
const Op = db.Sequelize.Op;

export function subscribe(req, res, next) {
  if (!req.subscriber) {
    Subscriber.create({
      userId: req.user.id,
      subscriberId: req.body.userId,
    })
      .then((subscriber) => {
        req.subscriber = subscriber;
        next();
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Vous êtes déjà abonné." });
    return;
  }
}

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
          message: "Un nouveau abonné sur ton compte.",
          createdAt: notification.createdAt,
          seen: false,
        },
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function unsubscribe(req, res) {
  if (req.subscriber) {
    Subscriber.destroy({
      where: {
        id: req.subscriber.id,
      },
    })
      .then((response) => {
        res.status(200).json({ message: "ok", notification:{} });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Vous êtes déjà désabonné." });
    return;
  }
}

export function findSubscriber(req, res, next) {
  if (!parseInt(req.body.userId)) {
    res.status(500).send({ message: "Identifiant abonné non définie." });
    return;
  }
  Subscriber.findOne({
    where: {
      userId: req.user.id,
      subscriberId: req.body.userId,
    },
  })
    .then((subscriber) => {
      req.subscriber = subscriber;
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findSubscribersList(req, res) {
  Subscriber.findAll({
    attributes: { exclude: ["updatedAt", "userId"] },
    include: [
      {
        model: User,
        association: SubscriberUserSubscriber,
        as: "user",
        attributes: ["id", "username"],
      },
    ],
    order: [["createdAt", "DESC"]],
    where: {
      userId: req.user.id,
    },
  })
    .then((subscribers) => {
      let cpSubscribers = [];
      for (let i = 0; i < subscribers.length; i++) {
        const subscriber = subscribers[i];
        cpSubscribers.push({
          id: subscriber.user.id,
          username: subscriber.user.username,
          isSubscribed: true,
        });
      }
      res.status(200).send({ message: "ok", subscribers: cpSubscribers });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findSubscriptionsList(req, res) {
  Subscriber.findAll({
    attributes: { exclude: ["updatedAt", "subscriberId"] },
    include: [
      {
        model: User,
        association: SubscriberUser,
        as: "user",
        attributes: ["id", "username"],
      },
    ],
    order: [["createdAt", "DESC"]],
    where: {
      subscriberId: req.user.id,
    },
  })
    .then((subscriptions) => {
      let cpSubscriptions = [];
      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        cpSubscriptions.push({
          id: subscription.user.id,
          username: subscription.user.username,
          isSubscribed: null,
        });
      }
      res.status(200).send({ message: "ok", subscriptions: cpSubscriptions });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function searchUsersList(req, res) {
  User.findAll({
    attributes: ["id", "username"],
    include: [
      {
        model: Subscriber,
        association: UserSubscribers,
        as: "subscribers",
        where: {
          userId: req.user.id,
        },
        required: false,
      },
    ],
    order: [["username", "ASC"]],
    where: {
      id: {
        [Op.ne]: req.user.id,
      },
    },
  })
    .then((users) => {
      const cpUsers = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        cpUsers.push({
          id: user.id,
          username: user.username,
          isSubscribed: user.subscribers.length > 0,
        });
      }
      res.status(200).send({ message: "ok", users: cpUsers });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
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
            subscriberId:null,
            commentId:null,
            pliId:null,
            message: "création du compte",
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
          commentId:null,
          pliId:null,
          message: "Un nouveau abonné sur ton compte.",
          createdAt: notification.createdAt,
          seen:  notification.seen,
        });
      }
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findNotificationsSubscriberNewPli(req, res, next) {
  next();
}

export function findNotificationsNewComment(req, res, next) {
  next();
}

export function findNotifications(req, res) {
  const page = req.body.page || 1;
  const perPage = 10;
  const start = (page - 1) * perPage;

  let allNotifications = req.notifications;
  let notificationsNotSeen = allNotifications.filter(
    (notification) => !notification.seen
  );

  let notifications = [];
  if (allNotifications.length > 0) {
    notifications = [...allNotifications.sort(sortByKey("-createdAt"))].splice(
      start,
      perPage
    );
  }

  res.status(200).send({
    message: "ok",
    notifications,
    total: allNotifications.length,
    countNewNotifications: notificationsNotSeen.length,
  });
}

export function seenNotification(req, res) {
  if (req.body.type == "newAccount" && req.body.userId == req.user.id) {
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
  } else if(req.body.type == "newSubscriber" && req.body.subscriberId == req.user.id && parseInt(req.body.id)){
    SubscriberNotifications.update(
      { seen: true },
      { where: { id: req.body.id } }
    )
      .then((response) => {
        res.status(200).send({ message: "ok" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }else {
    res.status(500).send({ message: "Action non autorisé." });
  }
}
