import { TypeLocal } from "../../constants.js";
import { LocalCapaciteValidator, typeLocalValidator } from "./OtherValidators.js";

export const insertOneLocalValidator = (req, res, next) => {
    const { code_local, capacite, type } = req.body;
    const missingFields = [];

    if (code_local === undefined) {
        missingFields.push("code_local");
    }

    if (capacite === undefined) {
        missingFields.push("capacite");
    }

    if (type === undefined) {
        missingFields.push("type");
    }

    if (missingFields.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: "Attributs manquants : " + missingFields.join(', ')
        });
    }
    
    if (!typeLocalValidator(type)) {
        return res.status(400).json({
            status: 'error',
            message: 'Attribut type invalide'
        });
    }

    const [VerificationCapacite, VC_messages] = LocalCapaciteValidator(type, capacite);
    if (!VerificationCapacite) {
        return res.status(400).json({
            status: 'error',
            message: VC_messages
        });
    }

    

    next();
};

export const selectAllLocalByTypeValidator = (req, res, next) => {
    const { type } = req.params;

    if (!typeLocalValidator(type)) {
        res.status(400).json({
            status: 'error',
            message: `type ${type} invalide. type must be one of [${Object.keys(TypeLocal).join(', ')}]`
        });
        return false;
    }

    next();
};

export const putOneLocalValidator = (req, res, next) => {
    const { code_local } = req.params;
    let { code_local_new } = req.body;
    if (code_local_new === undefined) {
        code_local_new = code_local;
    }
    req.body.code_local = code_local_new;
    insertOneLocalValidator(req, res, () => {
        delete req.body.code_local;
        req.body.code_local_new = code_local_new;
        next()
    });
};