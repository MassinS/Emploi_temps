export const insertModuleValidator = (req, res, next) =>{
    const { code_module, nom_module } = req.body;
    const missingFields = [];

    if ( code_module === undefined ){
        missingFields.push("code_module");
    }

    if ( nom_module === undefined ){
        missingFields.push("nom_module");
    }

    if ( missingFields.length > 0 ){
        const response = {
            status : "error",
            message: "missing required fields: " + missingFields 
        };
        res.status(400).json(response);
        return false;
    }
    
    next()
};

export const putOneModuleValidator = (req, res, next) =>{
    const { code_module_new, nom_module } = req.body;
    const { code_module } = req.params;

    const missingFields = [];


    if ( nom_module === undefined ){
        missingFields.push("nom_module");
    }

    if ( code_module_new === undefined){
        req.body["code_module_new"] = code_module
    }

    if ( missingFields.length > 0 ){
        const response = {
            status : "error",
            message: "missing required fields: " + missingFields 
        };
        res.status(400).json(response);
        return false;
    }
    
    next()
};
