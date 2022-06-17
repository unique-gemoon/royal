import db from "../models/index.model.js";

const User = db.user;
const Subscriber = db.subscriber;
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
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const start = (page - 1) * perPage;

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
        order: [["createdAt", "DESC"],["id", "DESC"]],
        where: {
            userId: req.user.id,
        },
        offset: start,
        limit: perPage,
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
            res.status(200).send({ message: "ok", subscribers: cpSubscribers, total: req.total });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            return;
        });
}

export function totalSubscribers(req, res, next) {
    Subscriber.count({
        where: {
            userId: req.user.id,
        },
    })
        .then((total) => {
            req.total = total;
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            return;
        });
}

export function findSubscriptionsList(req, res) {
    const q = String(req.query.q);
    let whereUsername = {};
    if (req.query.q != undefined && q.length) {
        whereUsername = { username: { [Op.startsWith]: q } };
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const start = (page - 1) * perPage;

    Subscriber.findAll({
        attributes: { exclude: ["updatedAt", "subscriberId"] },
        include: [
            {
                model: User,
                association: SubscriberUser,
                as: "user",
                attributes: ["id", "username"],
                where : whereUsername
            },
        ],
        order: [["createdAt", "DESC"],["id", "DESC"]],
        where : {subscriberId: req.user.id},
        offset: start,
        limit: perPage,
    })
        .then((subscriptions) => {

            let idsSubscriptions = [];
            for (let i = 0; i < subscriptions.length; i++) {
                const subscription = subscriptions[i];
                idsSubscriptions.push(subscription.user.id);
            }

            Subscriber.findAll({
                attributes: ["subscriberId"],
                where: {
                    userId: req.user.id,
                    subscriberId: idsSubscriptions,
                },
                offset: start,
                limit: perPage,
            })
                .then((subscribers) => {
                    let cpSubscriptions = [];
                    for (let i = 0; i < subscriptions.length; i++) {
                        const subscription = subscriptions[i];
                        let isSubscribed = false;
                        for (let j = 0; j < subscribers.length; j++) {
                            const subscriber = subscribers[j];
                            if (subscriber.subscriberId == subscription.userId) {
                                isSubscribed = true;
                                break;
                            }
                        }
                        cpSubscriptions.push({
                            id: subscription.user.id,
                            username: subscription.user.username,
                            isSubscribed,
                            seen: subscription.seen,
                        });
                    }
                    res.status(200).send({
                        message: "ok",
                        subscriptions: cpSubscriptions,
                        total: req.total,
                        totalNew: req.totalNew,
                    });
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message });
                    return;
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            return;
        });
}

export function totalSubscriptions(req, res, next) {
    const q = String(req.query.q);
    let whereUsername = {};

    if (req.query.q != undefined && q.length) {
        whereUsername = { username: { [Op.startsWith]: q } };
    }

    Subscriber.count({
        include: [
            {
                model: User,
                association: SubscriberUser,
                as: "user",
                attributes: ["id", "username"],
                where: whereUsername
            },
        ],
        where: {subscriberId: req.user.id},
    })
        .then((total) => {
            req.total = total;
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            return;
        });
}

export function totalNewSubscriptions(req, res, next) {
    Subscriber.count({
        where: {
            subscriberId: req.user.id,
            seen: false,
        },
    })
        .then((totalNew) => {
            req.totalNew = totalNew;
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            return;
        });
}

export function searchUsersList(req, res) {
    const q = String(req.query.q);
    let where = {
        id: {
            [Op.ne]: req.user.id,
        },
    };
    if (q.length) {
        where = { ...where, username: { [Op.startsWith]: q } };
    }

    User.count({
        where,
    })
        .then((total) => {
            const page = parseInt(req.query.page) || 1;
            const perPage = 20;
            const start = (page - 1) * perPage;

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
                where,
                offset: start,
                limit: perPage,
                order: [["username", "ASC"]],
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
                    res.status(200).send({ message: "ok", users: cpUsers, total });
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message });
                    return;
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
            return;
        });
}
