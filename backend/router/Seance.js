import {Router } from "express";
import { selectAllSeance ,
         selectOneSeanceById,
         selectAllSeanceByType,
         insertOneSeance,
         putOneSeance,
         deleteOneSeance,
         deleteOneSeanceByCodeModule


} from "../controllers/SeanceController.js";

import { addSeanceValidator, selectAllSeanceByTypeValidator } from "../validators/SeanceValidators.js";


const SeanceRouter=Router();

SeanceRouter.get('/',selectAllSeance);
SeanceRouter.get('/:id_seance',selectOneSeanceById);


SeanceRouter.get('/types/:type', selectAllSeanceByTypeValidator,selectAllSeanceByType);
SeanceRouter.post('/',addSeanceValidator,insertOneSeance);
SeanceRouter.put('/:id_seance',addSeanceValidator,putOneSeance);
SeanceRouter.delete('/:id_seance',deleteOneSeance);
SeanceRouter.delete('/Modules/:code_module',deleteOneSeanceByCodeModule);

export default SeanceRouter;