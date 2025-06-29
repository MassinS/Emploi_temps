import { db } from "../server.js";

export const getAllEnsEtCreneaux=(id_emp)=>{
    let sql = `SELECT EC.matricule , P.nom , P.Prenom, P.email, P.role , EC.id_creneau, C.jour , C.debut , C.fin, C.id_emp
    FROM EnsEtCreneaux EC 
    left join Personne P on EC.matricule=P.matricule
    left join Creneau C on EC.id_creneau=C.id_creneau
    `;
    if(id_emp){
        sql += ` WHERE C.id_emp=$1`;
    }
    return db.manyOrNone(sql,[id_emp]);
}

export const getAllEnsEtCreneauxById=(matricule, semestre, annee)=>{

    return db.manyOrNone(` SELECT P.matricule,P.nom, P.prenom, P.email, P."password", P."type", P."role",P.charges,
	C.*,S.type as "type_seance",M.*,G.code_groupe, SC.id_section, SC.code_section, SC.code_specialite,
	E.id_groupe, E.niveau, E.semestre, E.annee
	FROM EnsEtCreneaux EC 
    left join Personne P on EC.matricule=P.matricule
    left join Creneau C on EC.id_creneau=C.id_creneau
    left join seance S ON S.id_seance = C.id_seance
    left join module M ON M.code_module = S.code_module
    left join emploisdutemps E ON E.id_emp = C.id_emp
    left join groupe G ON G.id_groupe = E.id_groupe
    left join section SC ON SC.id_section = G.id_section
    
    Where P.matricule = $1 and E.semestre = $2 and E.annee = $3 
    `,[matricule, semestre, annee]);

}

export const createEnsEtCreneau =(matricule,id_creneau)=>{

    return db.oneOrNone("INSERT INTO EnsEtCreneaux(matricule,id_creneau) VALUES($1,$2)",[matricule,id_creneau]);
}

export const updateEnsEtCreneau=(matricule_new,id_creneau_new,matricule,id_creneau)=>{

    return db.oneOrNone("UPDATE EnsEtCreneaux SET matricule=$1,id_creneau=$2 where matricule=$3 AND id_creneau =$4"
                       , [matricule_new,id_creneau_new,matricule,id_creneau]
  )
}

export const deleteEnsEtCreneau=(matricule,id_creneau)=>{
    return db.oneOrNone("DELETE FROM EnsEtCreneaux WHERE matricule=$1 AND id_creneau=$2",[matricule,id_creneau]);
    
}


export const getAllCreneauEns = (matricule,annee,semestre, jour, debut, fin, id_creneau)=>{
    const values = [matricule,annee,semestre, jour, debut, fin]; 
    let sql = `SELECT E.matricule, P.nom , P.prenom ,C.jour, C.debut,C.fin , S.type,S.niveau , S.code_specialite  , g.id_section , Emp.semestre ,L.code_Local , L.type  from ensetcreneaux E  
    left join personne P on E.matricule=P.matricule
    left join Creneau C on E.id_creneau=C.id_creneau 
    left join Seance S on C.id_seance = S.id_seance
    left join Local L on C.code_local=L.code_local
    left join Specialite Sp on Sp.code_specialite = S.code_specialite
    left join emploisdutemps Emp on Emp.id_emp =C.id_emp
    left join groupe g on g.id_groupe= Emp.id_groupe
    left join section sn on sn.id_section=g.id_section
    WHERE E.matricule=$1 and Emp.annee=$2 and Emp.semestre=$3`;
    if(id_creneau !== undefined){
        let i = 7;
        while (i < (id_creneau.length+7)){
            sql += " and not (C.id_creneau=$7)";
            i++;
            values.push(id_creneau[i-7]);
        }
    }
    
    if(jour !== undefined && debut!==undefined && fin !== undefined){
        sql += `
        and jour = $4
        and 
            (
                ($6 between c.debut and c.fin)
                OR ($5 between c.debut and c.fin)
                OR (c.fin between $5 and $6)
                OR (c.debut between $5 and $6)
            )    
        order by debut`;
    }


    return db.manyOrNone(sql,values);

    
}
