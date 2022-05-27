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

export function unsubscribe(req, res) {
  if (req.subscriber) {
    Subscriber.destroy({
      where: {
        id: req.subscriber.id,
      },
    })
      .then((response) => {
        res.status(200).json({ message: "ok", notification: {} });
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
          seen: subscription.seen
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
