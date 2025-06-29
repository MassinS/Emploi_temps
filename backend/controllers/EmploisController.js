import { getAllEmplois,
         getOneEmploisById,
         getOneEmploisByGroupe,
         createEmplois,
         updateEmplois,
         deleteEmplois,
         deleteEmploisByIdGroupe
         
} from "../DB/EmploisDuTemps.js";

export const selectAllEmplois =(req,res)=>{

      getAllEmplois().then((data)=>{
        const response={
            status:"Success",
            message:"Tout les emplois de temps  sont trouvés",
            Emplois_temps : data
           }
           res.status(200).json(response);


      }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des emplois de temps",
            erreur:err
           }
          res.status(500).json(response);

      })

}


export const selectOneEmploisById = (req,res) =>{
   const {id_Emp} = req.params;
   getOneEmploisById(id_Emp).then((data)=>{
    const response={
        status:"Success",
        message:"Emplois de temps trouvé ",
        Emplois_temps : data
       }
       
       if(data===null ) {

        response.status='Error';
        response.message='Aucun Emplois de temps trouvé'
        return res.status(404).json(response)

       }
       
       res.status(200).json(response);

   }).catch((err)=>{
    const response={
        status:"Error",
        message:"Erreur pendant la recherche d'emplois de temps",
        erreur:err
       }
      res.status(500).json(response);

  })

}

export const selectOneEmploisByGroupe = (req,res) =>{
    const {id_groupe, semestre, annee, niveau} = req.params;
    getOneEmploisByGroupe(id_groupe, semestre, annee, niveau).then((data)=>{
        const response={
            status:"Success",
            message:"Emplois de temps trouvé ",
            Emplois_temps : data
           }
           
           if(data===null ) {
    
            response.status='Error';
            response.message='Aucun Emplois de temps trouvé pour ce groupe  '+ id_groupe + ` ${semestre} ${annee} ${niveau}` 
            return res.status(404).json(response)
    
           }
           
           res.status(200).json(response);


    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche d'emplois de temps",
            erreur:err
           }
          res.status(500).json(response);
    
      })
}

export const insertOneEmplois = (req,res) =>{

  const { niveau, semestre, id_groupe } =req.body;
    createEmplois(id_groupe, niveau, semestre).then(()=>{
     
        const response={
            status:"Success",
            message:"Emplois de temps créé "
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la création d'emplois de temps",
            erreur:err
           }
          res.status(500).json(response);
    
      })

}

export const updateOneEmplois =(req,res)=>{
    const { id_groupe, niveau, semesetre } = req.body;
    const {id_emp}=req.params;
    updateEmplois(id_emp,id_groupe, niveau, semesetre).then(()=>{
        const response={
            status:"Success",
            message:"Emplois de temps mis à jour "
           }
           res.status(200).json(response);
    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la mis à jour d'emplois de temps",
            erreur:err
           }
          res.status(500).json(response);
    
      })

}

export const deleteOneEmplois =(req,res)=>{

    const {id_emp} = req.params;

    deleteEmplois(id_emp).then(()=>{
    
        const response={
            status:"Success",
            message:"Emplois de temps supprimé  "
           }
           res.status(200).json(response);



    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la suppression d'emplois de temps",
            erreur:err
           }
          res.status(500).json(response);
    
      })

}

export const deleteOneEmploisByIdGroupe=(req,res)=>{
    const {id_groupe, semestre, annee} = req.params;
    deleteEmploisByIdGroupe(id_groupe, semestre, annee).then(()=>{

        const response={
            status:"Success",
            message:"Emplois de temps supprimé  "
           }
           res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la suppression d'emplois de temps",
            erreur:err
           }
          res.status(500).json(response);
    
      })

}