import { db } from "../server.js";
/**
@returns {Promise}
 */ 
export const selectAllModule = () => {
    return db.manyOrNone("SELECT * FROM Module");
  };

export const selectOneModule = (code_module) => {
    return db.oneOrNone("SELECT * FROM Module WHERE code_module = $1", [code_module]);
};

/** 
 @param {string} code_module 
 @param {string} nom_module
 @returns {Promise<object|null>} 
*/
export const UpdateModule=(code_module, code_module_new, nom_module)=>{
    /* @MassinS
        !modified
        ? check putOneModule in moduleController for more info
        
        ? remove after reading

        --written by @lyesrabhi16
     */
    return db.oneOrNone("UPDATE Module SET code_module=$1, nom_module=$2 WHERE code_module=$3",[code_module_new, nom_module, code_module])
}
/** 
 @param {string} code_module 
 @param {string} nom_module
 @returns {Promise<object|null>} 
*/
export const createModule=(code_module,nom_module)=>{
return db.oneOrNone("INSERT INTO Module (code_module,nom_module) VALUES ($1,$2)",[code_module,nom_module]);
}

/** 
 @param {string} code_module 
 @returns {Promise<object|null>} 
*/
export const deleteModule=(code_module)=>{
    return db.oneOrNone("DELETE FROM Module WHERE code_module=$1",[code_module]);
}
