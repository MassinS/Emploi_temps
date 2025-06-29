import { db } from "../server.js";

export const selectGroupes = (id_section) => {

    let sql = `
                SELECT g.id_groupe, g.code_groupe, s.id_section, s.code_section, s.niveau, sp.code_specialite, sp.nom_specialite
                FROM groupe g 
                    join section s on g.id_section = s.id_section
                    join specialite sp on s.code_specialite = sp.code_specialite`;
    if (id_section !== undefined) {
        sql += ` where g.id_section = $1`;
    } 

    return db.manyOrNone(sql, [id_section]);
};

export const selectGroupe = (id_groupe) => {
    return db.oneOrNone(`SELECT g.id_groupe, g.code_groupe, s.id_section, s.code_section, s.niveau, sp.code_specialite, sp.nom_specialite
                         FROM groupe g 
                                join section s on g.id_section = s.id_section
                                join specialite sp on s.code_specialite = sp.code_specialite 
                         WHERE id_groupe = $1`, [id_groupe]);
};

export const insertGroupe = (code_groupe, id_section) => {
    return db.one("INSERT INTO groupe (code_groupe, id_section) VALUES ($1, $2) returning *", [code_groupe, id_section]);
};

export const updateGroupe = (id_groupe, code_groupe, id_section) => {
    return db.one("UPDATE groupe SET code_groupe = $1, id_section = $2 WHERE id_groupe = $3 returning *", [code_groupe, id_section, id_groupe]);
};

export const deleteGroupe = (id_groupe) => {
    return db.none("DELETE FROM groupe WHERE id_groupe = $1", [id_groupe]);
};