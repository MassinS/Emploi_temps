import { db } from "../server.js";

/**
 @returns {Promise}
 */
export const getAllLocal=()=>{

    return db.manyOrNone("SELECT * FROM Local");
}

/**
 @param {string} type
@returns {Promise<object|null>} 
 */

export const getAllLocalByType = (type) => {
    return db.manyOrNone("SELECT * FROM Local WHERE type=$1", [type]);
}


/** 
 @param {string}  code_local
  @returns {Promise<object|null>} 
 */

export const getOneLocalById=(code_local)=>{

    return db.oneOrNone("SELECT * FROM Local WHERE code_Local=$1 ",[code_local]);

}


/**
 @param {string}  code_local
 @param {string} type
 @param {string} capacite
 @param {Promise}
 */

export const UpdateLocal = (code_local,code_local_new,capacite,type) =>{

return db.oneOrNone("UPDATE Local SET code_local=$1, capacite=$2, type=$3 WHERE code_local=$4",[code_local_new, capacite, type, code_local]);

}

/**
 @param {string}  code_local
 @param {string} type
 @param {string} capacite
 @param {Promise}
 */

export const createLocal =(code_local,capacite,type)=>{
return db.oneOrNone('INSERT INTO Local (code_local,capacite,type) VALUES ($1,$2,$3)',[code_local,capacite,type]);
}

/**
 @param {string}  code_local
 @param {Promise}
 */

export const deleteLocal= (code_Local)=> {
return db.oneOrNone('DELETE FROM Local WHERE code_local=$1',[code_Local]);
}
