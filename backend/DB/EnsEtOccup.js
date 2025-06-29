import { db } from "../server.js";

export const  getAllEnsetOccup =()=>{

    return db.manyOrNone ( `SELECT E.matricule,P.nom,P.prenom,O.id_occup,O.jour,O.heur_debut, O.heur_fin 
                           FROM EnsEtOccup E 
                           left join Personne P on E.matricule=P.matricule
                           left join Occupation O ON E.id_occup=O.id_occup
    ` )
} 
/* @MassinS
    ! modified
    * changed name from ...Id to ...Matricule
    * fix sql error (matricule and id_occup are ambiguous)

    ? remove after reading

    --written by @lyesrabhi16
*/
export const getAllEnsetOccupByMatricule=(matricule, jour, debut, fin)=>{
let sql = `SELECT E.matricule,nom,prenom,E.id_occup,jour,heur_debut, heur_fin 
            FROM EnsEtOccup E 
            left join Personne P on E.matricule=P.matricule
            left join Occupation O ON E.id_occup=O.id_occup 
            WHERE E.matricule = $1`;
if (jour !== undefined){
    sql += ` AND jour = $2 `;
}
if (debut !== undefined && fin !== undefined){
    sql += ` AND 
    (
        ($4 between heur_debut and heur_fin)
        OR ($3 between heur_debut and heur_fin)
        OR (heur_fin between $3 and $4)
        OR (heur_debut between $3 and $4)    
    )`;
}    
return db.manyOrNone(sql,[matricule, jour, debut, fin]);
                     
}


export const createEnsetOccup =(matricule,id_occup )=>{
    return db.oneOrNone("INSERT INTO EnsEtOccup(matricule,id_occup) VALUES ( $1,$2)",[matricule,id_occup]);
}

export const updateEnsEtOccup=(matricule,id_occup, matricule_new, id_occup_new)=>{

    return db.oneOrNone("UPDATE EnsEtOccup SET matricule=$1,id_occup=$2 where matricule=$3 and id_occup=$4",[matricule_new, id_occup_new,matricule,id_occup]);

}

export const deleteEnsEtOccup = (matricule,id_occup) =>{

    return db.oneOrNone("DELETE FROM EnsEtOccup WHERE matricule=$1 AND id_occup=$2",[matricule,id_occup]);

}

