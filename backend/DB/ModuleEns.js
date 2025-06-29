import { db } from "../server.js";

export const getAllModuleEns =(code_module) =>{
    let sql = `SELECT ME.matricule , P.nom , P.Prenom, P.role, P.charges , M.code_module,M.nom_module , ME.priorite
                FROM ModuleEns ME 
                LEFT JOIN Personne P on ME.matricule = P.matricule 
                LEFT JOIN Module M on ME.code_module= M.code_module`;
    if (code_module !== undefined) {
        sql += ` WHERE ME.code_module=$1`;
    };
    return db.manyOrNone(sql, [code_module]);
}

export const getAllModuleEnsById=(matricule)=>{

    return db.manyOrNone(`SELECT ME.matricule , P.nom , P.Prenom, P.role , M.code_module,M.nom_module , ME.priorite
                          FROM ModuleEns ME 
                          LEFT JOIN Personne P on ME.matricule = P.matricule 
                          LEFT JOIN Module M on ME.code_module= M.code_module
                          where ME.matricule=$1`,[matricule]);

}
export const updateModuleEns=(matricule_new,code_module_new,priorite,matricule,code_module)=>{

return db.oneOrNone('UPDATE ModuleEns SET matricule=$1,code_module=$2,priorite=$3 WHERE matricule=$4 and code_module=$5 ',
                     [matricule_new,code_module_new,priorite,matricule,code_module]);

}

export const  createModuleEns =(matricule,code_module,priorite)=>{
return db.oneOrNone(`INSERT INTO ModuleEns(matricule,code_module,priorite) VALUES
                     ($1,$2,$3)`,[matricule,code_module,priorite]);
}

export const deleteModuleEns =(matricule,code_module)=>{

    return db.oneOrNone('DELETE FROM ModuleEns WHERE matricule=$1 AND code_module=$2',[matricule,code_module]);
}


export const deleteModulebyMatricule =(matricule)=>{

return db.manyOrNone('DELETE FROM ModuleEns where matricule=$1',[matricule]);

}

