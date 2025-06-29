import { createLocal,
    UpdateLocal,
    deleteLocal,
    getAllLocal,
    getAllLocalByType,
    getOneLocalById } from "../DB/Local.js";

export const selectAllLocal=(req,res)=>{
      const {capacite, type }=req.body;
    getAllLocal(capacite,type).then((data)=>{
        const response = {
            status: "success",
            message: "Tout les locaux sont trouvés  " ,
            Locaux: data,
          };
          res.status(200).json(response);
    }).catch((err)=>{
        const response = {
            status: "Error",
            message: "TErreur pendant la sélection des locaux  " ,
            erreur: err
          };
          res.status(500).json(response);
    })

}
export const putOneLocal =(req,res)=>{

    const {code_local}=req.params;
    const {code_local_new, capacite, type }= req.body;
     UpdateLocal(code_local,code_local_new,capacite,type).then(()=>{
        const response = {
            status: "success",
            message: "Local mis à jour ",
          };
          res.status(200).json(response);

     }).catch((err)=>{
        const response = {
            status: "Error",
            message: "Erreur pendant la mis à jour ",
            erreur: err
          };
          
          res.status(500).json(response);
     })
     console.log(req.body)

}

export const deleteOneLocal =(req,res)=>{
    const {code_local} = req.params;

    deleteLocal(code_local).then(()=>{
        const response = {
            status: "success",
            message: "Local supprimé "
          };
          res.status(200).json(response);

    }).catch((err)=>{
        const response = {
            status: "Error",
            message: "Erreur pendant la suppression de Local ",
            erreur: err
          };
          res.status(500).json(response);

    })
}

export const  insertOneLocal=(req,res)=>{

    const {code_local,capacite,type} = req.body;

    createLocal(code_local,capacite,type).then(()=>{
        const response={
            status:"Success",
            message:'Local créé'
        }
        res.status(201).json(response);
    }).catch((err)=>{
        const response={
            status:'Error',
            message:'Erreur pendant la création de Local ',
            erreur: err
        }

        res.status(500).json(response);
    })
}

export const selectAllLocalByType=(req,res)=>{
    const {type} = req.params;

    getAllLocalByType(type).then((data)=>{

        const response = {
            status: "success",
            message: "Tout les locaux par type " + type + " sont trouvés  " ,
            Locaux: data,
          };
          if(data===null) {
            response.status='Error';
            response.message='Aucun Local trouvé de ce type'
            return res.status(404).json(response)  
        }

          res.status(200).json(response);  
    }).catch((err)=>{
        const response={
            status:'Error',
            message:'Erreur pendant la recheche des Locaux ',
            erreur: err
        }
           res.status(500).json(response);
    })
}

export const selectOneLocalById=(req,res)=>{
    const {code_local}=req.params;
    getOneLocalById(code_local).then((data)=>{
        const response = {
            status: "success",
            message: " local trouvé  " ,
            Local: data
          };

          if(data===null) {
            response.status='Error';
            response.message='Aucun Local trouvé'
            return  res.status(404).json(response)  
          }
             res.status(200).json(response);  
             

    }).catch((err)=>{
        const response={
            status:'Error',
            message:'Erreur pendant la recherche de local ',
            erreur: err
        }
        res.status(500).json(response);
        
    })
}