import { isObject, removeTags, validateTime } from "./functions.js";

const pliOptions = {
  content: {
    maxLength: 280,
  },
  contentOuverture: {
    maxLength: 2000,
  },
  sondage: {
    maxOptions: 4,
    maxLength: 25,
  },
  sondageOuverture: {
    maxOptions: 6,
    maxLength: 25,
  },
};

export function checkDataPli(req, res, next) {
  const error = { name: "", message: "" };

  if (removeTags(req.body.content).length > pliOptions.content.maxLength) {
    error.name = "content";
    error.message = `Vous ne pouvez pas ajouter plus que ${pliOptions.content.maxLength} caractères maximum  pour le texte du pli.`;
  } else if (
    removeTags(req.body.contentOuverture).length >
    pliOptions.contentOuverture.maxLength
  ) {
    error.name = "contentOuverture";
    error.message = `Vous ne pouvez pas ajouter plus que ${pliOptions.contentOuverture.maxLength} caractères maximum  pour le texte de l’ouverture.`;
  } else if (!String(req.body.duration) || !validateTime(req.body.duration)) {
    error.name = "duration";
    error.message =
      "La durée du pli ne peut pas être vide ou format invalide." +
      req.body.duration;
  } else {
    let sondage = [];
    if (req.body.sondage != undefined) {
      let sondageList = [];
      if (Array.isArray(req.body.sondage)) {
        sondageList = req.body.sondage;
      } else {
        sondageList.push(req.body.sondage);
      }

      for (const key in sondageList) {
        const element = sondageList[key];
        const option = isObject(element) ? element : JSON.parse(element);
        sondage.push(option);
        if (String(option.value).length == 0) {
          error.name = "sondage";
          error.message = `Vous ne pouvez pas ajouter une option sondage vide.`;
          break;
        } else if (String(option.value).length > pliOptions.sondage.maxLength) {
          error.name = "sondage";
          error.message = `Vous ne pouvez pas ajouter plus que ${pliOptions.sondage.maxLength} caractères maximum  pour le texte du option sondage.`;
          break;
        } else if (sondage.length > pliOptions.sondage.maxOptions) {
          error.name = "sondage";
          error.message = `Vous ne pouvez pas ajouter plus que  ${pliOptions.sondage.maxOptions} options maximum pour le sondage.`;
          break;
        }
      }
    }

    let sondageOuverture = [];
    if (req.body.sondageOuverture != undefined) {
      let sondageOuvertureList = [];
      if (Array.isArray(req.body.sondageOuverture)) {
        sondageOuvertureList = req.body.sondageOuverture;
      } else {
        sondageOuvertureList.push(req.body.sondageOuverture);
      }
      for (const key in sondageOuvertureList) {
        const element = sondageOuvertureList[key];
        const option = isObject(element) ? element : JSON.parse(element);
        sondage.push(option);
        if (
          String(option.value).length > pliOptions.sondageOuverture.maxLength
        ) {
          error.name = "sondageOuverture";
          error.message = `Vous ne pouvez pas ajouter plus que ${pliOptions.sondageOuverture.maxLength} caractères maximum  pour le texte du option sondage de l'ouverture.`;
          break;
        } else if (
          sondageOuverture.length > pliOptions.sondageOuverture.maxOptions
        ) {
          error.name = "sondageOuverture";
          error.message = `Vous ne pouvez pas ajouter plus que ${pliOptions.sondageOuverture.maxOptions} options maximum pour le sondage. de l’ouverture.`;
          break;
        }
      }
    }
  }

  if (!error.name) {
    next();
  } else {
    for (let key in req.files) {
      req.files[key].forEach((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.error(err);
        }
      });
    }
    res.status(400).send({ message: error.message });
    return;
  }
}

export function checkDataPliTime(req, res, next) {
  const error = { name: "", message: "" };
  if (!String(req.body.duration) || !validateTime(req.body.duration)) {
    error.name = "duration";
    error.message = "La durée du pli ne peut pas être vide ou format invalide.";
  } else if (req.body.signe == undefined) {
    error.name = "action";
    error.message = "Action non validé.";
  } else if (!parseInt(req.body.allottedTime)) {
    error.name = "temps";
    error.message = "Le temps alloué est non valide.";
  }

  if (!error.name) {
    next();
  } else {
    res.status(400).send({ message: error.message });
    return;
  }
}

export function checkSondagePliIsVoted(req, res, next) {
  const error = { name: "", message: "" };
  if (!req.body.optionId) {
    error.name = "optionId";
    error.message = "Identifiant sondage option non définie.";
  } else {
    let optionExiste = false;
    let alreadyVoted = false;
    for (let i = 0; i < req.media.options.length; i++) {
      const option = req.media.options[i];
      if (option.id == req.body.optionId) {
        optionExiste = true;
      }
      for (let j = 0; j < option.votes.length; j++) {
        const vote = option.votes[j];
        if (req.user && vote.userId == req.user.id) {
          alreadyVoted = true;
          break;
        }
      }
    }
    if (!optionExiste) {
      error.name = "optionExiste";
      error.message = "Sondage option non existé.";
    } else if (alreadyVoted) {
      error.name = "alreadyVoted";
      error.message = "Sondage déjà voté.";
    }
  }

  if (!error.name) {
    next();
  } else {
    res.status(400).send({ message: error.message });
    return;
  }
}

export function checkSondageNotVotes(req, res, next) {
  const error = { name: "", message: "" };

  let alreadyVoted = false;
  for (let i = 0; i < req.media.notVotes.length; i++) {
    const notVote = req.media.notVotes[i];
    if (req.user && notVote.userId == req.user.id) {
      alreadyVoted = true;
      break;
    }
  }
  if (alreadyVoted) {
    error.name = "alreadyVoted";
    error.message = "Sondage déjà voté.";
  }

  if (!error.name) {
    next();
  } else {
    res.status(400).send({ message: error.message });
    return;
  }
}
