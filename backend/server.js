import  Express  from "express";
import dotEnv from "dotenv";
import cors from "cors";
import DB from "./DB/DB.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import PersonneRouter from "./router/Personne.js";
import SpecialiteRouter from "./router/Specialite.js";
import SectionRouter from './router/Section.js';
import GroupeRouter from './router/Groupe.js';
import OccupationRouter from "./router/Occupation.js";
import moduleRouter from "./router/Module.js";
import LocalRouter from "./router/Local.js";
import SeanceRouter from "./router/Seance.js";
import CreneauRouter from "./router/Creneau.js";
import EmploisRouter from "./router/EmploisDuTemps.js";
import EnsEtOccupRouter from "./router/EnsEtOccup.js";
import ModuleEnsRouter from "./router/ModuleEns.js";
import EnsEtCreneauxRouter from "./router/EnsEtCreneaux.js";

import authRouter from "./router/Auth.js";

import { cookieJwtAuthentication } from "./Auth/cookieJwtAuth.js";
import generateRouter from "./router/generate.js";
import emailRouter from "./router/email.js";
dotEnv.config();

const app = new Express();
const port = process.env.ServerPort || 2999;

export const db = DB();
app.use(morgan('dev'))
app.use(Express.urlencoded({ extended: true, limit: '5mb' }));
app.use(Express.json({ limit: '5mb' }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("AGEMP Server");// for testing purposes
});

app.use("/Personne", cookieJwtAuthentication,PersonneRouter);
app.use("/Specialite", cookieJwtAuthentication ,SpecialiteRouter);
app.use("/Section", cookieJwtAuthentication ,SectionRouter);
app.use('/Occupation',cookieJwtAuthentication,OccupationRouter);
app.use("/Groupe",cookieJwtAuthentication, GroupeRouter);
app.use("/Module",cookieJwtAuthentication, moduleRouter );
app.use("/Local",cookieJwtAuthentication,LocalRouter);
app.use("/Seance",cookieJwtAuthentication,SeanceRouter);
app.use('/Creneau',cookieJwtAuthentication,CreneauRouter);
app.use('/EmploisTemps',cookieJwtAuthentication,EmploisRouter);
app.use('/EnsEtOccup',cookieJwtAuthentication,EnsEtOccupRouter);
app.use('/ModuleEns',cookieJwtAuthentication,ModuleEnsRouter);
app.use('/EnsCreneaux',cookieJwtAuthentication,EnsEtCreneauxRouter);
app.use('/generate', cookieJwtAuthentication,generateRouter);
app.use('/email', cookieJwtAuthentication,emailRouter);
app.use('/login',authRouter);
app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});

db.connect()
      .then(()=>console.log("Database connected: "+db.$cn.database))
      .catch((err)=>console.log("Error connecting to the database:", err));