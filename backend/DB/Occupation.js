import { db } from "../server.js";
/**
@param {string} id_occup
@returns {Promise<object|null>} 
 */  
export const selectOccupationById = (id_occup) => {
    return db.oneOrNone("SELECT * FROM Occupation WHERE id_occup = $1", [
        id_occup,
    ]);
  };


export const selectOccupationByDayHbHf=(jour,heur_debut,heur_fin)=>{

  return db.oneOrNone("SELECT id_occup FROM Occupation WHERE jour=$1 AND heur_debut=$2 AND heur_fin=$3 ",[jour,heur_debut,heur_fin]);

}



  export const selectAllOccupation = () => {
    return db.manyOrNone("SELECT * FROM Occupation");
  };



  /**
   @param {string } jour
   @returns {Promise<object|null>} 
   */
  export const selectOccupationByDay=(jour)=>{
    return db.manyOrNone("SELECT * FROM Occupation WHERE jour=$1",[jour]);
  }

  /**
   @param {string} id_occup
   @returns {Promise}
   */
  export const DeleteOneOcuupation =(id_occup)=>{
    return db.oneOrNone("DELETE FROM Occupation where id_occup=$1",[id_occup]);
  }

  /**
   @param {string} id_occup
   @param {string}  jour
   @param {string}  heur_debut
   @param {string} heur_fin
   
   */
  export const PutOneOccupation =(id_occup,jour,heur_debut,heur_fin)=>{
    return db.oneOrNone("UPDATE OCCUPATION SET jour=$1 , heur_debut=$2 , heur_fin=$3 WHERE id_occup=$4 ",
    [jour,heur_debut,heur_fin,id_occup])
  }
  /**
  
   @param {string}  jour
   @param {string}  heur_debut
   @param {string} heur_fin
   
   */ 
  export const createOneOccupation =(jour,heur_debut,heur_fin)=>{
    return db.oneOrNone("INSERT INTO  OCCUPATION (jour, heur_debut, heur_fin) VALUES ($1 , $2 , $3)",
    [jour,heur_debut,heur_fin])
  }