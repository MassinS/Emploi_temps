import { db } from "../server.js";

/**
 * 
 * @returns {Promise}
 */

/* @MassinS
   * modifed to include the new changes on section table
   returns:
      id_creneau, debut, fin, jour, id_emp,
      id_groupe, code_groupe ,
      id_section, code_section,niveau,
      code_specialite, nom_specialite.
      id_seance, type, 
      code_module, nom_module
   ?--written by @lyesrabhi16
*/

export const getAllCreneau =(code_local)=>{
   let sql = `SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type, m.*
               FROM Creneau c
                     join emploisdutemps emp on c.id_emp = emp.id_emp
                     join groupe g on emp.id_groupe = g.id_groupe
                     join section s on g.id_section = s.id_section
                     join specialite sp on s.code_specialite = sp.code_specialite
                     join seance sc on c.id_seance = sc.id_seance
                     join module m on sc.code_module = m.code_module
               `;
   if (code_local !== undefined){
      sql += ` WHERE c.code_local = $1 `;
   }
   return db.manyOrNone(sql, [code_local]);

}


/**
 * 
 * @param {string} id_creneau 
 *  @returns {Promise<object|null>} 
 */
export const getOneCreneauById = (id_creneau) => {
   return db.oneOrNone(`SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type, m.*
                        FROM Creneau c
                              join emploisdutemps emp on c.id_emp = emp.id_emp
                              join groupe g on emp.id_groupe = g.id_groupe
                              join section s on g.id_section = s.id_section
                              join specialite sp on s.code_specialite = sp.code_specialite
                              join seance sc on c.id_seance = sc.id_seance
                              join module m on sc.code_module = m.code_module
                        WHERE c.id_Creneau=$1 `,[id_creneau])
}
/**
 * 
 * @param {string} code_groupe 
 * @returns {Promise<object|null>} 
 */
export const getAllCreneauByGroupe = (id_groupe) =>{
    console.log(id_groupe);
    return db.manyOrNone(`SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type, m.*
                           FROM Creneau c
                                 join emploisdutemps emp on c.id_emp = emp.id_emp
                                 join groupe g on emp.id_groupe = g.id_groupe
                                 join section s on g.id_section = s.id_section
                                 join specialite sp on s.code_specialite = sp.code_specialite
                                 join seance sc on c.id_seance = sc.id_seance
                                 join module m on sc.code_module = m.code_module
                          WHERE g.id_groupe=$1 `, [id_groupe] );
    
}
export const getAllCreneauByEmp = (id_emp) =>{
   return db.manyOrNone(`SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type as type_seance, m.*, p.*
   FROM Creneau c
         join emploisdutemps emp on c.id_emp = emp.id_emp
         join groupe g on emp.id_groupe = g.id_groupe
         join section s on g.id_section = s.id_section
         join specialite sp on s.code_specialite = sp.code_specialite
         join seance sc on c.id_seance = sc.id_seance
         join module m on sc.code_module = m.code_module
 join ensEtcreneaux ensc on c.id_creneau = ensc.id_creneau
 join personne p on ensc.matricule = p.matricule
  WHERE c.id_emp=$1 order by jour`, [id_emp] );
   
}

export const getAllCreneauBySection = (id_section, semestre, annee) =>{
   return db.manyOrNone(`SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type as type_seance, m.*, p.*, emp.semestre, emp.annee
   FROM Creneau c
         join emploisdutemps emp on c.id_emp = emp.id_emp
         join groupe g on emp.id_groupe = g.id_groupe
         join section s on g.id_section = s.id_section
         join specialite sp on s.code_specialite = sp.code_specialite
         join seance sc on c.id_seance = sc.id_seance
         join module m on sc.code_module = m.code_module
 join ensEtcreneaux ensc on c.id_creneau = ensc.id_creneau
 join personne p on ensc.matricule = p.matricule
  WHERE s.id_section=$1 and emp.semestre=$2 and emp.annee=$3 order by jour`, [id_section, semestre, annee] );   
}

export const getAllCreneauOfEnseignant = (matricule, semestre, annee) =>{
   return db.manyOrNone(`SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type as type_seance, m.*, p.*, emp.semestre, emp.annee
   FROM Creneau c
         join emploisdutemps emp on c.id_emp = emp.id_emp
         join groupe g on emp.id_groupe = g.id_groupe
         join section s on g.id_section = s.id_section
         join specialite sp on s.code_specialite = sp.code_specialite
         join seance sc on c.id_seance = sc.id_seance
         join module m on sc.code_module = m.code_module
 join ensEtcreneaux ensc on c.id_creneau = ensc.id_creneau
 join personne p on ensc.matricule = p.matricule
  WHERE p.matricule=$1 and emp.semestre=$2 and emp.annee=$3 order by jour`, [matricule, semestre, annee] );   
}
export const getAllCreneauOfGroupe = (id_groupe, semestre, annee) =>{
   return db.manyOrNone(`SELECT c.*, g.id_groupe, g.code_groupe, s.*, sp.nom_specialite, sc.type as type_seance, m.*, p.*, emp.semestre, emp.annee
   FROM Creneau c
         join emploisdutemps emp on c.id_emp = emp.id_emp
         join groupe g on emp.id_groupe = g.id_groupe
         join section s on g.id_section = s.id_section
         join specialite sp on s.code_specialite = sp.code_specialite
         join seance sc on c.id_seance = sc.id_seance
         join module m on sc.code_module = m.code_module
 join ensEtcreneaux ensc on c.id_creneau = ensc.id_creneau
 join personne p on ensc.matricule = p.matricule
  WHERE g.id_groupe=$1 and emp.semestre=$2 and emp.annee=$3 order by jour`, [id_groupe, semestre, annee] );   
}
export const getCreneaux = (debut, fin, jour, local, id_creneau) => {
   const values = [debut, fin, jour, local];
   let sql = `
               select * from creneau c where
               (
                  ($2 between c.debut and c.fin)
                  OR ($1 between c.debut and c.fin)
                  OR (c.fin between $1 and $2)
                  OR (c.debut between $1 and $2)
               )
               and c.jour = $3 and c.code_local = $4`;
   if(id_creneau !== undefined){
      let i = 5;
      while( i < (id_creneau.length+5)){
         sql += ` and not(id_creneau = $${i})`;
         i++;
         values.push(id_creneau[i-5]);
      }
   }
   return db.manyOrNone(sql, values);
}
/**
 * 
 * @param {string} id_creneau 
 * @param {string} debut 
 * @param {string} fin 
 * @param {string} jour 
 * @param {string} id_Emp 
 * @param {string} id_seance 
 * @param {string} code_local 
 * @returns {Promise}
 */
export const updateCreneau=(id_creneau,debut, fin, jour,id_Emp,id_seance,code_local)=>{
   return db.manyOrNone(` UPDATE Creneau SET debut=$1,fin=$2, jour=$3,id_Emp=$4,id_seance=$5,code_local=$6
                          WHERE  id_creneau=$7 `,[debut, fin, jour,id_Emp,id_seance,code_local,id_creneau])
   
}

/**
 * 
 * @param {string} debut 
 * @param {string} fin 
 * @param {string} jour 
 * @param {string} id_Emp 
 * @param {string} id_seance 
 * @param {string} code_local 
 * @returns {Promise}
 */
export const createCreneau=(debut, fin, jour,id_Emp,id_seance,code_local)=>{

   return db.oneOrNone(` insert into Creneau (debut, fin, jour,id_Emp,id_seance,code_local)
                         Values ($1,$2,$3,$4,$5,$6) returning *`,[debut, fin, jour,id_Emp,id_seance,code_local])
}

export const deleteCreneau = (id_creneau) =>{
  return db.oneOrNone(`DELETE FROM Creneau where id_creneau=$1 `,[id_creneau])  
}

export const deleteCreneauByEmp = (id_emp) =>{
   console.log("DELETE FROM Creneau Where id_emp =  ", id_emp);
   return db.oneOrNone(`DELETE FROM Creneau Where id_emp = $1 `,[id_emp])  
 }
