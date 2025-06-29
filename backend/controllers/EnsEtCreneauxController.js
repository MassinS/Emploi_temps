import { getAllEnsEtCreneaux,
         getAllEnsEtCreneauxById,
         createEnsEtCreneau,
         updateEnsEtCreneau,
         deleteEnsEtCreneau,
         getAllCreneauEns
} from "../DB/EnsEtCreneaux.js";


export const selectAllEnsetCreneaux=(req,res)=>{
    getAllEnsEtCreneaux().then((data)=>{

        const response={
            status:"Success",
            message:"Tout l'ensemble des enseignants et leur créneaux  sont trouvés",
            EnsEtCreneau : data
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des données ",
            erreur:err
           }
          res.status(500).json(response);

      })
}
export const selectAllEnsetCreneauxById=(req,res)=>{
    const {matricule} =req.params;

    getAllEnsEtCreneauxById(matricule).then((data)=>{
        const response={
            status:"Success",
            message:"Tout l'ensemble des enseignants et leur créneaux  sont trouvés",
            EnsEtCreneau : data
           }
           if( data===null) {
            response.status='Error';
            response.message='Aucun créneau  trouvé'
            return res.status(404).json(response)
           }
           res.status(200).json(response);
          
    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des données ",
            erreur:err
           }
          res.status(500).json(response);

      })


}

export const insertOneEnsEtCreneaux=(req,res)=>{
    const {matricule,id_creneau}=req.body;

    createEnsEtCreneau(matricule,id_creneau).then(()=>{
        const response={
            status:"Success",
            message:"EnsEtCreneau créé",
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des données ",
            erreur:err
           }
          res.status(500).json(response);

      })

}
export const putOneEnsEtCreneaux=(req,res)=>{

    const {matricule,id_creneau}=req.params;
    const{matricule_new,id_creneau_new}=req.body;
    updateEnsEtCreneau(matricule_new,id_creneau_new,matricule,id_creneau).then(()=>{
        const response={
            status:"Success",
            message:"EnsEtCreneau mis à jour",
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des données ",
            erreur:err
           }
          res.status(500).json(response);

      })
  
} 
export const deleteOneEnsEtCreneaux=(req,res)=>{
   
    const {matricule,id_creneau}=req.params;
    deleteEnsEtCreneau(matricule,id_creneau).then(()=>{
        const response={
            status:"Success",
            message:"EnsEtCreneau supprimé",
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des données ",
            erreur:err
           }
          res.status(500).json(response);

      })
}

export const getAllCreneauWithAllInformation=(req,res)=>{

const {matricule,annee,semestre}=req.params;


getAllCreneauEns(matricule,annee,semestre).then((data)=>{

    const response={
        status :"Success",
        message : "Tout les creneau de cet enseignant sont trouvé",
        EnsEtCreneau : data
    }
    if( data===null) {
     response.status='Error';
     response.message='Aucun créneau  trouvé'
     return res.status(404).json(response)
    }
    res.status(200).json(response);

}).catch((err)=>{
    const response={
        status:"Error",
        message:"Erreur pendant la recherche des données ",
        erreur:err
       }
      res.status(500).json(response);


})

}