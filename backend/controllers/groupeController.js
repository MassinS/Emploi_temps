import {
  insertGroupe,
  selectGroupe,
  selectGroupes,
  updateGroupe as updateGroupe_db,
  deleteGroupe as deleteGroupe_db,
} from "../DB/groupe.js";

export const getGroupes = (req, res) => {
  selectGroupes()
    .then((data) => {
      const response = {
        status: "success",
        message: "Retrieved all groupes",
        groupes: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while retrieving all groupes",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const getGroupe = (req, res) => {
  const { id_groupe } = req.params;
  selectGroupe(id_groupe)
    .then((data) => {
      const response = {
        status: "success",
        message: "Retrieved one groupe",
        groupe: data,
      };
      if (data === null) {
        response.status = "error";
        response.message = "Groupe not found";
        response.groupe = null;
        res.status(404).json(response);
        return;
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while retrieving one groupe",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const addGroupe = (req, res) => {
  const { code_groupe, id_section } = req.body;
  insertGroupe(code_groupe, id_section)
    .then((data) => {
      const response = {
        status: "success",
        message: "Added one groupe",
        groupe: data,
      };
      res.status(201).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while adding one groupe",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const updateGroupe = (req, res) => {
  const { id_groupe } = req.params;
  const { code_groupe, id_section } = req.body;
  updateGroupe_db(id_groupe, code_groupe, id_section)
    .then((data) => {
      const response = {
        status: "success",
        message: "Updated one groupe",
        groupe: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while updating one groupe",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const deleteGroupe = (req, res) => {
  const { id_groupe } = req.params;
  deleteGroupe_db(id_groupe)
    .then(() => {
      const response = {
        status: "success",
        message: "Deleted one groupe",
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Error while deleting one groupe",
        error: err,
      };
      res.status(500).json(response);
    });
};
