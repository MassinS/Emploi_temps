export const addSpecialiteValidator = (req, res, next) => {
    const { code_specialite, nom_specialite } = req.body;
    const missingFields = [];
    if (code_specialite === undefined) {
        missingFields.push("code_specialite");
    }
    if (nom_specialite === undefined) {
        missingFields.push("nom_specialite");
    }
    if (missingFields.length > 0) {
        res.status(400).json({
        status: "error",
        message:
            "missing required fields: " +
            missingFields
        });
        return false;
    }
    next();
    return true;
};

export const updateSpecialiteValidator = (req, res, next) => {
    const { code_specialite_new, nom_specialite } = req.body;
    const { code_specialite } = req.params;
    
    const missingFields = [];

    if(nom_specialite === undefined){
        missingFields.push("nom_specialite");
    };

    if(code_specialite_new === undefined){
        req.body.code_specialite_new = code_specialite;
    }
    
    if (missingFields.length > 0) {
        res.status(400).json({
        status: "error",
        message:
            "missing required fields: " +
            missingFields
        });
        return false;
    }

    

    next();

};