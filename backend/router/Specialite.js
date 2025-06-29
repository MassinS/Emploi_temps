import { Router } from "express";
import {
  addSpecialite,
  deleteSpecialite,
  getSpecialite,
  getSpecialites,
  updateSpecialite,
} from "../controllers/specialiteController.js";
import {
  addSpecialiteValidator,
  updateSpecialiteValidator,
} from "../validators/specialiteValidators.js";

const router = Router();

//! must add protection for the routes

//? get all
router.get("/", getSpecialites);

//? get one
router.get("/:code_specialite", getSpecialite);

//? add one
router.post("/", addSpecialiteValidator, addSpecialite);

//? update one
router.put("/:code_specialite", updateSpecialiteValidator, updateSpecialite);

//? delete one
router.delete("/:code_specialite", deleteSpecialite);

export default router;
