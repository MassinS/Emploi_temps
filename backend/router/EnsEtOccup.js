import { Router } from "express";

import { selectAllEnsetOccup,
         selectAllEnsetOccupByMatricule,
         insertOneEnsetOccup,
         putOneEnsEtOccup,
         deleteOneEnsEtOccup,

} from "../controllers/EnsEtOccupController.js";
import { insertOneEnsEtOccupValidator, putOneEnsEtOccupValidator } from "../validators/EnsEtOccupValidators.js";

const EnsEtOccupRouter=Router();

EnsEtOccupRouter.get('/',selectAllEnsetOccup);
EnsEtOccupRouter.get('/:matricule',selectAllEnsetOccupByMatricule);
EnsEtOccupRouter.post('/', insertOneEnsEtOccupValidator,insertOneEnsetOccup);

/* @MassinS
    ! modified
    * fixed this API endpoint
    * added the validator
    ? remove after reading
    --written by @lyesrabhi16
*/

EnsEtOccupRouter.put('/:matricule/Occupations/:id_occup', putOneEnsEtOccupValidator,putOneEnsEtOccup);
EnsEtOccupRouter.delete('/:matricule/Occupations/:id_occup',deleteOneEnsEtOccup);

export default EnsEtOccupRouter;