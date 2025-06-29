import {Router } from "express";
import { selectAllCreneau,
         selectOneCreneauById,
         selectAllCreneauByGroupe,
         putOneCreneau,
         insertOneCreneau,
         deleteOneCreneau,
         selectAllCreneauBySection,
         verificationCreneau,
         selectAllCreneauOfEnseignant,
         selectAllCreneauOfGroupe

} from "../controllers/CreneauController.js";

import { addCreneauValidators, verificationCreneauValidator } from "../validators/CreneauValidators.js";

const CreneauRouter = Router();

CreneauRouter.get('/',selectAllCreneau);
CreneauRouter.post('/verification', verificationCreneauValidator,verificationCreneau);
CreneauRouter.get('/:id_creneau', selectOneCreneauById  );

CreneauRouter.get('/groupes/:id_groupe',selectAllCreneauByGroupe);

CreneauRouter.get('/section/:id_section/:semestre/:annee',selectAllCreneauBySection);
CreneauRouter.get('/enseignant/:matricule/:semestre/:annee',selectAllCreneauOfEnseignant);
CreneauRouter.get('/groupe/:id_groupe/:semestre/:annee',selectAllCreneauOfGroupe);

CreneauRouter.put('/:id_creneau',addCreneauValidators,putOneCreneau);
CreneauRouter.post('/',addCreneauValidators,insertOneCreneau);
CreneauRouter.delete('/:id_creneau',deleteOneCreneau);



export default CreneauRouter;

