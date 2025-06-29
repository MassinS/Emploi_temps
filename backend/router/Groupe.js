import { Router } from "express";
import {
  addGroupe,
  deleteGroupe,
  getGroupe,
  getGroupes,
  updateGroupe,
} from "../controllers/groupeController.js";
import { addGroupeValidator } from "../validators/groupeValidators.js";

const router = Router();

//! must add protection for the routes

//? get all
router.get("/", getGroupes);

//? get one
router.get("/:id_groupe", getGroupe);

//? add one
router.post("/", addGroupeValidator, addGroupe);

//? update one
router.put("/:id_groupe", addGroupeValidator, updateGroupe);

//? delete one
router.delete("/:id_groupe", deleteGroupe);

export default router;
