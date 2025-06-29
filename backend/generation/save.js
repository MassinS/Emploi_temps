import { createCreneau, deleteCreneau, deleteCreneauByEmp } from "../DB/Creneau.js";
import {
  createEmplois,
  deleteEmploisByIdGroupe,
  getOneEmploisByGroupe,
} from "../DB/EmploisDuTemps.js";
import { createEnsEtCreneau } from "../DB/EnsEtCreneaux.js";
import { selectGroupes } from "../DB/groupe.js";
import { getEmpGroupeFile } from "../EmpAsFile/emp_xlsx.js";

export const save = async (req, res) => {
  const { id_section } = req.params;
  const { data, semestre, annee, override } = req.body;


  // get groupes
  const groupes = await selectGroupes(id_section).catch(err => {
    res.status(500).json({
      error: "Failed to get groupes of section "+id_section+" from database",
      details: err,
    });
    return;
  });
  
  let saveError = false;
  const errors = [];
  // create an emp for each groupe
  for (const groupe of groupes) {
    let emp;
    if (override) {
      emp = await getOneEmploisByGroupe(groupe.id_groupe, semestre, annee).catch((err) => {
        errors.push({
          groupe: groupe,
          error: "Failed to get Groupe existing Emplois Du Temps",
          details: err,
        });
        console.log(err);
      });
      if(emp === null || emp === undefined){
        console.log("Failed to get existing Emp, creating a new One...");
        emp = await createEmplois(
          groupe.id_groupe,
          groupe.niveau,
          semestre,
          annee
        ).catch((err) => {
          errors.push({
            groupe: groupe,
            error: "Error While Creating Emplois Du Temps",
            details: err,
          });
          saveError = true;
        });
      }
      await deleteCreneauByEmp(emp.id_emp).catch(err => {
        errors.push({
          groupe: groupe,
          error: "Failed to delete existing Creneaux",
          details: err,
        });
        saveError = true;
      });
    }else{
      emp = await createEmplois(
        groupe.id_groupe,
        groupe.niveau,
        semestre,
        annee
      ).catch((err) => {
        errors.push({
          groupe: groupe,
          error: "Error While Creating Emplois Du Temps",
          details: err,
        });
        saveError = true;
      });
    }

    if (saveError) {
      continue;
    }

    const creneaux = [];
    for(const jour in data){
      for(const period in data[jour]){
        const c = data[jour][period][groupe.code_groupe];
        if(c !== undefined && c.seance !== undefined){
          c.debut = data[jour][period]["debut"];
          c.fin = data[jour][period]["fin"];
          c.jour = jour;
          creneaux.push(c);
        }
      }
    };
  
    for (const creneau of creneaux) {
      const c = await createCreneau(
        creneau.debut,
        creneau.fin,
        creneau.jour,
        emp.id_emp,
        creneau.seance.id_seance,
        creneau.locale.code_local
      ).catch((err) => {
        errors.push({
          groupe: groupe,
          error: "Failed to create Creneau",
          details: err,
        });
        saveError = true;
      });

      if (saveError) {
        continue;
      }

      const ens_c = await createEnsEtCreneau(
        creneau.enseignant.matricule,
        c.id_creneau
      ).catch((err) => {
        errors.push({
          groupe: groupe,
          error: "Failed to create enseignantEtCreneau",
          details: err,
        });
        saveError = true;
      });

      if (saveError) {
        continue;
      }
    }
  }


  const response = {};
  if (errors.length === 0) {
    response.success = "Saved Emplois De Temps For All groupes";
    res.status(201).json(response);
  } else {
    response.error = errors;
    res.status(500).json(response);
  }
};
