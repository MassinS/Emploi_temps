import { TypePersonne } from "../../constants.js";
import { typePersonneValidator } from "./OtherValidators.js";

export const addPersonneValidator = (req, res, next) => {
  const {
    nom,
    prenom,
    email,
    password,
    type,
  } = req.body;

  //? check for presonne required fields
  const missingFields = [];
  if (nom === undefined) {
    missingFields.push("nom");
  }
  if (prenom === undefined) {
    missingFields.push("prenom");
  }
  if (email === undefined) {
    missingFields.push("email");
  }
  if (password === undefined) {
    missingFields.push("password");
  }
  if (type === undefined) {
    missingFields.push("type");
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      status: "error",
      message:
        "missing required fields: " +
        missingFields
    });
    return;
  }

  //? check type 
    if (
        !typePersonneValidator(type)
    ) {
        res.status(400).json({
        status: "error",
        message: `invalid value '${type}' for type`,
        });
        return;
    }
  //? check for personne type and validate fields based on type TypePersonne(Etudiant, Enseignant, Administrateur)
  if (type === TypePersonne.Etudiant) {
      EtudiantValidator(req, res, next);
  } else if (type === TypePersonne.Enseignant) {
      EnseignantValidator(req, res, next);
    
  } else if (type === TypePersonne.Administrateur) {
      AdministrateurValidator(req, res, next);
  }
};


const EtudiantValidator = (req, res, next) => {
  const { anneeBac, niveau, id_groupe, code_specialite } = req.body;
  //? check for Etudiant required fields
  const missingFields = [];
  if (anneeBac === undefined) {
    missingFields.push("anneeBac");
  }
  if (niveau === undefined) {
    missingFields.push("niveau");
  }
  if (id_groupe === undefined) {
    missingFields.push("id_groupe");
  }
  if (code_specialite === undefined) {
    missingFields.push("code_specialite");
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      status: "error",
      message:
        "missing required fields for type Etudiant: " +
        missingFields
    });
    return;
  }
  next();
};

const EnseignantValidator = (req, res, next) => {
  const { charges } = req.body;
  //? check for Enseignant required fields
  const missingFields = [];
  if (charges === undefined) {
    missingFields.push("charges");
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      status: "error",
      message:
        "missing required fields for type Enseignant: " +
        missingFields
    });
    return;
  }
  next();
};

const AdministrateurValidator = (req, res, next) => {
  const { role } = req.body;
  //? check for Administrateur required fields
  const missingFields = [];
  if (role === undefined) {
    missingFields.push("role");
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      status: "error",
      message:
        "missing required fields for type Administrateur: " +
        missingFields
    });
    return;
  }
  next();
};

export const getPersonnesBytypeValidator = (req, res, next) => {
  const { type } = req.params;

  if (!typePersonneValidator(type)) {
    res.status(400).json({
      status: "error",
      message: `invalid value '${type}' for type, must be one of: ${Object.values(TypePersonne)}`,
    });
    return;
  }
  next();
}