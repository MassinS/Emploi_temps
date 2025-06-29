import { getAllSeance,
         getOneSeanceById ,
         getAllSeanceByType ,
         createSeance,
         UpdateSeance,
         deleteSeance,
         deleteSeanceByCodeModule

} from "../DB/Seance.js";

export const selectAllSeance=(req,res)=>{

    getAllSeance().then((data)=>{

       const response={
        status:"Success",
        message:"Tout les séances sont trouvés",
        Seances: data
       }
       res.status(200).json(response);

    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche des séances",
            erreur:err
           }
          res.status(500).json(response);
    })

}
export const selectOneSeanceById=(req,res)=>{
    const {id_seance} = req.params;
    getOneSeanceById(id_seance).then((data)=>{

       const response={
        status:"Success",
        message : "Séance trouvé ",
        Seance : data
       }
       if(data===null) {
        response.status='Error';
        response.message='Aucune seance trouvée'
        return res.status(404).json(response)  
       }
          
       res.status(200).json(response); 
    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche de la séance",
            erreur:err
           }
          res.status(500).json(response);
          


    })
}

export const selectAllSeanceByType=(req,res)=>{

    const {type}=req.params;
    console.log(type);

    
    getAllSeanceByType(type).then((data)=>{

        const response={
            status:"Success",
            message : " tout les Séances de type "+ type + " sont trouvés ",
            Seances : data
           }

           if(data===null) {
            response.status='Error';
            response.message='Aucune seance trouvé'
            return res.status(404).json(response)  
           }
              

           res.status(200).json(response); 


    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la recherche de la séance",
            erreur:err
           }
          res.status(500).json(response);
          

    })

}

export const insertOneSeance= (req,res)=>{
  const {type, niveau, semestre, code_module, code_specialite}=req.body;
  createSeance(type, niveau, semestre,code_module, code_specialite).then((data)=>{
    
    const response={
        status:"Success",
        message:"Séance créée"
       }
       res.status(200).json(response);

  }).catch((err)=>{
    const response={
        status:"Error",
        message:"Erreur pendant la création de la séance",
        erreur:err
       }
      res.status(500).json(response);

  })
}

export const putOneSeance=(req,res)=>{
  const {id_seance} = req.params;
  const {  type,niveau, semestre,code_module,code_specialite }=req.body;
  UpdateSeance(type, niveau, semestre,code_module,code_specialite,id_seance).then(()=>{
    const response={
        status:"Success",
        message:"Séance mis à jour"
       }
       res.status(200).json(response);

  }).catch((err)=>{
    const response={
        status:"Error",
        message:"Erreur pendant la mise à jour de la séance",
        erreur:err
       }
      res.status(500).json(response);

  })

}
export const deleteOneSeance=(req,res)=>{
    const {id_seance}=req.params;
    deleteSeance(id_seance).then(()=>{
        const response={
            status:"Success",
            message:"Séance supprimé"
           }
           res.status(200).json(response);
    }).catch((err)=>{
        const response={
            status:"Error",
            message:"Erreur pendant la suppression de la séance",
            erreur:err
           }
          res.status(500).json(response);
    
      })

}

export const deleteOneSeanceByCodeModule=(req,res)=>{
  const {code_module}=req.params;
  deleteSeanceByCodeModule(code_module).then(()=>{
    const response={
        status:"Success",
        message:"Séances supprimés"
       }
       res.status(200).json(response);

  }).catch((err)=>{
    const response={
        status:"Error",
        message:"Erreur pendant la suppression des séances",
        erreur:err
       }
      res.status(500).json(response);

  })

}

