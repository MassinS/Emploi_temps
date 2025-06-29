import { getAllEnsetOccup,
         getAllEnsetOccupByMatricule,
         createEnsetOccup,
         updateEnsEtOccup,
         deleteEnsEtOccup

} from "../DB/EnsEtOccup.js";

export const selectAllEnsetOccup =(req,res)=>{

    getAllEnsetOccup().then((data)=>{

        const response={
            status:"Success",
            message:"Tout l'ensemble des enseignants et leur occupation  sont trouvés",
            EnsEtOccup : data
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
/* @MassinS
    ! modified
    * changed name from ...Id to ...Matricule
    ? remove after reading
    --written by @lyesrabhi16
*/
export const selectAllEnsetOccupByMatricule = (req,res) =>{
 
     const { matricule } = req.params;
     getAllEnsetOccupByMatricule(matricule).then((data)=>{
        const response={
            status:"Success",
            message:"enseignant et leurs occupations sont trouvés",
            EnsEtOccup : data
           }
           if( data===null) {

            response.status='Error';
            response.message='Aucun occupation  trouvé';
            return res.status(404).json(response);

            
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

export const insertOneEnsetOccup = (req,res)=>{

     const {matricule,id_occup} = req.body;
     createEnsetOccup(matricule,id_occup).then(()=>{

        const response={
            status:"Success",
            message:"EnsEtOccup Créé"
           }
           res.status(200).json(response);

     }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la création des données ",
            erreur:err
           }
          res.status(500).json(response);

      })
} 

export const putOneEnsEtOccup=(req,res)=>{
    const {matricule,id_occup} = req.params;
    const {matricule_new, id_occup_new} = req.body;
    updateEnsEtOccup(matricule,id_occup, matricule_new, id_occup_new).then(()=>{
        const response={
            status:"Success",
            message:"EnsEtOccup mis à jour"
           }
           res.status(200).json(response);


    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la mis à jour des données ",
            erreur:err
           }
          res.status(500).json(response);

      })
}

export const deleteOneEnsEtOccup =(req,res)=>{
    const {matricule,id_occup}=req.params;
    deleteEnsEtOccup(matricule,id_occup).then(()=>{
        const response={
            status:"Success",
            message:"EnsEtOccup supprimé "
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la suppression des données ",
            erreur:err
           }
          res.status(500).json(response);

      })
}