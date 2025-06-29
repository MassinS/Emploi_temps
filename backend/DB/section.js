import { db } from '../server.js'


/**
 * Retrieves all sections from the database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of section objects.
 */
export const selectSections = () => {
    return db.manyOrNone(`SELECT * FROM section`);
}

/**
 * Retrieves a section from the database based on the provided id_section.
 *
 * @param {string} id_section - The id_section of the section to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved section object.
 */
export const selectSection = (id_section) => {
    return db.oneOrNone(`SELECT * FROM section WHERE id_section = $1`, [id_section]);
}

/**
 * Inserts a new section into the database.
 * 
 * @param {string} code_section - The code of the section to be inserted.
 * @param {string} niveau - The niveau of the section to be inserted.
 * @param {string} code_specialite - The code of the speciality of the section to be inserted.
 * @returns {Promise} - A promise that resolves to the result of the database query.
 */
export const insertSection = (code_section, niveau, code_specialite) => {
    return db.one(`INSERT INTO section (code_section, niveau, code_specialite) VALUES ($1, $2, $3) returning *`, [code_section, niveau, code_specialite]);
};


/**
 * Updates a section.
 *
 * @param {string} id_section - The old id_section value to be updated.
 * @param {string} code_section - The new code_section value to replace the old value.
 * @param {string} niveau - The new niveau value to replace the old value.
 * @param {string} code_specialite - The new code_specialite value to replace the old value.
 * @returns {Promise} - A promise that resolves when the update query is executed successfully.
 */
export const updateSection = (id_section, code_section, niveau, code_specialite) => {
    return db.one(`UPDATE section SET code_section = $1, niveau = $2, code_specialite = $3 WHERE id_section = $4 returning *`, [code_section, niveau, code_specialite, id_section]);
}

/**
 * Deletes a section from the database based on the provided id_section.
 *
 * @param {string} id_section - The id_section of the section to be deleted.
 * @returns {Promise} A promise that resolves to the result of the delete operation.
 */
export const deleteSection = (id_section) => {
    return db.none("DELETE FROM section WHERE id_section = $1", [id_section]);
}