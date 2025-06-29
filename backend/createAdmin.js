import DB from "./DB/DB.js";
import dotEnv from "dotenv";
import inquirer from "inquirer";
import { TypePersonne } from "../constants.js";
import bcrypt from 'bcrypt';

dotEnv.config();

const db = DB();
db.connect()
  .then(() => {
    console.log("Database connected: " + db.$cn.database);
    const questions = [
      {
        type: "input",
        name: "nom",
        message: "nom: ",
      },
      {
        type: "input",
        name: "prenom",
        message: "prenom: ",
      },
      {
        type: "input",
        name: "email",
        message: "email: ",
      },
      {
        type: "password",
        name: "password",
        message: "password: ",
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      console.log(`creating Admin ${answers.email}...`);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(answers.password, salt);
      db.one(
        `INSERT INTO personne(nom, prenom, email, password, type, role)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING matricule, nom, prenom, email, password, type, role`,
        [
          answers.nom,
          answers.prenom,
          answers.email,
          hashedPassword,
          TypePersonne.Administrateur,
          "admin",
        ]
      ).then(res => {
        console.log("Admin created: ", res);
        process.exit()
      }).catch(err => {
        console.log("Failed to create Admin: ", err);
        process.exit(1)
      });
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
    process.exit(1)
  });
