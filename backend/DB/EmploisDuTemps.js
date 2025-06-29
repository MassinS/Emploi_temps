import { db } from "../server.js";


export const getAllEmplois = () => {
 
    return db.manyOrNone(`SELECT E.id_emp, E.niveau, E.semestre, g.id_groupe, g.code_groupe, 
                                 s.id_section, s.code_section, s.code_specialite, sp.nom_specialite
                            FROM emploisdutemps E 
                            left join groupe G on E.id_groupe=G.id_groupe
                            join section s on G.id_section = s.id_section
                            join specialite sp on s.code_specialite = sp.code_specialite;`)  

}

export const getOneEmploisById = (id_Emp) => {

    return db.oneOrNone(`SELECT E.id_emp, E.niveau, E.semestre, E.annee, g.id_groupe, g.code_groupe, 
                                s.id_section, s.code_section, s.code_specialite, sp.nom_specialite
                            FROM emploisdutemps E 
                            left join groupe G on E.id_groupe=G.id_groupe
                            join section s on G.id_section = s.id_section
                            join specialite sp on s.code_specialite = sp.code_specialite
                            where E.id_emp = $1;` , [id_Emp]);
}

export const getOneEmploisByGroupe = (id_groupe, semesetre, annee, niveau) =>{
    let sql = `SELECT E.id_emp, E.niveau, E.semestre, E.annee, g.id_groupe, g.code_groupe, 
    s.id_section, s.code_section, s.code_specialite, sp.nom_specialite
FROM emploisdutemps E 
left join groupe G on E.id_groupe=G.id_groupe
join section s on G.id_section = s.id_section
join specialite sp on s.code_specialite = sp.code_specialite
where G.id_groupe = $1 and E.semestre = $2 and E.annee = $3`
   if (niveau !== undefined){
         sql += ` and E.niveau = $4`
   }

   return db.oneOrNone(sql ,[id_groupe, semesetre, annee, niveau]);
   
}

export const createEmplois = (id_groupe, niveau, semestre, annee) =>{

    return db.oneOrNone("INSERT INTO emploisdutemps(id_groupe, niveau, semestre, annee) values($1, $2, $3, $4) returning *",[id_groupe, niveau, semestre, annee]);

}

export const updateEmplois =(id_Emp,id_groupe, niveau, semesetre) =>{
    return db.oneOrNone("UPDATE emploisdutemps SET id_groupe=$1, niveau=$2, semestre=$3 WHERE id_Emp=$4 " , [id_groupe,niveau,semesetre,id_Emp]);
}

export const deleteEmplois =(id_Emp) => {
    return db.oneOrNone("DELETE FROM emploisdutemps where id_emp=$1 ",[id_Emp]);

}

export const deleteEmploisByIdGroupe =(id_groupe, semestre, annee) => {
    return db.oneOrNone("DELETE FROM emploisdutemps where id_groupe=$1 and semestre=$2 and annee=$3",[id_groupe, semestre, annee]);

}

