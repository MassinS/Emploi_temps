import { getAllModuleEns,
         getAllModuleEnsById,
         createModuleEns,
         updateModuleEns,
         deleteModuleEns,
         deleteModulebyMatricule
        } from "../DB/ModuleEns.js";


export const selectAllModuleEns =(req,res)=>{

    getAllModuleEns().then((data)=>{
      
        const response={
            status:"Success",
            message:"Tout l'ensemble des enseignants et leur module  sont trouvés",
            ModuleEns : data
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

export const selectAllModuleEnsById=(req,res)=>{
 
    const {matricule}=req.params;
    getAllModuleEnsById(matricule).then((data)=>{
        const response={
            status:"Success",
            message:"Tout l'ensemble des enseignants et leur module  sont trouvés",
            ModuleEns : data
           }

           if(data===null){

            response.status='Error';
            response.message='Aucun module trouvé'
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

export const insertOneModuleEns=(req,res)=>{

    const {matricule,code_module,priorite}=req.body;
    createModuleEns(matricule,code_module,priorite).then(()=>{

        const response={
            status:"Success",
            message:"ModuleEns Créé"
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

export const putOneModuleEns=(req,res)=>{ 
const {matricule,code_module}=req.params;
const {matricule_new,code_module_new,priorite} = req.body;

  updateModuleEns(matricule_new,code_module_new,priorite,matricule,code_module).then(()=>{
    const response={
        status:"Success",
        message:"ModuleEns mis à jour"
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

export const deleteOneModuleEns =(req,res)=>{
 const {matricule,code_module}=req.params;

 deleteModuleEns(matricule,code_module).then(()=>{

    const response={
        status:"Success",
        message:"ModuleEns supprimé "
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
export const deleteAllModulesByMatricule =(req,res)=>{
    const {matricule} =req.params;
    console.log(matricule);
    deleteModulebyMatricule(matricule).then(()=>{
        
    const response={
        status:"Success",
        message:"ModuleEns supprimé "
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
