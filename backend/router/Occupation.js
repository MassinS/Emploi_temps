import {Router } from "express";
import { addOccupationValidator } from "../validators/OccupationValidators.js";

import { getOccupationId , 
         getOccupationDay ,
         deleteOccupationById,
         updateOccupationById,
         insertOneOccupation,
         getAllOccupation,
         getOccupationDayHdHf
                
} from "../controllers/OccupationController.js";


const OccupationRouter = Router();


OccupationRouter.get('/:id_occup' , getOccupationId );

OccupationRouter.get('/jours/:jour', getOccupationDay );

OccupationRouter.get('', getAllOccupation );


OccupationRouter.delete('/:id_occup',deleteOccupationById);

OccupationRouter.put('/:id_occup',addOccupationValidator,updateOccupationById);

OccupationRouter.post('/',addOccupationValidator,insertOneOccupation);

OccupationRouter.post('/DayHDHf/getDayHdHf' , getOccupationDayHdHf );



export default OccupationRouter;


