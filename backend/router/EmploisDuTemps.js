import { Router } from "express";

import { selectAllEmplois,
         selectOneEmploisById,
         selectOneEmploisByGroupe,
         insertOneEmplois,
         deleteOneEmplois,
         updateOneEmplois,
         deleteOneEmploisByIdGroupe

} from "../controllers/EmploisController.js";
import { insertOneEmploisValidator } from "../validators/emploisDutemps.js";
import { downloadXLSX_EmpGroupe, downloadXLSX_EmpEns, downloadXLSX_EmpSection } from "../EmpAsFile/downloadEmp.js";

const EmploisRouter = Router();

EmploisRouter.get('/',selectAllEmplois);
EmploisRouter.get('/:id_Emp',selectOneEmploisById);

EmploisRouter.get('/groupes/:id_groupe/:semestre/:annee/:niveau',selectOneEmploisByGroupe);

EmploisRouter.post('/', insertOneEmploisValidator,insertOneEmplois);
EmploisRouter.delete('/:id_emp',deleteOneEmplois);
EmploisRouter.put('/:id_emp', insertOneEmploisValidator,updateOneEmplois);
EmploisRouter.delete('/groupes/:id_groupe/:semestre/:annee',deleteOneEmploisByIdGroupe);
EmploisRouter.get('/groupe/:id_groupe/:semestre/:annee/xlsx', downloadXLSX_EmpGroupe);
EmploisRouter.get('/enseignant/:matricule/:semestre/:annee/xlsx', downloadXLSX_EmpEns);
EmploisRouter.get('/section/:id_section/:semestre/:annee/xlsx', downloadXLSX_EmpSection);
export default EmploisRouter;
