import db from "../models/index.model.js";
import { validateTime } from './functions.js';

const Pli = db.pli;

export function checkDataPli(req, res, next) {

  let sondage = [];
  if (req.body.sondage != undefined) {
    req.body.sondage.forEach((element) => {
      sondage.push(JSON.parse(element));
    });
  }

  let sondageOuverture = [];
  if (req.body.sondageOuverture != undefined) {
    req.body.sondageOuverture.forEach((element) => {
      sondageOuverture.push(JSON.parse(element));
    });
  }

  if (String(req.body.content).length > 280) {
    res.status(400).send({
      message: "Vous ne pouvez pas ajouter plus que 280 caractères maximum  pour le texte du pli.",
    });
    return;
  }else if (String(req.body.contentOuverture).length > 2000) {
    res.status(400).send({
      message: "Vous ne pouvez pas ajouter plus que 2000 caractères maximum  pour le texte de l’ouverture.",
    });
    return;
  }else if (sondage.length > 4) {
    res.status(400).send({
      message: "Vous ne pouvez pas ajouter plus que 4 options maximum pour le sondage.",
    });
    return;
  }else if (sondageOuverture.length > 6) {
    res.status(400).send({
      message: "Vous ne pouvez pas ajouter plus que 6 options maximum pour le sondage. de l’ouverture.",
    });
    return;
  }else if (!String(req.body.duration)/*  || !validateTime(req.body.duration) */) {
    res.status(400).send({
      message: "La durée du pli ne peut pas être vide ou format invalide.",
    });
    return;
  }
  next();
}