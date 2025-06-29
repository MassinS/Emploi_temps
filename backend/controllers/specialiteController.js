import {
  insertSpecialite,
  selectSpecialites,
  updateSpecialite as updateSpecialite_db,
  deleteSpecialite as deleteSpecialite_db,
  selectSpecialite,
} from "../DB/specialite.js";

//? get All
export const getSpecialites = (req, res) => {
  selectSpecialites()
    .then((data) => {
      const response = {
        status: "success",
        message: "Retrieved all specialites",
        specialites: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to retrieve specialites",
        error: err,
      };
      res.status(500).json(response);
    });
};

//? get One
export const getSpecialite = (req, res) => {
  const { code_specialite } = req.params;
  selectSpecialite(code_specialite)
    .then((data) => {
      if (data) {
        const response = {
          status: "success",
          message: "Retrieved one specialite",
          specialite: data,
        };
        res.status(200).json(response);
      } else {
        const response = {
          status: "error",
          message: "Specialite not found",
          specialite: null,
        };
        res.status(404).json(response);
      }
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to retrieve specialite",
        error: err,
      };
      res.status(500).json(response);
    });
};

//? add one
export const addSpecialite = (req, res) => {
  const { code_specialite, nom_specialite } = req.body;
  insertSpecialite(code_specialite, nom_specialite)
    .then((data) => {
      const response = {
        status: "success",
        message: "Inserted specialite",
        specialite: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to insert specialite",
        error: err,
      };
      res.status(500).json(response);
    });
};

//? update one
export const updateSpecialite = (req, res) => {
  const { code_specialite_new, nom_specialite } = req.body;
  const { code_specialite } = req.params;

  updateSpecialite_db(code_specialite, code_specialite_new, nom_specialite)
    .then((data) => {
      const response = {
        status: "success",
        message: "Updated specialite",
        specialite: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to update specialite",
        error: err,
      };
      res.status(500).json(response);
    });
};

//? delete one
export const deleteSpecialite = (req, res) => {
  const { code_specialite } = req.params;
  deleteSpecialite_db(code_specialite)
    .then((data) => {
      const response = {
        status: "success",
        message: "Deleted specialite",
        specialite: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to delete specialite",
        error: err,
      };
      res.status(500).json(response);
    });
};
