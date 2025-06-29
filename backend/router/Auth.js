import {Router } from "express";
import { AuthOnePersonne } from "../Auth/PersonneAuth.js";



const authRouter = Router();


authRouter.post('/',AuthOnePersonne);


export default authRouter;