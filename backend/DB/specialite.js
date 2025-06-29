import { db } from "../server.js";

/**
 * Retrieves all specialities from the database.
 *
 * @returns {Promise} A promise that resolves to an array of specialities.
 */
export const selectSpecialites = () => {
  const sql = "SELECT * FROM specialite";
  return db.manyOrNone(sql);
};


/**
 * Retrieves a specialite from the database based on the provided code_specialite.
 *
 * @param {string} code_specialite - The code_specialite of the specialite to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the retrieved specialite object, or null if no specialite is found.
 */
export const selectSpecialite = (code_specialite) => {
  const sql = "SELECT * FROM specialite WHERE code_specialite = $1";
  return db.one(sql, [code_specialite]);
};

export const insertSpecialite = (code_specialite, nom_specialite) => {
  return db.one(
    "INSERT INTO specialite (code_specialite, nom_specialite) VALUES ($1, $2) returning *",
    [code_specialite, nom_specialite]
  );
};

/**
 * Update a specialite in the database.
 *
 * @param {string} code_specialite_old - The old code of the specialite.
 * @param {string} [code_specialite_new=code_specialite_old] - The new code of the specialite. Defaults to the old code.
 * @param {string} nom_specialite - The new name of the specialite.
 * @returns {Promise} A promise that resolves to the result of the database query.
 */
export const updateSpecialite = (code_specialite_old, code_specialite_new = code_specialite_old, nom_specialite) => {
  return db.one(
    "UPDATE specialite SET code_specialite = $2 ,nom_specialite = $3 WHERE code_specialite = $1 returning *",
    [code_specialite_old, code_specialite_new, nom_specialite]
  );
};

/**
 * Deletes a specialite from the database.
 *
 * @param {string} code_specialite - The code of the specialite to be deleted.
 * @returns {Promise} - A promise that resolves to the result of the delete query.
 */
export const deleteSpecialite = (code_specialite) => {
  return db.none("DELETE FROM specialite WHERE code_specialite = $1", [
    code_specialite,
  ]);
};
