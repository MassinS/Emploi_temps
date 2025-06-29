import { Router } from "express";

import { selectAllModuleEns,
         selectAllModuleEnsById,
         putOneModuleEns,
         insertOneModuleEns,
         deleteOneModuleEns,
         deleteAllModulesByMatricule
         } from "../controllers/ModuleEnsController.js";
import { insertOneModuleEnsValidator, putOneModuleEnsValidator } from "../validators/moduleEnsValidators.js";

const ModuleEnsRouter = Router();

ModuleEnsRouter.get('/',selectAllModuleEns);
ModuleEnsRouter.get('/:matricule',selectAllModuleEnsById);

ModuleEnsRouter.put('/:matricule/modules/:code_module', putOneModuleEnsValidator,putOneModuleEns);

ModuleEnsRouter.post('/', insertOneModuleEnsValidator,insertOneModuleEns);
ModuleEnsRouter.delete('/:matricule/modules/:code_module',deleteOneModuleEns);


ModuleEnsRouter.delete('/:matricule',deleteAllModulesByMatricule);

export default ModuleEnsRouter;
