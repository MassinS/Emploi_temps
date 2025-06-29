import { UpdateModule, createModule, deleteModule, selectAllModule, selectOneModule } from "../DB/Module.js";

export const getAllModule=(req,res)=>{

    selectAllModule().then((data)=>{

        const response = {
            status:'Success',
            message:"Modules trouvés",
            Modules:data
        };
     res.status(200).json(response);
    }).catch((err)=>{
        const response = {
            status: "error",
            message: "Erreur pendant la recherche des modules ",
            error: err,
          };
          res.status(500).json(response);
    })
}

export const getOneModule = (req, res) => {
    const { code_module } = req.params;

    selectOneModule(code_module).then((data)=>{

        const response = {
            status:'Success',
            message:"Module trouvé",
            Module:data
        };
        if (data === null){
            response.status = "Error";
            response.message = "Aucun Module trouvé";
            response.Module = null;
            res.status(404).json(response);
            return false;
        }
        res.status(200).json(response);
    }).catch((err)=>{
        const response = {
            status: "error",
            message: "Erreur pendant la recherche du module ",
            error: err,
          };
          res.status(500).json(response);
    })
}


export const putOneModule=(req,res)=>{

   

    const {code_module_new, nom_module}=req.body;
    const {code_module}=req.params;
    
    UpdateModule(code_module, code_module_new, nom_module).then(()=>{
        const response = {
            status: "success",
            message: "un module mis à jour "
          };
          res.status(200).json(response);
    })
    .catch((err) => {
        const response = {
          status: "error",
          message: "Erreur pendant la mis à jour de module ",
          error: err,
        };
        res.status(500).json(response);
      });
}
export const insertOneModule =(req,res)=>{
    const {code_module,nom_module} = req.body;
    createModule(code_module,nom_module).then(()=>{
        const response = {
            status: "success",
            message: " un module à été créé "
           
          };
          res.status(200).json(response);

    }).catch((err)=>{
        const response = {
            status: "error",
            message: "Erreur pendant la création de moudle ",
            error: err,
          };
          res.status(500).json(response);
    })
}
export const deleteOneModule=(req,res)=>{
    const {code_module} = req.params;
    deleteModule(code_module).then(()=>{
        const response = {
            status: "success",
            message: " un module à été supprimé "
          };
          res.status(200).json(response);
    }).catch((err)=>{
        const response = {
            status: "error",
            message: "Erreur pendant la suppression  de moudle ",
            error: err,
          };
          res.status(500).json(response);
    })

}