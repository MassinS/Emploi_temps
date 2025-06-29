import {
  insertSection,
  selectSection,
  selectSections,
  updateSection as updateSection_db,
  deleteSection as deleteSection_db,
} from "../DB/section.js";

export const getSections = (req, res) => {
  selectSections()
    .then((data) => {
      const response = {
        status: "success",
        message: "Retrieved all sections",
        sections: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to retrieve sections",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const getSection = (req, res) => {
  const { id_section } = req.params;
  selectSection(id_section)
    .then((data) => {
      if (data) {
        const response = {
          status: "success",
          message: "Retrieved one section",
          section: data,
        };
        res.status(200).json(response);
      } else {
        const response = {
          status: "error",
          message: "Section not found",
          section: null,
        };
        res.status(404).json(response);
      }
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to retrieve section",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const addSection = (req, res) => {
  const { code_section, niveau, code_specialite } = req.body;
  insertSection(code_section, niveau, code_specialite)
    .then((data) => {
      const response = {
        status: "success",
        message: "Inserted new section",
        section: data,
      };
      res.status(201).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to insert section",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const updateSection = (req, res) => {
  const { code_section, niveau, code_specialite } = req.body;
  const { id_section } = req.params;
  updateSection_db(id_section, code_section, niveau, code_specialite)
    .then((data) => {
      const response = {
        status: "success",
        message: "Updated section",
        section: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to update section",
        error: err,
      };
      res.status(500).json(response);
    });
};

export const deleteSection = (req, res) => {
  const { id_section } = req.params;
  deleteSection_db(id_section)
    .then((data) => {
      const response = {
        status: "success",
        message: "Deleted section",
        section: data,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        message: "Failed to delete section",
        error: err,
      };
      res.status(500).json(response);
    });
};
