import { db } from "../server.js";

/** 
@returns {Promise}
*/



export const getAllSeance =(niveau, semestre, code_specialite)=>{
  console.log(semestre, code_specialite);
    let sql = `SELECT id_seance , type, Seance.niveau, semestre,nom_module , nom_specialite,Module.code_module,Specialite.code_specialite 
    from Seance left join Module on Seance.code_module=Module.code_module
    left join Specialite on Seance.code_specialite=Specialite.code_specialite 
    `;
    let w = false;
    if (code_specialite !== undefined) {
      sql += ' where Seance.code_specialite = $1';
      w = true;
    }
    if (semestre !== undefined) {
      if (!w) {
        sql += ' where';
        w = true;
      }
      else{
        sql += ' and'
      }
      sql += ' Seance.semestre = $2'
    }
    if (niveau !== undefined) {
      if (!w) {
        sql += ' where';
        w = true;
      }
      else{
        sql += ' and'
      }
      sql += ' Seance.niveau = $3'
    }

    return db.manyOrNone(sql, [code_specialite, semestre, niveau]);
}

/**
  @param {string} id_seance
  @returns {Promise<object|null>} 
 */
export const getOneSeanceById =(id_seance)=>{
return db.oneOrNone(`SELECT id_seance , type, niveau, semestre,nom_module , nom_specialite , Module.code_module, Specialite.code_specialite 
                    from Seance left join Module on Seance.code_module=Module.code_module
                    left join Specialite on Seance.code_specialite=Specialite.code_specialite
                    WHERE id_seance=$1 `,[id_seance]  
                    );
}

/**
    @param {string} type 
   @returns {Promise<object|null>} 
 */


   export const getAllSeanceByType = (type) => {
    return db.manyOrNone(`
        SELECT id_seance, type, niveau, semestre, nom_module, nom_specialite
        FROM Seance 
        LEFT JOIN Module ON Seance.code_module = Module.code_module
        LEFT JOIN Specialite ON Seance.code_specialite = Specialite.code_specialite
        WHERE type = $1
    `, [type]);
}


/**
 
 * @param {string} type 
 * @param {string} niveau 
 * @param {string} semestre 
 * @param {string} code_module 
 * @param {string} code_specialite 
 * @returns {Promise}
 */
export const createSeance =( type,niveau, semestre,code_module, code_specialite)=>{

    return db.oneOrNone(`INSERT INTO Seance (type, niveau, semestre,code_module, code_specialite) 
                        VALUES($1,$2,$3,$4,$5)`,[type,niveau,semestre,code_module,code_specialite]);
}

/**
 * 
 * @param {string} type 
 * @param {string} niveau 
 * @param {string} semestre 
 * @param {string} code_module 
 * @param {string} code_specialite 
 * @param {string} id_seance 
 * @returns {Promise}
 */

export const UpdateSeance=(type,niveau, semestre,code_module,code_specialite,id_seance)=>{
      return db.oneOrNone(`UPDATE Seance SET type=$1,niveau=$2,semestre=$3,code_module=$4,code_specialite=$5 WHERE id_seance=$6 `
      ,[type,niveau,semestre,code_module,code_specialite,id_seance]
      );
}


/**
  @param {string} id_seance
 * @returns {Promise}
 */

export const deleteSeance =(id_seance)=>{
  return db.oneOrNone(`DELETE FROM Seance WHERE id_seance=$1`,[id_seance])

}
/**
 * 
 * @param {string} code_module 
 * @returns {Promise}
 */
export const deleteSeanceByCodeModule=(code_module)=>{

  return db.manyOrNone(`DELETE FROM Seance where code_module=$1`,[code_module])

}
