import { Router } from "express";
import { addPersonneValidator, getPersonnesBytypeValidator } from "../validators/personneValidators.js";
import { addPersonne, deletePersonne, getPersonne, getPersonnes, updatePersonne } from "../controllers/personneController.js";

const personneRouter = Router();

//! must add protection for the routes

//? get all
personneRouter.get("/", getPersonnes);

//? get all by type
personneRouter.get("/type/:type", getPersonnesBytypeValidator, getPersonnes);

//? get one
personneRouter.get("/:matricule", getPersonne);

//? add one
personneRouter.post("/", addPersonneValidator, addPersonne);

//? update one
personneRouter.put("/:matricule", addPersonneValidator, updatePersonne);

//? delete one
personneRouter.delete("/:matricule", deletePersonne);

export default personneRouter;

