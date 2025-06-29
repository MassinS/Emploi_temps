import { Router } from "express";
import { selectAllEnsetCreneaux,
         selectAllEnsetCreneauxById,
         insertOneEnsEtCreneaux,
         putOneEnsEtCreneaux,
         deleteOneEnsEtCreneaux,
         getAllCreneauWithAllInformation
} from "../controllers/EnsEtCreneauxController.js";
import { insertOneEnsEtCreneauValidator, putOneEnsEtCreneauValidator } from "../validators/EnsEtCreneauxValidators.js";

const EnsEtCreneauxRouter=Router();

EnsEtCreneauxRouter.get('/',selectAllEnsetCreneaux);
EnsEtCreneauxRouter.get('/:matricule',selectAllEnsetCreneauxById);

EnsEtCreneauxRouter.post('/', insertOneEnsEtCreneauValidator,insertOneEnsEtCreneaux);

EnsEtCreneauxRouter.put('/:matricule/creneaux/:id_creneau', putOneEnsEtCreneauValidator,putOneEnsEtCreneaux);
EnsEtCreneauxRouter.delete('/:matricule/creneaux/:id_creneau',deleteOneEnsEtCreneaux);
EnsEtCreneauxRouter.get('/EmploisTempsEns/:matricule/Annee/:annee/Semestres/:semestre',getAllCreneauWithAllInformation);

export default EnsEtCreneauxRouter;