import {Router } from "express";
import { sendEmail } from "../email/sendEmail.js";


const emailRouter = Router();


emailRouter.post("/send", sendEmail);

export default emailRouter;