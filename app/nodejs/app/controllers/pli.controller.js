import db from "../models/index.model.js";

const Pli = db.pli;
const Media = db.media;
const SondageOptions = db.sondageOptions;
const PliMedias = db.pli.hasMany(Media, { as: "medias" });
const MediaSondageOptions = db.media.hasMany(SondageOptions, { as: "options" });

export function newPli(req, res) {
  Pli.create(
    {
      content: req.body.content,
      medias: [
        {
          name: "test1",
          type: "image",
        },
        {
          name: "test2",
          type: "video",
        },
        {
          name: "test3",
          type: "sondage",
          options: [{ name: "option1" }, { name: "option2" }],
        },
      ],
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
      res.status(200).json({ response: pli });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
