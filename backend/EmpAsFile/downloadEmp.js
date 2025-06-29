import { getEmpEnsFile, getEmpGroupeFile, getEmpSectionFile } from "./emp_xlsx.js";
import fs from "fs";
import * as uuid from "uuid";
export const downloadXLSX_EmpGroupe = async (req, res) => {
    const { id_groupe, semestre, annee } = req.params;
    const id = uuid.v4();
    const filename = id+`#EmploisDuTemps_groupe_${id_groupe}_${semestre}_${annee}.xlsx`
    const created = await getEmpGroupeFile(id_groupe, semestre, annee, filename);
    if (created){

        res.setHeader("Content-Type", "application/json");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${filename}`
        );
        res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        res.download(filename, filename.replace(id+"#", ""),(err) => {
            if(err){
                console.log(err);
            }
            fs.unlinkSync(filename);
        });
    }
    else{
        res.status(500).json({
            status: "Error",
            message: "Erreur pendant la creation du fichier",
          });
    }
}

export const downloadXLSX_EmpEns = async (req, res) => {
    const { matricule, semestre, annee } = req.params;
    const id = uuid.v4();
    const filename = id+`#EmploisDuTemps_ens_${matricule}_${semestre}_${annee}.xlsx`
    const created = await getEmpEnsFile(matricule, semestre, annee, filename);
    if(created){
        res.setHeader("Content-Type", "application/json");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${filename}`
        );
        res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        res.download(filename,  filename.replace(id+"#", ""), (err) => {
            if(err){
                console.log(err);
            }
            fs.unlinkSync(filename);
        });
    }
    else{
        res.status(500).json({
            status: "Error",
            message: "Erreur pendant la creation du fichier",
          });
    }
}


export const downloadXLSX_EmpSection = async (req, res) => {
    const { id_section, semestre, annee } = req.params;
    const id = uuid.v4();
    const filename = id+`#EmploisDuTemps_section_${id_section}_${semestre}_${annee}.xlsx`
    const created = await getEmpSectionFile(id_section, semestre, annee, filename);
    if(created){
        res.setHeader("Content-Type", "application/json");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${filename}`
        );
        res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        res.download(filename,  filename.replace(id+"#", ""), (err) => {
            if(err){
                console.log(err);
            }
            fs.unlinkSync(filename);
        });
    }
    else{
        res.status(500).json({
            status: "Error",
            message: "Erreur pendant la creation du fichier",
          });
    }
}