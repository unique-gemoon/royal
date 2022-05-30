import { durationTime, isObject } from "../middleware/functions.js";
import db from "../models/index.model.js";
import sendEmail from "../services/sendEmail.js";

const Pli = db.pli;
const User = db.user;
const Media = db.media;
const SondageOptions = db.sondageOptions;
const SondageVotes = db.sondageVotes;
const AppearancePli = db.appearancePli;
const SondageNotVotes = db.sondageNotVotes;
const Subscriber = db.subscriber;
const Comment = db.comment;
const PliMedias = Pli.hasMany(Media, { as: "medias" });
const MediaSondageOptions = db.media.hasMany(SondageOptions, { as: "options" });
const PliUser = Pli.belongsTo(User);
const PliAppearancePlis = Pli.hasMany(AppearancePli, { as: "appearances" });
const SondageOptionsVotes = SondageOptions.hasMany(SondageVotes, {
  as: "votes",
});
const MediaSondageNotVotes = Media.hasMany(SondageNotVotes, {
  as: "notVotes",
});
const UserSubscriber = User.hasMany(Subscriber, { foreignKey: "subscriberId" });
const PliComments = Pli.hasMany(Comment);
const CommentChilds = Comment.hasMany(Comment, { as : "childs",foreignKey: "parentId"  });
const CommentUser = Comment.belongsTo(User, { foreignKey: "userId" });
const CommentIntendedUser = Comment.belongsTo(User, {
  foreignKey: "intendedUserId",
  targetKey: "id",
  as: "IntendedUser",
});
const Op = db.Sequelize.Op;

//TODO : delete demo data comments
const comments = [
  {
    id: 1,
    user: "Dan",
    subject: "J'aime bien cette citation !",
    time: "3mn",
    citation: {
      citationUser: "Jacquou",
      citationText: "Voici une citation",
    },
    reponses: [
      {
        id: 1,
        user: "Lys",
        subject: "J'aime bien cette citation !",
        time: "2mn",
        userRep: "Dan",
      },
      {
        id: 2,
        user: "Dan",
        subject: "J'aime bien cette citation !",
        time: "2mn",
        userRep: "Lys",
      },
      {
        id: 3,
        user: "Jacquou",
        subject: "J'aime bien cette citation !",
        time: "2mn",
        userRep: "Dan",
      },
      {
        id: 4,
        user: "Dan",
        subject: "J'aime bien cette citation !",
        time: "2mn",
        userRep: "Jacquou",
      },
    ],
  },
  {
    id: 2,
    user: "Dan",
    subject: "J'aime bien cette citation !",
    time: "3mn",
    cotte: true,
    reponses: [
      {
        id: 1,
        user: "Lys",
        subject: "J'aime bien cette citation !",
        time: "2mn",
        userRep: "Dan",
      },
    ],
  },
  {
    id: 3,
    user: "Dan",
    subject: "J'aime bien cette citation !",
    time: "3mn",
  },
  {
    id: 4,
    user: "Dan",
    subject: "J'aime bien cette citation !",
    time: "3mn",
  },
];

export function newPli(req, res, next) {
  const content = req.body.content || "";
  const ouverture = req.body.contentOuverture || "";
  const duration = req.body.duration || "00:00:00";

  let medias = [];
  for (const key in req.files) {
    for (let i = 0; i < req.files[key].length; i++) {
      const file = req.files[key][i];
      let type;
      let isOuverture = false;
      if (file.fieldname === "images") {
        type = "image";
      } else if (file.fieldname === "imagesOuverture") {
        type = "image";
        isOuverture = true;
      } else if (file.fieldname === "video") {
        type = "video";
      } else if (file.fieldname === "videoOuverture") {
        type = "video";
        isOuverture = true;
      } else if (file.fieldname === "music") {
        type = "music";
      } else if (file.fieldname === "musicOuverture") {
        type = "music";
        isOuverture = true;
      }
      if (type) {
        medias.push({
          name: file.filename,
          type,
          originalname: file.originalname,
          path: file.path,
          isOuverture,
        });
      }
    }
  }

  if (req.body.sondage != undefined) {
    let sondageList = [];
    if (Array.isArray(req.body.sondage)) {
      sondageList = req.body.sondage;
    } else {
      sondageList.push(req.body.sondage);
    }
    let options = [];
    sondageList.forEach((element) => {
      const option = isObject(element) ? element : JSON.parse(element);
      options.push({ name: option.value });
    });
    medias.push({
      name: "",
      type: "sondage",
      options,
    });
  }

  if (req.body.sondageOuverture != undefined) {
    let sondageOuvertureList = [];
    if (Array.isArray(req.body.sondageOuverture)) {
      sondageOuvertureList = req.body.sondageOuverture;
    } else {
      sondageOuvertureList.push(req.body.sondageOuverture);
    }
    let options = [];
    sondageOuvertureList.forEach((element) => {
      const option = isObject(element) ? element : JSON.parse(element);
      options.push({ name: option.value });
    });
    medias.push({
      name: "",
      type: "sondage",
      options,
      isOuverture: true,
    });
  }

  let [hour, minute] = String(duration).split(":");
  const allottedTime = parseInt(minute) + 60 * parseInt(hour);

  Pli.create(
    {
      content,
      ouverture,
      duration,
      allottedTime,
      medias,
      userId: req.user.id,
    },
    {
      include: [
        {
          model: Media,
          association: PliMedias,
          as: "medias",
          include: [
            {
              model: SondageOptions,
              association: MediaSondageOptions,
              as: "options",
            },
          ],
        },
      ],
    }
  )
    .then((pli) => {
      sendEmail({
        from: "",
        to: req.user.email,
        subject: "Nouveau pli",
        tmp: "emails/posted_pli.ejs",
        params: {
          user: req.user,
          url: process.env.CLIENT_ORIGIN + "?pli=" + pli.id,
        },
      });

      req.pli = {
        id: pli.id,
        content: pli.content,
        ouverture: pli.ouverture,
        duration: pli.duration,
        allottedTime,
        medias: pli.medias,
        appearances: {
          countDown: 0,
          countUp: 0,
          alreadyUpdated: false,
          signe: null,
        },
        user: { username: req.user.username, id: req.user.id },
        createdAt: pli.createdAt,
        comments: [],
      };

      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findPliUserNotElapsed(req, res, next) {
  Pli.findOne({
    where: {
      createdAt: {
        [Op.gt]: db.Sequelize.literal(
          "DATE_SUB(NOW(), INTERVAL pli.allottedTime MINUTE)"
        ),
      },
      userId: req.user.id,
    },
  })
    .then((pli) => {
      if (!pli) {
        next();
      } else {
        res.status(400).send({
          message:
            "Vous ne pouvez pas publier un nouveau pli. Tant que le temps d’apparition des anciens plis n’a pas écoulé.",
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findAllPlisNotElapsed(req, res) {
  let where = {
    createdAt: {
      [Op.gt]: db.Sequelize.literal(
        "DATE_SUB(NOW(), INTERVAL pli.allottedTime MINUTE)"
      ),
    },
  };
  let options = {};

  if (req.query?.id && parseInt(req.query.id)) {
    where.id = parseInt(req.query.id);
    options.limit = 1;
  }

  Pli.findAll({
    attributes: { exclude: ["updatedAt", "userId"] },
    include: [
      {
        model: Media,
        association: PliMedias,
        as: "medias",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: SondageOptions,
            association: MediaSondageOptions,
            as: "options",
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: SondageVotes,
                association: SondageOptionsVotes,
                as: "votes",
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
          {
            model: SondageNotVotes,
            association: MediaSondageNotVotes,
            as: "notVotes",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      },
      {
        model: User,
        association: PliUser,
        as: "user",
        attributes: ["id", "username"],
        include: [
          {
            model: Subscriber,
            association: UserSubscriber,
            as: "subscribers",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      },
      {
        model: AppearancePli,
        association: PliAppearancePlis,
        as: "appearances",
        attributes: ["id", "signe", "userId"],
      },
      {
        model: Comment,
        association: PliComments,
        as: "comments",
        include: [
          {
            model: Comment,
            association: CommentChilds,
            as: "childs",
            include: [
              {
                model: User,
                association: CommentUser,
                as: "user",
                attributes: ["id", "username"],
              },
              {
                model: User,
                association: CommentIntendedUser,
                as: "intendedUser",
                attributes: ["id", "username"],
              },
            ],
            order: [["createdAt", "DESC"]],
          },
          {
            model: User,
            association: CommentUser,
            as: "user",
            attributes: ["id", "username"],
          },
          {
            model: User,
            association: CommentIntendedUser,
            as: "intendedUser",
            attributes: ["id", "username"],
          },
        ],
        order: [["createdAt", "DESC"]],
        where : { parentId : null}
      },
    ],
    where,
    order: [
      [
        db.Sequelize.literal(
          "DATE_ADD(pli.createdAt, INTERVAL pli.allottedTime MINUTE)"
        ),
        "DESC",
      ],
    ],
    ...options,
  })
    .then((plis) => {
      if (!plis) {
        res.status(200).send({
          message: "no pli",
          plis: [],
        });
        return;
      } else {
        let cpPlis = [];
        for (let i = 0; i < plis.length; i++) {
          let cpPli = plis[i];
          let cpMedias = [];
          for (let j = 0; j < cpPli.medias.length; j++) {
            let media = cpPli.medias[j];
            let alreadyVoted = null;
            let totalVotes = 0;
            let cpOptions = [];
            if (media.type == "sondage") {
              alreadyVoted = false;
              for (let k = 0; k < media.options.length; k++) {
                let option = media.options[k];
                totalVotes += option.votes.length;
                let voted = false;
                for (let m = 0; m < option.votes.length; m++) {
                  const vote = option.votes[m];
                  if (req.user && vote.userId == req.user.id) {
                    alreadyVoted = true;
                    voted = true;
                    break;
                  }
                }
                option = {
                  id: option.id,
                  name: option.name,
                  mediumId: option.mediumId,
                  numberVotes: option.votes.length,
                  votes: [],
                  voted,
                };
                cpOptions.push(option);
              }
              if (!alreadyVoted) {
                for (let k = 0; k < media.notVotes.length; k++) {
                  const notVote = media.notVotes[k];
                  if (req.user && notVote.userId == req.user.id) {
                    alreadyVoted = true;
                    break;
                  }
                }
              }
            }
            media = {
              id: media.id,
              type: media.type,
              name: media.name,
              originalname: media.originalname,
              path: media.path,
              isOuverture: media.isOuverture,
              pliId: media.pliId,
              options: cpOptions,
              alreadyVoted,
              totalVotes,
            };
            cpMedias.push(media);
          }

          let countDown = 0;
          let countUp = 0;
          let alreadyUpdated = false;
          let signe = false;

          for (let j = 0; j < cpPli.appearances.length; j++) {
            const cpPliAppearance = cpPli.appearances[j];
            if (cpPliAppearance.signe) {
              countUp++;
            } else {
              countDown++;
            }
            if (req.user && cpPliAppearance.userId == req.user.id) {
              alreadyUpdated = true;
              signe = cpPliAppearance.signe;
            }
          }

          let isSubscribed = false;
          if (req.user) {
            for (let j = 0; j < cpPli.user.subscribers.length; j++) {
              const subscriber = cpPli.user.subscribers[j];
              if (subscriber.userId == req.user.id) {
                isSubscribed = true;
                break;
              }
            }
          }

          const id = cpPli.id;
          const content = cpPli.content;
          const ouverture = cpPli.ouverture;
          const duration = durationTime(cpPli.createdAt, cpPli.allottedTime);
          const allottedTime = cpPli.allottedTime;
          const medias = cpMedias;
          const user = {
            id: cpPli.user.id,
            username: cpPli.user.username,
            isSubscribed,
          };
          const createdAt = cpPli.createdAt;
          const appearances = { countDown, countUp, alreadyUpdated, signe };

          cpPlis.push({
            id,
            content,
            ouverture,
            duration,
            allottedTime,
            medias,
            user,
            appearances,
            createdAt,
            comments,
            comments2: cpPli.comments,
          });
        }

        res.status(200).send({
          message: "pli",
          plis: cpPlis,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findPliAppearancesById(req, res, next) {
  if (!parseInt(req.body.id)) {
    res.status(400).send({
      message: "Identifiant du pli non définie.",
    });
    return;
  }
  Pli.findOne({
    include: [
      {
        model: AppearancePli,
        association: PliAppearancePlis,
        as: "appearances",
      },
    ],
    where: {
      id: req.body.id,
    },
  })
    .then((pli) => {
      if (pli) {
        req.pli = pli;
        next();
      } else {
        res.status(400).send({
          message: "Pli non existé.",
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findSondageOptionsVotesById(req, res, next) {
  if (!parseInt(req.body.sondageId)) {
    res.status(400).send({
      message: "Identifiant du sondage non définie.",
    });
    return;
  }
  Media.findOne({
    include: [
      {
        model: SondageOptions,
        association: MediaSondageOptions,
        as: "options",
        include: [
          {
            model: SondageVotes,
            association: SondageOptionsVotes,
            as: "votes",
          },
        ],
      },
    ],
    where: {
      id: req.body.sondageId,
      type: "sondage",
    },
  })
    .then((media) => {
      if (media) {
        req.media = media;
        next();
      } else {
        res.status(400).send({
          message: "sondage non existé.",
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function findSondageNotVotesById(req, res, next) {
  if (!parseInt(req.body.sondageId)) {
    res.status(400).send({
      message: "Identifiant du sondage non définie.",
    });
    return;
  }
  Media.findOne({
    include: [
      {
        model: SondageNotVotes,
        association: MediaSondageNotVotes,
        as: "notVotes",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
    where: {
      id: req.body.sondageId,
      type: "sondage",
    },
  })
    .then((media) => {
      if (media) {
        req.media = media;
        next();
      } else {
        res.status(400).send({
          message: "sondage non existé.",
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}

export function updateAppearancePli(req, res) {
  let alreadyUpdated = false;
  for (let i = 0; i < req.pli.appearances.length; i++) {
    const appearance = req.pli.appearances[i];
    if (req.user && appearance.userId == req.user.id) {
      alreadyUpdated = true;
      break;
    }
  }

  if (alreadyUpdated) {
    res
      .status(400)
      .json({ message: "Le temps alloué du pli est déjà modifié." });
  } else {
    AppearancePli.create({
      allottedTime: req.body.allottedTime,
      pliId: req.pli.id,
      duration: req.body.duration,
      signe: req.body.signe,
      userId: req.user.id,
    })
      .then((response) => {
        let allottedTime = 0;
        if (req.pli.allottedTime > 0) {
          allottedTime = req.body.signe
            ? Number(req.pli.allottedTime) + Number(req.body.allottedTime)
            : Number(req.pli.allottedTime) - Number(req.body.allottedTime);
        }

        Pli.update(
          {
            allottedTime,
          },
          { where: { id: req.pli.id } }
        )
          .then((resp) => {
            const duration = durationTime(req.pli.createdAt, allottedTime);
            res.status(200).json({
              message: "ok",
              pli: {
                duration,
                allottedTime,
              },
            });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
}

export function addVoteSondagePli(req, res) {
  SondageVotes.create({
    userId: req.user.id,
    sondageOptionId: req.body.optionId,
  })
    .then((sondageVote) => {
      res
        .status(200)
        .json({ message: "ok", sondageVote: { id: sondageVote.id } });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function addNotVoteSondagePli(req, res) {
  SondageNotVotes.create({
    userId: req.user.id,
    mediumId: req.body.sondageId,
  })
    .then((sondageNotVote) => {
      res
        .status(200)
        .json({ message: "ok", sondageNotVote: { id: sondageNotVote.id } });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}
