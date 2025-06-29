export const insertOneEnsEtOccupValidator = (req, res, next) => {
    const { matricule, id_occup } = req.body;
    const missingFields = [];
    if (matricule === undefined) {
      missingFields.push("matricule");
    }
    if (id_occup === undefined) {
      missingFields.push("id_occup");
    }
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "Error",
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    next()
}

export const putOneEnsEtOccupValidator = (req, res, next) => {
    const { matricule, id_occup } = req.params;
    const { matricule_new, id_occup_new } = req.body;
    const missingFields = [];
    
    if (matricule_new === undefined && id_occup_new === undefined) {
        return res.status(400).json({
            status: "Error",
            message: `must have either matricule_new or id_occup_new field`,
        });
    }

    if (matricule_new === undefined) {
      req.body.matricule_new = matricule;
    }
    if (id_occup_new === undefined) {
      req.body.id_occup_new = id_occup;
    }
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "Error",
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    next()
}