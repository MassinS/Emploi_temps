import bcrypt from "bcrypt";
import {
  insertPersonneWithMatricule,
  insertPersonneWithoutMatricule,
  selectPersonne,
  selectPersonnes,
  updatePersonne as updatePersonne_db,
  deletePersonne as deletePersonne_db,
} from "../DB/personne.js";


export const getPersonnes = (req, res) => {

  const { type } = req.params;
  let getAll = () => { return selectPersonnes()};
  if (type !== undefined) {
    getAll = () => { return selectPersonnes(type)};
  }
  getAll()
    .then((data) => {
      const response = {
        status: "success",
        message: "Retrieved all persons",
        personnes: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while retrieving all persons",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const getPersonne = (req, res) => {
  const { matricule } = req.params;
  selectPersonne(matricule)
    .then((data) => {
      const response = {
        status: "success",
        message: "Retrieved one person",
        personne: data,
      };

      if (data === null) {
        response.status = "error";
        response.message = "Person not found";
        response.personne = null;
        res.status(404).json(response);
        return;
      }

      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while retrieving one person",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const addPersonne = (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    type,
    role,
    anneeBac,
    niveau,
    charges,
    id_groupe,
    code_specialite,
  } = req.body;
  const matricule = req.body.matricule || null;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const insertPersonne = () => {
    if (matricule === null) {
      return insertPersonneWithoutMatricule(
        nom,
        prenom,
        email,
        hashedPassword,
        type,
        role,
        anneeBac,
        niveau,
        charges,
        id_groupe,
        code_specialite
      );
    } else {
      return insertPersonneWithMatricule(
        matricule,
        nom,
        prenom,
        email,
        hashedPassword,
        type,
        role,
        anneeBac,
        niveau,
        charges,
        id_groupe,
        code_specialite
      );
    }
  };
  insertPersonne()
    .then((personne) => {
      const response = {
        status: "success",
        message: "Person added successfully",
        personne: personne,
      };
      res.status(201).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while adding person",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const deletePersonne = (req, res) => {
  const { matricule } = req.params;
  deletePersonne_db(matricule)
    .then(() => {
      const response = {
        status: "success",
        message: "Person deleted successfully",
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while deleting person",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const updatePersonne = (req, res) => {
  const {
    matricule,
    nom,
    prenom,
    email,
    password,
    type,
    role,
    anneeBac,
    niveau,
    charges,
    id_groupe,
    code_specialite,
  } = req.body;
  const mat = req.params.matricule;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  updatePersonne_db(
    matricule,
    mat,
    nom,
    prenom,
    email,
    hashedPassword,
    type,
    role,
    anneeBac,
    niveau,
    charges,
    id_groupe,
    code_specialite,
  )
    .then((personne) => {
      const response = {
        status: "success",
        message: "Personne updated successfully",
        personne: personne,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while updating personne",
        error: err,
      };
      res.status(500).json(response);
    });
};
