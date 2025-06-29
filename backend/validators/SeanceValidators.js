import { TypeSeance } from "../../constants.js";
import { TypeSeanceValidator } from "./OtherValidators.js";

export const addSeanceValidator =(req,res,next)=>{
    const {type, niveau, semestre,code_module,code_specialite} =req.body;


    const missingFields =[];
    
    if(!type) {
     missingFields.push("attribut type manquant , ");
    }
    if(!niveau) {
        missingFields.push("attribut niveau manquant , ");
    }
    if(!semestre) {
        missingFields.push("attribut semestre manquant , ");
    }
    if(!code_module) {
        missingFields.push("attribut code_module manquant , ");
    }
    if(!code_specialite) {
        missingFields.push("attribut code_specialite manquant ");
    }

    if (missingFields.length>0) {
 
    return res.status(400).json({
        status:"Error",
        message: missingFields
    })
    }
     
    if (!TypeSeanceValidator(type)) {
        return res.status(400).json({
            status:"Error",
            message: " Type de séance est invalide "
        })
    }

next();
}

export const selectAllSeanceByTypeValidator = (req, res, next) => {
    const { type } = req.params;

    if (!TypeSeanceValidator(type)) {
        res.status(400).json({
            status: 'error',
            message: `type ${type} invalide. type must be one of [${Object.keys(TypeSeance).join(', ')}]`
        });
        return false;
    }

    next();
};
