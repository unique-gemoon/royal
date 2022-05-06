import { isObject } from "../middleware/functions.js";
import db from "../models/index.model.js";
import moment from "moment";

const Pli = db.pli;
const User = db.user;
const Media = db.media;
const SondageOptions = db.sondageOptions;
const PliMedias = db.pli.hasMany(Media, { as: "medias" });
const MediaSondageOptions = db.media.hasMany(SondageOptions, { as: "options" });
const PliUser = db.pli.belongsTo(User);
const Op = db.Sequelize.Op;

export function newPli(req, res) {
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

  Pli.create(
    {
      content,
      ouverture,
      duration,
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
      res.status(200).json({
        id: pli.id,
        content: pli.content,
        ouverture: pli.ouverture,
        duration: pli.duration,
        medias: pli.medias,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function findPliUserNotElapsed(req, res, next) {
  Pli.findOne({
    where: {
      createdAt: {
        [Op.gt]: moment().subtract(1, "h").toDate(),
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

export function findAllPlisNotElapsed(req, res, next) {
  Pli.findAll({
    attributes: { exclude: ["updatedAt","userId"] },
    include: [
      {
        model: Media,
        association: PliMedias,
        as: "medias",
        attributes: { exclude: ['createdAt','updatedAt'] },
        include: [
          {
            model: SondageOptions,
            association: MediaSondageOptions,
            as: "options",
            attributes: { exclude: ['createdAt','updatedAt'] },
          },
        ],
      },
      {
        model: User,
        association: PliUser,
        as: "user",
        attributes: ["id", "username"],
      },
    ],
    where: {
      createdAt: {
        [Op.gt]: moment().subtract(1, "h").toDate(),
      },
    },
    order: [["createdAt", "DESC"]],
  })
    .then((plis) => {
      if (!plis) {
        res.status(200).send({
          message: "no pli",
          plis: [],
        });
        return;
      } else {
        res.status(200).send({
          message: "pli",
          plis,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
}
