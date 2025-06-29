export const insertOneModuleEnsValidator = (req, res, next) => {
    const { matricule, code_module, priorite } = req.body;
    const missingFields = [];
    if (matricule === undefined) {
      missingFields.push("matricule");
    }
    if (code_module === undefined) {
      missingFields.push("code_module");
    }
    if (priorite === undefined) {
      missingFields.push("priorite");
    }

    if (missingFields.length > 0) {
        return res.status(400).json({ 
            status: "Error",
            message: "Missing fields: "+missingFields
        });
    }
    next();
}

export const putOneModuleEnsValidator = (req, res, next) => {
    const { matricule, code_module } = req.params;
    const { matricule_new, code_module_new, priorite } = req.body;
    const missingFields = [];
    if (matricule_new === undefined) {
        req.body.matricule_new = matricule;
    }
    if (code_module_new === undefined) {
        req.body.code_module_new = code_module;
    }
    if (priorite === undefined) {
      missingFields.push("priorite");
    }

    if (missingFields.length > 0) {
        return res.status(400).json({ 
            status: "Error",
            message: "Missing fields: "+missingFields
        });
    }
    next();
}