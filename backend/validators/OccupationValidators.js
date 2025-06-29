import { jours  } from "../../constants.js";
import { TimeFormatValidator, typeJourValidator } from "./OtherValidators.js";


export const addOccupationValidator = (req,res,next)=>{

const {
    jour,
    heur_debut,
    heur_fin,
} = req.body;

const missingFields = [];
const invalideFields = [];


if ( jour==undefined) {
    missingFields.push("jour");
}


if ( heur_debut==undefined) {
    missingFields.push("heur_debut");
}else if (!TimeFormatValidator(heur_debut)) {
    invalideFields.push("attribut heur_debut invalide !");
}

if ( heur_fin==undefined) {
    missingFields.push("heur_fin");
}else if (!TimeFormatValidator(heur_fin)) {
    invalideFields.push("attribut heur_fin invalide !");
}


if ( missingFields.length>0) {
    return res.status(400).json({
        status: "error",
        message:
          "missing required fields: " +
          missingFields 
      });
     
}


if ( invalideFields.length>0) {
    return res.status(400).json({
        status: "error",
        message:
          " invalide fields : " + invalideFields
      });
  
}

const heureDebut = parseInt(heur_debut.split(":")[0]); 
const heureFin = parseInt(heur_fin.split(":")[0]);

if ( heureDebut < 8 || heureDebut > 18 || heureFin < 8 ) {
    return res.status(400).json({
        status: "error",
        message: " occupation inutile ",
    });
   
}

if (heureDebut>heureFin || heureDebut==heureFin) {
    return  res.status(400).json({
        status: "error",
        message: " heur_debut > heur_fin  ",
    });
   
    
}
if (!typeJourValidator(jour)) {
        return  res.status(400).json({
            status: "error",
            message: " Erreur dans le jour  ou jour mal choisi  ",
        });
        

    }

next();
};

