import { TimeFormatValidator, typeJourValidator } from "./OtherValidators.js";

export const addCreneauValidators=(req,res,next)=>{
const {
    debut, 
    fin,
     jour,
    id_Emp, 
    id_seance,
    code_local,
}=req.body;


const missingFields = [];
const invalideFields = [];


if ( debut==undefined) {
    missingFields.push("debut");
} else if (!TimeFormatValidator(debut)) {
    invalideFields.push("debut");
}
if ( fin==undefined) {
    missingFields.push("fin");
} else if(!TimeFormatValidator(fin)) {
    invalideFields.push("fin");
}
if( jour==undefined) {
    missingFields.push("jour");
}
if(id_Emp==undefined) {
    missingFields.push("id_Emp");
}

if(id_seance==undefined) {
    missingFields.push("id_seance");
}
if(code_local==undefined) {
    missingFields.push("code_local");
}

if(missingFields.length>0) {

    return  res.status(400).json({
    status:"Error",
    message:"Attributs manquants " + missingFields
 })
  
}

const heureDebut = parseInt(debut.split(":")[0]); 
const heureFin = parseInt(fin.split(":")[0]);



if ( !typeJourValidator(jour) ) {
        invalideFields.push("jour");
     }

     if ( invalideFields.length>0) {
        return  res.status(400).json({
            status:"Error",
            message:"Attributs invalide : " + invalideFields 
        })
       
     }


     if (heureDebut>17 || heureDebut<8 || heureFin >18 || heureFin<9) {

        return res.status(400).json({
           status:"error",
           message:'heure mal choisi'
        })
     }

     if(heureDebut>heureFin || heureDebut==heureFin ) {
   
        return  res.status(400).json({
            status: "error",
            message: " heur_debut > heur_fin  ",
        });
       
        
     }
     
next();

};

export const verificationCreneauValidator = (req, res, next) => {
    const { debut, fin, jour, matricule, code_local, annee, semestre, id_creneau } = req.body;
    const messages = [];
    if (!TimeFormatValidator(debut)) {
        messages.push("debut");
    }
    if (!TimeFormatValidator(fin)) {
        messages.push("fin");
    }
    if (!typeJourValidator(jour)) {
        messages.push("jour");
    }
    if(matricule === undefined){
        messages.push("matricule");
    }
    if(code_local === undefined){
        messages.push("code_local");
    }
    if(annee === undefined){
        messages.push("annee");
    }
    if(semestre === undefined){
        messages.push("semestre");
    }
    if(id_creneau !== undefined){
        req.body.id_creneau = id_creneau.split(",");
    }
    
    if (messages.length > 0) {
        return res.status(400).json({
            status: "Error",
            message: "Attributs manquants ou invalides: " + messages,
        });
    }
    next();
}