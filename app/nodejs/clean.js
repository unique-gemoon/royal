import db from "./app/models/index.model.js";
import { schedule } from "node-cron";
import { getArgs } from "./app/middleware/functions.js";
import fs from "fs";

const Pli = db.pli;
const Media = db.media;
const PliMedias = Pli.hasMany(Media, { as: "medias" });
const Op = db.Sequelize.Op;

//COMMAND : node clean.js days=365
//COMMAND : node clean.js minutes=10

const args = getArgs();
const days = Number(args?.days) || 365;
const minutes = Number(args?.minutes) || days * 24 * 60;
cleanOldMediasPlis(minutes);

function cleanOldMediasPlis(minutes) {
    Pli.findAll({
        attributes: { include: ["id", "allottedTime", "createdAt", "cleanedMedia"] },
        include: [
            {
                model: Media,
                association: PliMedias,
                as: "medias",
                attributes: { include: ["id", "type", "path"] },
                required: true,
                where: {
                    type: {
                        [Op.ne]: "sondage",
                    },
                },
            },
        ],
        where: {
            createdAt: {
                [Op.lt]: db.Sequelize.literal("DATE_SUB(NOW(), INTERVAL pli.allottedTime MINUTE)"),
            },
            cleanedMedia: false,
        },
    })
        .then((plis) => {
            let plisIds = [];
            for (let i = 0; i < plis.length; i++) {
                const pli = plis[i];
                for (let j = 0; j < pli.medias.length; j++) {
                    const media = pli.medias[j];
                    try {
                        fs.unlinkSync(media.path);
                    } catch (err) {
                        console.error(err);
                    }
                }
                plisIds.push(pli.id);
            }
            if (plisIds.length > 0) {
                Pli.update(
                    {
                        cleanedMedia: true,
                    },
                    {
                        where: {
                            id: { [Op.in]: plisIds },
                        },
                    }
                )
                    .then((response) => {
                        console.log("Les médias des anciens plis sont nettoyées avec succès.");
                        cleanOldDataPlis(minutes);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                console.log("Il n'y a pas de médias des anciens plis à nettoyer.");
                cleanOldDataPlis(minutes);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

function cleanOldDataPlis(minutes) {
    Pli.findAll({
        attributes: { include: ["id", "allottedTime", "createdAt"] },
        where: {
            createdAt: {
                [Op.lt]: db.Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL pli.allottedTime MINUTE), INTERVAL " + minutes + " MINUTE)"),
            },
        },
    })
        .then((plis) => {
            let plisIds = [];
            for (let i = 0; i < plis.length; i++) {
                const pli = plis[i];
                plisIds.push(pli.id);
            }

            if (plisIds.length > 0) {
                Pli.destroy({
                    where: {
                        id: { [Op.in]: plisIds },
                    },
                })
                    .then((response) => {
                        console.log("Les anciens plis sont nettoyées avec succès.");
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                console.log("Il n'y a pas de plis à nettoyer.");
            }
        })
        .catch((err) => {
            console.error(err);
        });
}
