import { response } from "express";
import { selectGroupes } from "../DB/groupe.js";
import { selectSection } from "../DB/section.js";
import { selectAllSeance } from "../controllers/SeanceController.js";
import { getAllSeance } from "../DB/Seance.js";
import { getAllLocal } from "../DB/Local.js";
import { getAllModuleEns } from "../DB/ModuleEns.js";
import { EnsRoles, TypePersonne, jours } from "../../constants.js";
import { getAllEnsetOccupByMatricule } from "../DB/EnsEtOccup.js";
import { getAllEnsEtCreneauxById } from "../DB/EnsEtCreneaux.js";
import { getAllCreneau } from "../DB/Creneau.js";
import { selectPersonnes } from "../DB/personne.js";
import { affichage } from "./affichage.js";

 

export const generate = async (req, res) => {
    const { id_section } = req.params;
    /*
        l'envoi de qlq contraints est optionnel, 
        format et valeur par defaut:
        temps_debut: {h: 8, m: 0} (objet avec les champs h et m qui sont des entiers)
        temps_fin: {h: 18, m: 0}  (objet avec les champs h et m qui sont des entiers)
        duree_creneaux: {h: 1, m: 30} (objet avec les champs h et m qui sont des entiers)
        minutes_entre_creneaux: 10 (entier)
        nbr_creneaux_par_jour: 6 (entier) (default value is calculated from temps_debut, temps_fin, duree_creneaux, minutes_entre_creneaux)    
        max_seances_consecutif: 3 (entier)
        max_cours_par_jour : 2 (entier)
        shuffle : 0|1 (entier) (0: false, 1: true) default 0 (false)
        ignore_charges : 0|1 (entier) (0: false, 1: true) default 1 (true)
        */ 
    let {   semestre,annee,
        
            temps_debut, temps_fin, 
            nbr_creneaux_par_jour, 
            duree_creneaux, 
            minutes_entre_creneaux, 
            max_seances_consecutif,
            max_cours_par_jour,
            shuffle,
            ignore_charges
        } = req.body;
    

    


    const t_d = new Date();
    t_d.setUTCHours(temps_debut.h, temps_debut.m); 
    
    const t_f = new Date();
    t_f.setUTCHours(temps_fin.h, temps_fin.m);


    const contraints = {
        temps_debut: t_d,
        temps_fin: t_f,
        duree_creneaux : duree_creneaux,
        temps_entre_creneaux : minutes_entre_creneaux,
        nbr_creneaux_par_jour : nbr_creneaux_par_jour,
        max_seances_consecutif: max_seances_consecutif,
        max_cours_par_jour: max_cours_par_jour,
        ignore_charges: ignore_charges
    }

    const response = {};
    // get section info
    const section = await selectSection(id_section);
    
    // get all groupes of the section
    const groupes = await selectGroupes(id_section);
    // add nbr_etudiants to each groupe and calculate the total number of students
    let NBR_ALL_ETUDIANTS = 0;
    for (let i = 0; i < groupes.length; i++) {
    const groupe = groupes[i];
    const etudiants = await selectPersonnes(TypePersonne.Etudiant, groupe.id_groupe);
    groupe.nbr_etudiants = etudiants.length;
    NBR_ALL_ETUDIANTS += groupe.nbr_etudiants;
   }
    
    // get All seances related to the section specialite
    let seances = await getAllSeance(section.niveau, semestre, section.code_specialite)
    seances.forEach(seance => {seance.remaining_groupes = [...groupes];});
    // shuffle seances
    if (( parseInt(shuffle) === 1)) {
      shuffleArray(seances);
    }

    const modules = [];
    // get All modules for these seances
    seances.map(seance => {
        if (!(modules.find(item => item === seance.code_module))){
            modules.push(seance.code_module);
        }
    });
    // get All Enseignants that teach each module
    const ens = {};
    for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        const EnsM = await getAllModuleEns(module);
        // calculate how much remaining charges each ens has
        for (let i = 0; i < EnsM.length; i++) {
            const ens = EnsM[i];
            const ens_c = await getAllEnsEtCreneauxById(ens.matricule, semestre, annee);
            ens.chargesR = ens.charges - ens_c.length;
            ens.chargesDA = ens_c.length;
            ens.chargesA = 0;
        }
        ens[module] = EnsM;
    }
    
    // get All locales
    const locales = await getAllLocal();



    


    /// build matrixes for occupancy
    //
    // matricule:  jour    :   1     2    3      4     5     6  (le creneaux n de la journée, est ce qu'il est occupé ou non)
    //    1     : dimanche : false false true false false false 
    //               .
    //               .
    //               .  

    // get all matricules of related enseignants
    const ens_matricules = [];
    Object.keys(ens).forEach(ensM => {
        ens[ensM].forEach(ens => {
            if (!(ens_matricules.find(item => item === ens.matricule))){
                ens_matricules.push(ens.matricule);
            }
        });
    });
    // build initial matrixes with all occups set to false
    const ocp_ens = buildOCPMatrix(ens_matricules, jours, contraints.nbr_creneaux_par_jour);
    const ocp_locales = buildOCPMatrix(locales.map(local => local.code_local), jours, contraints.nbr_creneaux_par_jour);
    const ocp_groupes = buildOCPMatrix(groupes.map(groupe => groupe.id_groupe), jours, contraints.nbr_creneaux_par_jour); // emplois du temps de chaque groupe

    // populate the ocp matrixes with true data from db
    // 1. for enseignants
    for (let i = 0; i< Object.keys(ocp_ens).length; i++){
        const matricule = Object.keys(ocp_ens)[i];
        // populate ocp_ens with data from EnsEtOccup    
        const occupations = await getAllEnsetOccupByMatricule(matricule);
        for (let j = 0; j < occupations.length; j++) {
            const occupation = occupations[j];
            const {heur_debut, heur_fin, jour} = occupation;
            const heur_debut_f = {h: parseInt(heur_debut.split(':')[0]), m: parseInt(heur_debut.split(':')[1])};
            const heur_fin_f = {h: parseInt(heur_fin.split(':')[0]), m: parseInt(heur_fin.split(':')[1])};
            const periods = getPeriodFromHeurDebutEtHeurFin(heur_debut_f, heur_fin_f, contraints);
            for(let p = 0; p< periods.length; p++){
                ocp_ens[matricule][jour][periods[periods[p]]] = true;
            }
        
        }
        // populate ocp_ens with data from EnsEtCreneaux
        const creneaux = await getAllEnsEtCreneauxById(matricule, semestre, annee);
        for(let j = 0; j<creneaux.length; j++){
            const creneau = creneaux[j];
            const {debut, fin, jour} = creneau;
            const heur_debut_f = {h: parseInt(debut.split(':')[0]), m: parseInt(debut.split(':')[1])};
            const heur_fin_f = {h: parseInt(fin.split(':')[0]), m: parseInt(fin.split(':')[1])};
            const periods = getPeriodFromHeurDebutEtHeurFin(heur_debut_f, heur_fin_f, contraints);
            for(let p=0; p<periods.length; p++){
                ocp_ens[matricule][jour][periods[periods[p]]] = true;
            }
        }
    }
    // 2. for locales
    for (let i = 0; i< Object.keys(ocp_locales).length; i++){
        const code_local = Object.keys(ocp_locales)[i];
        // populate ocp_locales with data from Creneaux
        const creneaux = await getAllCreneau(code_local);
        creneaux.forEach(creneau => {
            const {debut, fin, jour} = creneau;
            const heur_debut_f = {h: parseInt(debut.split(':')[0]), m: parseInt(debut.split(':')[1])};
            const heur_fin_f = {h: parseInt(fin.split(':')[0]), m: parseInt(fin.split(':')[1])};
            const periods = getPeriodFromHeurDebutEtHeurFin(heur_debut_f, heur_fin_f, contraints);
            periods.forEach(period => {
                ocp_locales[code_local][jour][period] = true;
            });
        });
    }

    

     // creneaux[jour][period][groupe]
    const creneaux = {};
    Object.keys(jours).filter(jour => jour !== jours.Vendredi).forEach(jour => {
        creneaux[jour] = {};
        let nbr_cours = 0;
        for (let period = 0; period < contraints.nbr_creneaux_par_jour; period++) {
            const temps = getHoursFromPeriods([period], temps_debut, contraints.duree_creneaux, contraints.temps_entre_creneaux)[0];
            creneaux[jour][period] = {
                debut: formatTime(temps.debut),
                fin: formatTime(temps.fin),
            };
            
            // check if all groupes are available, pour avoir un cours
            const all_groupes_available = groupes.every(groupe => {
                return !ocp_groupes[groupe.id_groupe][jour][period] && checkNbrSeancesConsecutif(ocp_groupes, groupe, jour, period, contraints.max_seances_consecutif);
            });
            if (all_groupes_available && nbr_cours < contraints.max_cours_par_jour){
                // check for an available Amphi
                const amphi = getLocal(locales, 'Amphi', ocp_locales, jour, period, NBR_ALL_ETUDIANTS);
                if (amphi){ 
                    
                    for (let c = 0; c < seances.length; c++) {
                        const seance = seances[c];
                        if (seance.type !== 'Cours') {
                          continue;
                        }
                        let enseignants = ens[seance.code_module];
                        let enseignant = undefined;
                        let b=true;
                        while (b){
                            if (enseignants.length === 0){
                                if(ignore_charges==0){
                                    enseignant = undefined;
                                }
                                b = false;
                                break;
                            }
                            enseignant = getEnseignantWithHighestPriorite(enseignants, Object.keys(EnsRoles).filter(r => r !== "vacataire"),contraints.ignore_charges);
                            if (enseignant === undefined) {
                                break;
                            }
                              
                            if (!ocp_ens[enseignant.matricule][jour][period]){
                                b = false;   
                            }
                            else{
                                enseignants = enseignants.filter(ens => ens.matricule !== enseignant.matricule);
                            }                             
                        }
                        if (enseignant !== undefined){
                            const creneau = {
                                period: period,
                                jour: jour,
                                enseignant: enseignant,
                                seance: seance,
                                locale: amphi,
                            };
                            groupes.forEach(groupe => {
                                ocp_groupes[groupe.id_groupe][jour][period] = true;
                                seance.remaining_groupes = [...seance.remaining_groupes.filter(g => g.id_groupe !== groupe.id_groupe)];
                            
                                const s = {...seance};
                                delete s.remaining_groupes;
                                creneaux[jour][period][groupe.code_groupe] = {
                                    seance: s,
                                    locale: amphi,
                                    enseignant: enseignant,
                                    groupe: groupe
                                };
                            });
                            ocp_ens[enseignant.matricule][jour][period] = true;
                            ocp_locales[amphi.code_local][jour][period] = true;
                            if (seance.remaining_groupes.length === 0){
                                seances = seances.filter(s => s.id_seance !== seance.id_seance);
                            }
                            enseignant.chargesR -= 1;
                            enseignant.chargesA += 1;

                            nbr_cours++;
                            

                            break;
                        }
                    }

                }
                const occupied = groupes.every(groupe => {
                    ocp_groupes[groupe.id_groupe][jour][period] === true;
                });
                if (occupied){
                    continue;
                }
            }
            
            // if not 
            for (let s = 0; s < seances.length; s++) {
                // check if all groupes are occupied and break if so
                const all_groupes_occupied = groupes.every(groupe => {
                    return ocp_groupes[groupe.id_groupe][jour][period];
                });
                if (all_groupes_occupied){
                    break;
                };

                // try to find a seance with an enseignant and a locale for a groupe in this period
                const seance = seances[s];
                if (seance.type === 'Cours') {
                    continue;
                }
                let enseignants = ens[seance.code_module];
                // try to find an enseignant for the seance
                let enseignant = undefined;
                let b=true;
                while (b){
                    if (enseignants.length === 0){
                        if(ignore_charges==0){
                            enseignant = undefined;
                        }
                        b = false;
                        break;
                    }
                    enseignant = getEnseignantWithHighestPriorite(enseignants, Object.keys(EnsRoles), contraints.ignore_charges);
                    if (enseignant === undefined) {
                      break;
                    }

                    if (!ocp_ens[enseignant.matricule][jour][period]){
                        b = false;   
                    }
                    else{
                        enseignants = enseignants.filter(ens => ens.matricule !== enseignant.matricule);
                    }                             
                }
                if (enseignant !== undefined){
                    
                        // try to find a groupe for the seance
                        const groupe = groupes.find(groupe => {
                            if ((!ocp_groupes[groupe.id_groupe][jour][period]) && ( seance.remaining_groupes.find(g => g.id_groupe === groupe.id_groupe) !== undefined ) && checkNbrSeancesConsecutif(ocp_groupes, groupe, jour, period, contraints.max_seances_consecutif)){
                                return groupe
                            }
                        } );
                        if(groupe){
                            const locale = getLocal(locales, 'Salle'+seance.type, ocp_locales, jour, period, groupe.nbr_etudiants);
                            // try to find a locale for the seance
                            if (locale){
                                const creneau = {
                                    period: period,
                                    jour: jour,
                                    enseignant: enseignant,
                                    seance: seance,
                                    locale: locale,
                                };
                                ocp_groupes[groupe.id_groupe][jour][period] = true;
                                seance.remaining_groupes = [...seance.remaining_groupes.filter(g => g.id_groupe !== groupe.id_groupe)];
                                ocp_ens[enseignant.matricule][jour][period] = true;
                                ocp_locales[locale.code_local][jour][period] = true;
                                if (seance.remaining_groupes.length === 0){
                                    seances = seances.filter(s => s.id_seance !== seance.id_seance);
                                }

                                const s = {...seance};
                                delete s.remaining_groupes;
                                enseignant.chargesR -= 1;
                                enseignant.chargesA += 1;

                                creneaux[jour][period][groupe.code_groupe] ={
                                    seance: s,
                                    locale: locale,
                                    enseignant: enseignant,
                                    groupe: groupe
                                };

                        }
                    }
                }  
            };


        }
    });



    response.creneaux = creneaux;
    


    if (seances.length > 0){
        response.error = 'Some seances have not been scheduled';
        response['unscheduled-seances'] = seances;
    }
    else{

        response.success = 'All seances have been scheduled';
    }

    affichage(response.creneaux);

    res.status(200).json(response);

};

const checkNbrSeancesConsecutif = (ocp_groupes, groupe, jour, period, max_seances_consecutif) => {
    
    let nbr_seances_consecutif = 0;
    let p = Math.max(period - max_seances_consecutif,0);
    while (p < period){
        if (ocp_groupes[groupe.id_groupe][jour][p]){
            nbr_seances_consecutif++;
        }
        else{
            nbr_seances_consecutif = 0;
        }
        p++;
    }
    if (nbr_seances_consecutif >= max_seances_consecutif){
        return false;
    }    
    return true;
}

// get local respecting these constraints:
// 1. the local must be of the same type as the seance type
// 2. the local must not be occupied
// 3. the local must have a capacity greater or equal to the provided capacity
// 4. the local must be the most suitable local for the seance calculated with the capacity provided devided by the local capacity
const getLocal = (locaux, type, ocp_locales, jour, period, capacite)=>{
    const locaux_f = [];
    locaux.forEach(local => {
        if (local.type === type && !ocp_locales[local.code_local][jour][period] && local.capacite >= capacite){
            locaux_f.push([local, capacite/local.capacite]);
        }
    });
    if (locaux_f.length === 0){
        return undefined;
    }
    let local = locaux_f[0];
    locaux_f.forEach((l) => {
        if (l[1] > local[1]){
            local = l;
        }
    });
    return local[0];
}


const getPeriodFromHeurDebutEtHeurFin = (heur_debut, heur_fin, constraints)=>{
    const debut = new Date();
    const fin = new Date();
    debut.setUTCHours(heur_debut.h, heur_debut.m);
    fin.setUTCHours(heur_fin.h, heur_fin.m);

    const periods = [];
    let i = 0;
    const d = new Date(constraints.temps_debut);
    while (d.getUTCHours() < debut.getUTCHours() && d.getUTCMinutes() < debut.getUTCMinutes() ) {
        d.setUTCMinutes(d.getUTCMinutes() + constraints.duree_creneaux.m + constraints.temps_entre_creneaux);
        d.setUTCHours(d.getUTCHours() + constraints.duree_creneaux.h);
        i++;
    };
    while ( debut < fin){
        periods.push(i);
        i++;
        debut.setUTCMinutes(debut.getUTCMinutes() + constraints.duree_creneaux.m + constraints.temps_entre_creneaux);
        debut.setUTCHours(debut.getUTCHours() + constraints.duree_creneaux.h);
    }
    return periods;
}

const getHoursFromPeriods = (Periods, temps_debut, duree_creneaux, temps_entre_creneau) => {
    const heures = [];
    let heur_debut_f = temps_debut;
    if (temps_debut["h"] === undefined || temps_debut["m"] === undefined){
        heur_debut_f = {h: temps_debut.getUTCHours(), m: temps_debut.getUTCMinutes()};
    }
    for (let i = 0; i < Periods.length; i++) {
        const period = Periods[i];
        const d_heur_debut = new Date();
        d_heur_debut.setUTCHours(heur_debut_f.h, heur_debut_f.m);
        d_heur_debut.setUTCMinutes(d_heur_debut.getUTCMinutes() + period * (duree_creneaux.m + temps_entre_creneau));
        d_heur_debut.setUTCHours(d_heur_debut.getUTCHours() + period * duree_creneaux.h);
        const d_heur_fin = new Date();
        d_heur_fin.setUTCHours(d_heur_debut.getUTCHours() + duree_creneaux.h, d_heur_debut.getUTCMinutes() + duree_creneaux.m);
        heures.push({debut: d_heur_debut, fin: d_heur_fin});
    }

    return heures;
}

const buildOCPMatrix = (ids, jours, nbr_creneaux_par_jour)=>{
    const ocp = {};
    for (let i = 0; i < ids.length; i++) {
        ocp[ids[i]] = {};
        Object.keys(jours).forEach(jour => {
            ocp[ids[i]][jour] = [];
            for (let j = 0; j < nbr_creneaux_par_jour; j++) {
                ocp[ids[i]][jour][j]= false;                
            }
        });
    }
    return ocp;
}

const getEnseignantWithHighestPriorite = (ens, AllowedRoles, ignore_charges)=>{
    let d = 0;
    let f = ens.length - 1;
    let max = undefined;
    while (d<=f){

        if(ignore_charges === 0 && ens[d].chargesR <= 0) {
            d++;
            continue;
        };
        if(ignore_charges === 0 && ens[f].chargesR <= 0) {
            f--;
            continue;
        };

        if(!(AllowedRoles.includes(ens[d].role))){
            d++;
            continue;
        }
        
        if( max === undefined){
            max = ens[d];
            d++;
            continue;
        }

        if ( max.priorite > ens[d].priorite){
            max = ens[d];
        }

        if ( max.priorite > ens[f].priorite){
            max = ens[f];
        }

        d++;
        f--;
    }
    return max;
}


const formatTime = (d) =>{

    let t = d.toISOString().split("T")[1].split(".")[0].split(":");
    t.pop();
    return t.join(":");

}

// Fisher–Yates (aka Knuth) Shuffle algorithm
export const shuffleArray = (array) => {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  