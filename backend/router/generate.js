import {Router } from "express";
import { generate } from "../generation/generation.js";
import { save } from "../generation/save.js";
import { generateValidator, saveValidator } from "../validators/generateValidator.js";



const generateRouter = Router();


generateRouter.post('/:id_section', generateValidator, generate);
generateRouter.post('/save/:id_section', saveValidator, save);

export default generateRouter;