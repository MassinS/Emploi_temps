import { getAllCreneau,
         getOneCreneauById,
         getAllCreneauByGroupe,
         updateCreneau,
         createCreneau,
         deleteCreneau,
         getAllCreneauBySection,
         getCreneaux,
         getAllCreneauOfEnseignant,
         getAllCreneauOfGroupe
} from "../DB/Creneau.js";
import { getAllCreneauEns } from "../DB/EnsEtCreneaux.js";
import { getAllEnsetOccupByMatricule } from "../DB/EnsEtOccup.js";
import { correctTimeFormat } from "../EmpAsFile/emp_xlsx.js";

export const selectAllCreneau = (req,res) =>{

   getAllCreneau().then((data)=>{
    const response={
        status:"Success",
        message:"Tout les creneaux sont trouvés",
        Creneaux: data
       }
       res.status(200).json(response);

   }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des creneaux",
            erreur:err
           }
          res.status(500).json(response);
    })
}
export const selectOneCreneauById=(req,res) =>{
 
    const {id_creneau} = req.params;
  getOneCreneauById(id_creneau).then((data)=>{
    const response={
        status:"Success",
        message:"creneau trouvé",
        Creneau: data
       }

       if(data===null) {
        response.status='Error';
        response.message='Aucune creneau trouvé'
        return res.status(404).json(response)  
       }

       res.status(200).json(response);

  }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche de ce creneau",
            erreur:err
           }
          res.status(500).json(response);
    })

}

export const selectAllCreneauByGroupe =(req,res)=>{
    const { id_groupe } = req.params;
    console.log(id_groupe);
     getAllCreneauByGroupe(id_groupe).then((data)=>{
        const response={
            status:"Success",
            message:"Tout les creneaux sont trouvés du groupe: "+ id_groupe ,
            Creneaux: data
           }
    
    
           res.status(200).json(response);
     }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des creneaux",
            erreur:err
           }
          res.status(500).json(response);
    })

}

export const selectAllCreneauBySection =(req,res)=>{
    const { id_section, semestre, annee } = req.params;
    console.log(`GET ALL CRENEAUX ${id_section} ${semestre} ${annee}`);
     getAllCreneauBySection(id_section, semestre, annee).then((data)=>{


        let horaires = [];
        let groupes = [];
        data.forEach(creneau => {
            if(!horaires.find((h) => h===`${correctTimeFormat(creneau.debut, ':')}-${correctTimeFormat(creneau.fin, ':')}` )){
                horaires.push(`${correctTimeFormat(creneau.debut, ':')}-${correctTimeFormat(creneau.fin, ':')}`);
            }
            if(!groupes.find((g) => g===creneau.code_groupe)){
                groupes.push(creneau.code_groupe);
            }
        });
        horaires.sort();
        groupes.sort();
        const jours = ['Samedi','Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'];
        const creneaux = {};
        jours.forEach(jour => {
            creneaux[jour] = {};
            horaires.forEach((h,i) => {
                const h_split = h.split("-", 2);
                creneaux[jour][""+i] = {
                    debut: h_split[0],
                    fin  : h_split[1]
                };
                groupes.forEach(g => {
                    creneaux[jour][i][g] = {};
                });
            })
        });

        data.forEach(c => {        
            creneaux[c.jour][horaires.findIndex(h => h === `${correctTimeFormat(c.debut, ':')}-${correctTimeFormat(c.fin, ':')}`)][c.code_groupe] = {
                "seance" : {
                    "id_seance": c.id_seance,
                    "type": c.type_seance,
                    "niveau": c.niveau,
                    "semestre": c.semestre,
                    "nom_module": c.nom_module,
                    "nom_specialite": c.nom_specialite,
                    "code_module": c.code_module,
                    "code_specialite": c.code_specialite
                },
                "locale": {
                    "code_local": c.code_local
                },
                "enseignant": {
                    "matricule": c.matricule,
                    "nom": c.nom,
                    "prenom": c.prenom,
                    "role": c.role,
                    "charges": c.charges,
                },
                "groupe": {
                    "id_groupe": c.id_groupe,
                    "code_groupe": c.code_groupe,
                    "id_section": c.id_section,
                    "code_section": c.code_section,
                    "niveau": c.niveau,
                    "code_specialite": c.code_specialite,
                    "nom_specialite": c.nom_specialite,
                },
                "creneau": {
                    "id_creneau": c.id_creneau,
                    "debut": c.debut,
                    "fin": c.fin,
                    "jour": c.jour,
                    "id_emp": c.id_emp,
                }
            };
        
        });

        const response={
            status:"Success",
            message:"Tout les creneaux sont trouvés de la section: "+ id_section ,
            Creneaux: creneaux
           }
           res.status(200).json(response);
     }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des creneaux",
            erreur:err
           }
          res.status(500).json(response);
    })

}


export const selectAllCreneauOfEnseignant =(req,res)=>{
    const { matricule, semestre, annee } = req.params;
    console.log(`GET ALL CRENEAUX ENS ${matricule} ${semestre} ${annee}`);
     getAllCreneauOfEnseignant(matricule, semestre, annee).then((data)=>{


        let horaires = [];
        data.forEach(creneau => {
            if(!horaires.find((h) => h===`${correctTimeFormat(creneau.debut, ':')}-${correctTimeFormat(creneau.fin, ':')}` )){
                horaires.push(`${correctTimeFormat(creneau.debut, ':')}-${correctTimeFormat(creneau.fin, ':')}`);
            }
        });
        horaires.sort();
        const jours = ['Samedi','Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'];
        const creneaux = {};
        jours.forEach(jour => {
            creneaux[jour] = {};
            horaires.forEach((h,i) => {
                const h_split = h.split("-", 2);
                creneaux[jour][""+i] = {
                    debut: h_split[0],
                    fin  : h_split[1],
                    info: {}
                };
            })
        });
        data.forEach(c => {   
            creneaux[c.jour][horaires.findIndex(h => h === `${correctTimeFormat(c.debut, ':')}-${correctTimeFormat(c.fin, ':')}`)]["info"] = {
                "seance" : {
                    "id_seance": c.id_seance,
                    "type": c.type_seance,
                    "niveau": c.niveau,
                    "semestre": c.semestre,
                    "nom_module": c.nom_module,
                    "nom_specialite": c.nom_specialite,
                    "code_module": c.code_module,
                    "code_specialite": c.code_specialite
                },
                "locale": {
                    "code_local": c.code_local
                },
                "enseignant": {
                    "matricule": c.matricule,
                    "nom": c.nom,
                    "prenom": c.prenom,
                    "role": c.role,
                    "charges": c.charges,
                },
                "groupe": {
                    "id_groupe": c.id_groupe,
                    "code_groupe": c.code_groupe,
                    "id_section": c.id_section,
                    "code_section": c.code_section,
                    "niveau": c.niveau,
                    "code_specialite": c.code_specialite,
                    "nom_specialite": c.nom_specialite,
                },
                "creneau": {
                    "id_creneau": c.id_creneau,
                    "debut": c.debut,
                    "fin": c.fin,
                    "jour": c.jour,
                    "id_emp": c.id_emp,
                }
            };
        
        
        });

        const response={
            status:"Success",
            message:"Tout les creneaux sont trouvés de l'enseignant: "+ matricule ,
            Creneaux: creneaux
           }
           res.status(200).json(response);
     }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des creneaux",
            erreur:err
           }
          res.status(500).json(response);
    })

}

export const selectAllCreneauOfGroupe =(req,res)=>{
    const { id_groupe, semestre, annee } = req.params;
    console.log(`GET ALL CRENEAUX ENS ${id_groupe} ${semestre} ${annee}`);
     getAllCreneauOfGroupe(id_groupe, semestre, annee).then((data)=>{


        let horaires = [];
        data.forEach(creneau => {
            if(!horaires.find((h) => h===`${correctTimeFormat(creneau.debut, ':')}-${correctTimeFormat(creneau.fin, ':')}` )){
                horaires.push(`${correctTimeFormat(creneau.debut, ':')}-${correctTimeFormat(creneau.fin, ':')}`);
            }
        });
        horaires.sort();
        const jours = ['Samedi','Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'];
        const creneaux = {};
        jours.forEach(jour => {
            creneaux[jour] = {};
            horaires.forEach((h,i) => {
                const h_split = h.split("-", 2);
                creneaux[jour][""+i] = {
                    debut: h_split[0],
                    fin  : h_split[1],
                    info: {}
                };
            })
        });
        data.forEach(c => {   
            creneaux[c.jour][horaires.findIndex(h => h === `${correctTimeFormat(c.debut, ':')}-${correctTimeFormat(c.fin, ':')}`)]["info"] = {
                "seance" : {
                    "id_seance": c.id_seance,
                    "type": c.type_seance,
                    "niveau": c.niveau,
                    "semestre": c.semestre,
                    "nom_module": c.nom_module,
                    "nom_specialite": c.nom_specialite,
                    "code_module": c.code_module,
                    "code_specialite": c.code_specialite
                },
                "locale": {
                    "code_local": c.code_local
                },
                "enseignant": {
                    "matricule": c.matricule,
                    "nom": c.nom,
                    "prenom": c.prenom,
                    "role": c.role,
                    "charges": c.charges,
                },
                "groupe": {
                    "id_groupe": c.id_groupe,
                    "code_groupe": c.code_groupe,
                    "id_section": c.id_section,
                    "code_section": c.code_section,
                    "niveau": c.niveau,
                    "code_specialite": c.code_specialite,
                    "nom_specialite": c.nom_specialite,
                },
                "creneau": {
                    "id_creneau": c.id_creneau,
                    "debut": c.debut,
                    "fin": c.fin,
                    "jour": c.jour,
                    "id_emp": c.id_emp,
                }
            };
        
        
        });

        const response={
            status:"Success",
            message:"Tout les creneaux sont trouvés du groupe: "+ id_groupe ,
            Creneaux: creneaux
           }
           res.status(200).json(response);
     }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des creneaux",
            erreur:err
           }
          res.status(500).json(response);
    })

}


export const putOneCreneau = (req,res)=>{
    const {id_creneau} = req.params;
    const { debut, fin, jour,id_Emp,id_seance,code_local } = req.body;
    updateCreneau(id_creneau,debut, fin, jour,id_Emp,id_seance,code_local).then(()=>{
        
        const response={
            status:"Success",
            message:"creneau mis à jour "
           }
           res.status(200).json(response);
    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la mise à jour  de creneau",
            erreur:err
           }
          res.status(500).json(response);
    })
}
export const insertOneCreneau = (req,res)=>{

const { debut, fin, jour,id_Emp,id_seance,code_local } = req.body;
createCreneau(debut, fin, jour,id_Emp,id_seance,code_local ).then(()=>{
    const response={
        status:"Success",
        message:"creneau créé "
       }
       res.status(200).json(response);

}).catch((err)=>{
    const response={
        status:"Error",
        message:"Erreur pendant la création  de creneau",
        erreur:err
       }
      res.status(500).json(response);
})


}

export const deleteOneCreneau =(req,res)=>{
    const {id_creneau}=req.params;
    deleteCreneau(id_creneau).then(()=>{
        const response={
            status:"Success",
            message:"creneau supprimé "
           }
           res.status(200).json(response);
    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la suppression de creneau",
            erreur:err
           }
          res.status(500).json(response);
    })
}

export const verificationCreneau = async (req, res) => {
    const { debut, fin, jour, matricule, code_local, annee, semestre, id_creneau } = req.body;
    const messages = [];
    const local = await getCreneaux(debut, fin, jour, code_local, id_creneau).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: "Error",
            message: "Erreur pendant la recherche des creneaux",
            erreur: err,
        });
    });
    if (local.length > 0){
        console.log(local);
        messages.push("Local déjà occupé");
    }
    const ensO = await getAllEnsetOccupByMatricule(matricule, jour, debut, fin).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: "Error",
            message: "Erreur pendant la recherche d'occupations de l'enseignant",
            erreur: err,
        });
    });
    if (ensO.length > 0){
        console.log(ensO);

        messages.push("Enseignant occupé");
    }

    const ensCs = await getAllCreneauEns(matricule, annee, semestre, jour, debut, fin, id_creneau).catch(err =>{
        console.log(err);
        return res.status(500).json({
            status: "Error",
            message: "Erreur pendant la recherche des creneaux de l'enseignant",
            erreur: err,
        });
    })

    if(ensCs.length > 0){
        console.log(ensCs);
        messages.push("Enseignant déjà affecté");
    }
    if (messages.length > 0){
        return res.status(400).json({
            status: "Error",
            message: messages,
        });
    }
    return res.status(200).json({
        status: "Success",
        message: "Créneau disponible",
    });
}