//! this is just a script for displaying the generated emp
//! formated in this way:
//!     Jour:
//!          Groupe :
//!                     debut fin type module local

import { jours as jours_constant } from "../../constants.js";

export const affichage = (creneaux) => {
  const jours = Object.keys(jours_constant);
  Object.keys(creneaux).forEach((jour) => {
    console.log(`${jour}:`);
    Object.keys(creneaux[jour]).forEach((period) => {
      console.log(`\t${period}: ${creneaux[jour][period]["debut"]}  ${creneaux[jour][period]["fin"]}`);
      Object.keys(creneaux[jour][period]).forEach((key) => {
        if (creneaux[jour][period][key].seance !== undefined) {
          console.log(
            `\t\t\t${key}: ${creneaux[jour][period][key].seance.type} ${creneaux[jour][period][key].seance.code_module} ${creneaux[jour][period][key].locale.code_local} ${creneaux[jour][period][key].enseignant.nom} ${creneaux[jour][period][key].enseignant.role}`
          );
        }
      });
    });
  });
};
