import {Router } from "express";

import { getAllModule,
         putOneModule,
         insertOneModule,
         deleteOneModule,
         getOneModule,

} from "../controllers/ModuleController.js";
import { insertModuleValidator, putOneModuleValidator } from "../validators/moduleValidators.js";



const moduleRouter = Router();


moduleRouter.get('/',getAllModule);


moduleRouter.get("/:code_module", getOneModule);

moduleRouter.post('/', insertModuleValidator, insertOneModule);
moduleRouter.put('/:code_module', putOneModuleValidator,putOneModule);
moduleRouter.delete('/:code_module',deleteOneModule);


export default moduleRouter;