import { TypePersonne } from "../../constants.js";
import { getOneEmploisById } from "../DB/EmploisDuTemps.js";
import { getAllEnsEtCreneaux } from "../DB/EnsEtCreneaux.js";
import { selectPersonnes } from "../DB/personne.js";
import nodemailer from "nodemailer";
import { getEmpEnsFile, getEmpGroupeFile } from "../EmpAsFile/emp_xlsx.js";
import { v4 as uuidV4 } from "uuid";
import fs from "fs";

export const sendEmail = async (req, res) => {
  // user_email is the sender's email (from his gmail service)
  // user_pass is the sender's pass (from his gmail service) or App Password if the user has 2fa enabled in gmail for example
  const { id_emp, user_email, access_token, refresh_token, expires } = req.body;
  console.log("send emails: ", id_emp, user_email);

  let e = false;

  const emp = await getOneEmploisById(id_emp).catch((err) => {
    console.log(err);
    e = true;
    return res.status(500).json({
      status: "Error",
      message: "Erreur pendant la recherche d'emplois de temps",
      erreur: err,
    });
  });

  if (e) {
    return;
  }
  if (emp === null) {
    return res.status(404).json({
      status: "Error",
      message: "Emplois du temps non trouvé",
    });
  }

  const emailsEtudiants = [];

  // get emails of related students
  const etudiants = await selectPersonnes(
    TypePersonne.Etudiant,
    emp.id_groupe
  ).catch((err) => {
    console.log(err);
    e = true;
    res.status(500).json({
      status: "Error",
      message: "Erreur pendant la recherche des étudiants",
      erreur: err,
    });
  });
  if (e) {
    return;
  }
  etudiants.forEach((etudiant) => {
    emailsEtudiants.push(etudiant.email);
  });

  // get emails of related teachers
  const ensD = {};
  const enseignantsD = await getAllEnsEtCreneaux(id_emp).catch((err) => {
    console.log(err);
    e = true;
    res.status(500).json({
      status: "Error",
      message: "Erreur pendant la recherche des enseignants",
      erreur: err,
    });
  });
  if (e) {
    return;
  }

  const enseignants = [];
  enseignantsD.forEach((ens) => {
    if (!ensD[ens.matricule]) {
      ensD[ens.matricule] = true;
      enseignants.push(ens);
    }
  });

  // send email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: user_email,
      refreshToken: refresh_token,
      accessToken: access_token,
      expires: expires,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  });
  if (!transporter) {
    return res.status(500).json({
      status: "Error",
      message: "Failed to create email transporter",
    });
  }

  const mailHTML = `
    <h1>Emplois du temps</h1>
    <p>Ajoute ou Modification de l'emplois du temps du groupe : <span style="color:red"> ${emp.code_specialite} ${emp.code_section} ${emp.code_groupe} </span> </p>
    <p>Vous trouverez ci-joint l'emplois du temps</p>
    <a style="background-color:#513DF6; color:white; padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;" href="https://agemp-projet-aie.onrender.com/"> Go To Agemp </a>
    `;

  const filename = "EDT-" + uuidV4() + ".xlsx";

  const created_groupe_emp = await getEmpGroupeFile(
    emp.id_groupe,
    emp.semestre,
    emp.annee,
    filename
  );
  if (!created_groupe_emp) {
    return res.status(500).json({
      status: "Error",
      message: "Failed to create transporter",
    });
  }
  const mailOptions = [];
  // add Email of students
  if (emailsEtudiants.length > 0){
    mailOptions.push({
      from: user_email,
      to: emailsEtudiants,
      subject: `Emplois du temps ${emp.code_specialite} ${emp.code_section} ${emp.code_groupe}`,
      html: mailHTML,
      attachments: [
        {
          filename: `EDT-${emp.code_section}-${emp.code_groupe}-${emp.semestre}-${emp.annee}.xlsx`,
          path: filename,
        },
      ],
    })
  }
  // add an Email for each ens
  const ensEmpFiles = [];
  for (let i = 0; i < enseignants.length; i++) {
    const ens = enseignants[i];
    const filenameEns = "EDT-" + uuidV4() + ".xlsx";
    const createdEns = await getEmpEnsFile(
      ens.matricule,
      emp.semestre,
      emp.annee,
      filenameEns
    );
    if (!createdEns) {
      return res.status(500).json({
        status: "Error",
        message:
          "Failed to create Emp file for ens: " +
          ens.matricule +
          ` ${ens.nom} ${ens.prenom} ${ens.email}`,
      });
    }
    ensEmpFiles.push(filenameEns);
    mailOptions.push({
      from: user_email,
      to: ens.email,
      subject: `Emplois du temps ${ens.nom} ${ens.prenom}`,
      html: mailHTML,
      attachments: [
        {
          filename: `EDT-${ens.nom}-${ens.prenom}-${emp.semestre}-${emp.annee}.xlsx`,
          path: filenameEns,
        },
        {
          filename: `EDT-${emp.code_section}-${emp.code_groupe}-${emp.semestre}-${emp.annee}.xlsx`,
          path: filename,
        },
      ],
    });
  }

  // send Email
  const errs = [];
  for (let index = 0; index < mailOptions.length; index++) {
    const m = mailOptions[index];
    const info = await transporter.sendMail(m).catch((err) => {
      console.log(err);
      e = true;
      errs.push(err);
    });

    if (e) {
      // remove created files
      fs.unlinkSync(filename);
      ensEmpFiles.forEach((f) => fs.unlinkSync(f));
      break;
    }

    if (info.refused) {
      console.log("Email refused : ", info.refused);
    } else {
      console.log("Email accepted : ", info.accepted);
    }
  }

  // remove created files
  if(fs.existsSync(filename)){
    fs.unlinkSync(filename);
  }
  ensEmpFiles.forEach((f) => {
    if(fs.existsSync(f)){
      fs.unlinkSync(f);
    }});

  if (e) {
    res.status(500).json({
      status: "Error",
      message: "Erreur pendant l'envoi des emails",
      erreur: errs,
    });
    return false;
  }

  return res.status(200).json({
    status: "Success",
    message: "Les Emails ont été envoyer",
  });
};
