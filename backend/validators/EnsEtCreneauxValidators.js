export const insertOneEnsEtCreneauValidator = (req, res, next) => {
    const { matricule, id_creneau } = req.body;
    const missingFields = [];
    if (matricule === undefined) {
      missingFields.push("matricule");
    }
    if (id_creneau === undefined) {
      missingFields.push("id_creneau");
    }
    if (missingFields.length > 0) {
      return res.status(400).json({
        status : "Error",
        message: "Missing fields: "+missingFields ,
      });
    }
    next();
};

export const putOneEnsEtCreneauValidator = (req, res, next) => {
    const { matricule, id_creneau } = req.params;
    const { matricule_new, id_creneau_new } = req.body;

    if (matricule_new === undefined && id_creneau_new === undefined) {
      return res.status(400).json({
        status : "Error",
        message: "must have either matricule_new or id_creneau_new field",
      });
    }

    if (matricule_new === undefined) {
      req.body.matricule_new = matricule;
    }
    if (id_creneau_new === undefined) {
      req.body.id_creneau_new = id_creneau;
    }

    next();
}