import { TypeLocal, TypePersonne, TypeSeance, jours } from "../../constants.js";

export const typePersonneValidator = (type) => {
  return type in TypePersonne;
};

export const typeLocalValidator = (type) => {
  return type in TypeLocal;
};

export const TypeSeanceValidator = (type) => {
  return type in TypeSeance;
};

export const TimeFormatValidator = (time) => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;

  return timeRegex.test(time);
};
export const typeJourValidator = (jour) => {
  //  Vendredi est exclus ==> occupation inutile  //
  return jour !== jours.Vendredi && jour in jours;
};

export const LocalCapaciteValidator = (typeLocal, capaciteLocal) => {
  const VerificationCapacite = [];
  if (typeLocal === TypeLocal.Amphi) {
    if (capaciteLocal < 100 || capaciteLocal > 300) {
      VerificationCapacite.push("Capacite invalide pour amphi");
    }
  } else if (typeLocal === TypeLocal.SalleTD) {
    if (capaciteLocal < 20 || capaciteLocal > 80) {
      VerificationCapacite.push("Capacite invalide pour une Salle TD");
    }
    // sourcery skip: merge-nested-ifs
  } else if (typeLocal === TypeLocal.SalleTP) {
    if (capaciteLocal < 15 || capaciteLocal > 25) {
      VerificationCapacite.push("Capacite invalide pour une salle TP");
    }
  }
  if (VerificationCapacite.length > 0) {
    return [false, VerificationCapacite];
  }

  return [true, VerificationCapacite];
};
