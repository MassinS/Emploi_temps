import {
  getAllCreneauByEmp,
  getAllCreneauBySection,
} from "../DB/Creneau.js";
import { getOneEmploisByGroupe } from "../DB/EmploisDuTemps.js";
import exceljs from "exceljs";
import { getAllEnsEtCreneauxById } from "../DB/EnsEtCreneaux.js";
import { selectSection } from "../DB/section.js";
import { selectGroupes } from "../DB/groupe.js";
import { shuffleArray } from "../generation/generation.js";
export const getEmpGroupeFile = async (
  id_groupe,
  semestre,
  annee,
  filename
) => {
  console.log("create EMP groupe ",id_groupe, semestre, annee, filename);
  const emp = await getOneEmploisByGroupe(id_groupe, semestre, annee).catch(
    (err) => {
      console.log(err);
      return false;
    }
  );
  if (emp === undefined || emp === null) {
    return false;
  }
  const creneaux = await getAllCreneauByEmp(emp.id_emp).catch((err) => {
    console.log(err);
    return false;
  });

  if (creneaux.length === 0) {
    return false;
  }

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet(`EDT-${emp.code_groupe}`);

  const cols = [];
  creneaux.forEach((creneau) => {
    if (!cols.find((col) => col === `${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`)) {
      cols.push(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`);
    }
  });
  cols.sort();
  const cols_f = [
    {
      header: "Jours",
      key: "jours",
      width: 6,
    },
  ];
  let i = 0;
  let j = 1;
  while (i <= cols.length) {
    const c = cols[i];
    cols_f[j] = {
      header: c,
      key: c + "-type",
      width: 15,
    };
    j++;
    cols_f[j] = {
      header: c,
      key: c,
      width: 25,
    };
    j++;
    cols_f[j] = {
      header: c,
      key: c + "-local",
      width: 15,
    };
    j++;
    i++;
  }
  worksheet.columns = cols_f;

  worksheet.addRows([
    { jours: "Samedi" },
    { jours: "Dimanche" },
    { jours: "Lundi" },
    { jours: "Mardi" },
    { jours: "Mercredi" },
    { jours: "Jeudi" },
  ]);
  let nbr_modules = 0;
  const modules = {};
  creneaux.forEach((creneau) => {
    if (modules[creneau.code_module] === undefined) {
      modules[creneau.code_module] = creneau.nom;
      nbr_modules++;
    }
  }); 
  const colors_p = [
    'FFECB751',
    'FFC0E591',
    'FFFBF791',
    'FF91A1F5',
    'CCA3A3A3',
    'FFE58AE7',
    'FFF0996C',
    'FFCDA393'
  ];

  // generate new colors if nbr_modules was given and is greater than colors.length
  if(nbr_modules > colors_p.length){
      for(let i = colors_p.length; i < nbr_modules; i++){
          let color = randomARGBColor();
          while (colors_p.find(c => c.substring(2) === color.substring(2))) {
            color = randomARGBColor();
          }
          colors_p.push(color);
          console.log("generated new color: ", color);
      }
  }
  shuffleArray(colors_p);
  let colors_i = 0;
  const colors = {};
  creneaux.forEach((creneau) => {
    const row = worksheet.getRow(convertJourToIndex(creneau.jour));
    const cell_type = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}-type`);
    cell_type.value = ` ${creneau.type_seance} `;

    const cell_module = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`);
    cell_module.value = ` ${creneau.code_module} (${creneau.nom}) `;

    const cell_local = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}-local`);
    cell_local.value = ` ${creneau.code_local} `;
    if (colors[creneau.code_module] === undefined) {
      colors[creneau.code_module] = colors_p[colors_i];
      colors_i++;
    }
    cell_type.style = {
      font: { bold: true, color: WhiteOrBlackFont(colors[creneau.code_module].substring(2)) },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
    cell_module.style = {
      font: { bold: true, color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      },
    };

    cell_local.style = {
      font: { bold: true, color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
  });

  worksheet.eachRow((row) => {
    row.height = 80;

    if (row.getCell("jours").value === "Jours") {
      row.height = 20;
      let cell_merge_c = 2;
      row.eachCell((cell, colNumber) => {
        if (colNumber === cell_merge_c) {
          worksheet.mergeCells(
            row.number,
            colNumber,
            row.number,
            colNumber + 2
          );
          cell_merge_c += 3;
        }
        cell.style = {
          font: { bold: true, color: WhiteOrBlackFont("FFA07A")  },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFA07A" },
          },
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
          alignment: {
            vertical: "middle",
            horizontal: "center",
          },
        };
      });
    }
    const cellJours = row.getCell("jours");
    cellJours.style = {
      font: { bold: true, color: WhiteOrBlackFont("FFA07A") },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFA07A" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        textRotation: cellJours.value === "Jours" ? 0 : 90,
        vertical: "middle",
        horizontal: "center",
      },
    };
  });
  let created = true;
  await workbook.xlsx.writeFile(filename).catch((err) => {
    console.log(err);
    created = false;
  });
  return created;
};

export const getEmpEnsFile = async (matricule, semestre, annee, filename) => {
  console.log("create EMP ens ",matricule, semestre, annee, filename);
  const emp = await getAllEnsEtCreneauxById(matricule, semestre, annee).catch(
    (err) => {
      console.log(err);
      return false;
    }
  );
  if (emp.length === 0) {
    return false;
  }
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet(`EDT-${emp[0].nom}-${emp[0].prenom}`);

  const cols = [];
  emp.forEach((creneau) => {
    if (!cols.find((col) => col === `${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`)) {
      cols.push(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`);
    }
  });
  cols.sort();
  const cols_f = [
    {
      header: "Jours",
      key: "jours",
      width: 6,
    },
  ];
  let i = 0;
  let j = 1;
  while (i <= cols.length) {
    const c = cols[i];
    cols_f[j] = {
      header: c,
      key: c + "-type",
      width: 15,
    };
    j++;
    cols_f[j] = {
      header: c,
      key: c,
      width: 25,
    };
    j++;
    cols_f[j] = {
      header: c,
      key: c + "-local",
      width: 15,
    };
    j++;
    i++;
  }
  worksheet.columns = cols_f;

  worksheet.addRows([
    { jours: "Samedi" },
    { jours: "Dimanche" },
    { jours: "Lundi" },
    { jours: "Mardi" },
    { jours: "Mercredi" },
    { jours: "Jeudi" },
  ]);
  let nbr_modules = 0;
  const modules = {};
  emp.forEach((creneau) => {
    if (modules[creneau.code_module] === undefined) {
      modules[creneau.code_module] = creneau.nom;
      nbr_modules++;
    }
  }); 
  const colors_p = [
    'FFECB751',
    'FFC0E591',
    'FFFBF791',
    'FF91A1F5',
    'CCA3A3A3',
    'FFE58AE7',
    'FFF0996C',
    'FFCDA393'
  ];

  // generate new colors if nbr_modules was given and is greater than colors.length
  if(nbr_modules > colors_p.length){
      for(let i = colors_p.length; i < nbr_modules; i++){
          let color = randomARGBColor();
          while (colors_p.find(c => c.substring(2) === color.substring(2))) {
            color = randomARGBColor();
          }
          colors_p.push(color);
          console.log("generated new color: ", color);
      }
  }
  shuffleArray(colors_p);
  let colors_i = 0;
  const colors = {};
  emp.forEach((creneau) => {
    const row = worksheet.getRow(convertJourToIndex(creneau.jour));
    const cell_type = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}-type`);
    cell_type.value = ` ${creneau.type_seance} `;

    const cell_module = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`);
    cell_module.value = ` ${creneau.code_module} (${creneau.niveau}${creneau.code_specialite}-${creneau.code_section}${creneau.code_groupe}) `;

    const cell_local = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}-local`);
    cell_local.value = ` ${creneau.code_local} `;
    if (colors[creneau.code_module] === undefined) {
      colors[creneau.code_module] = colors_p[colors_i];
      colors_i++;
    }
    cell_type.style = {
      font: { bold: true,color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))   },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
    cell_module.style = {
      font: { bold: true, color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      },
    };

    cell_local.style = {
      font: { bold: true,color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
  });

  worksheet.eachRow((row) => {
    row.height = 80;

    if (row.getCell("jours").value === "Jours") {
      row.height = 20;
      let cell_merge_c = 2;
      row.eachCell((cell, colNumber) => {
        if (colNumber === cell_merge_c) {
          worksheet.mergeCells(
            row.number,
            colNumber,
            row.number,
            colNumber + 2
          );
          cell_merge_c += 3;
        }
        cell.style = {
          font: { bold: true , color: WhiteOrBlackFont("FFA07A") },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFA07A" },
          },
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
          alignment: {
            vertical: "middle",
            horizontal: "center",
          },
        };
      });
    }
    const cellJours = row.getCell("jours");
    cellJours.style = {
      font: { bold: true , color: WhiteOrBlackFont("FFA07A") },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFA07A" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        textRotation: cellJours.value === "Jours" ? 0 : 90,
        vertical: "middle",
        horizontal: "center",
      },
    };
  });
  let created = true;
  await workbook.xlsx.writeFile(filename).catch((err) => {
    console.log(err);
    created = false;
  });
  return created;
};
export const getEmpSectionFile = async (
  id_section,
  semestre,
  annee,
  filename
) => {
  console.log("create EMP section ",id_section, semestre, annee, filename);
  const section = await selectSection(id_section).catch((err) => {
    console.log(err);
    return false;
  });
  if (section === undefined || section === null) {
    return false;
  }

  const groupes = await selectGroupes(id_section).catch((err) => {
    console.log(err);
    return false;
  });
  if (groupes.length === 0) {
    return false;
  }

  const creneaux = await getAllCreneauBySection(
    id_section,
    semestre,
    annee
  ).catch((err) => {
    console.log(err);
    return false;
  });

  if (creneaux.length === 0) {
    console.log("no creneaux", creneaux);
    return false;
  }

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet(
    `EDT-${section.niveau}${section.code_specialite}-${section.code_section}`
  );

  const cols = [];
  creneaux.forEach((creneau) => {
    if (!cols.find((col) => col === `${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`)) {
      cols.push(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`);
    }
  });
  cols.sort();
  const cols_f = [
    {
      header: "Jours",
      key: "jours",
      width: 6,
    },
    {
      header: "Gpe",
      key: "gpe",
      width: 5,
    },
  ];
  let i = 0;
  let j = 2;
  while (i <= cols.length) {
    const c = cols[i];
    cols_f[j] = {
      header: c,
      key: c + "-type",
      width: 15,
    };
    j++;
    cols_f[j] = {
      header: c,
      key: c,
      width: 25,
    };
    j++;
    cols_f[j] = {
      header: c,
      key: c + "-local",
      width: 15,
    };
    j++;
    i++;
  }
  worksheet.columns = cols_f;
  let cell_merge_r = 2;
  const gpes = groupes.map((groupe) => groupe.code_groupe).sort();
  const joursL = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
  joursL.forEach((jour) => {
    worksheet.addRows(
      gpes.map((g) => {
        return { jours: jour, gpe: g };
      })
    );
    worksheet.mergeCells(cell_merge_r, 1, cell_merge_r + gpes.length - 1, 1);
    cell_merge_r += gpes.length;
  });

  let nbr_modules = 0;
  const modules = {};
  creneaux.forEach((creneau) => {
    if (modules[creneau.code_module] === undefined) {
      modules[creneau.code_module] = creneau.nom;
      nbr_modules++;
    }
  }); 
  const colors_p = [
    'FFECB751',
    'FFC0E591',
    'FFFBF791',
    'FF91A1F5',
    'CCA3A3A3',
    'FFE58AE7',
    'FFF0996C',
    'FFCDA393'
  ];

  // generate new colors if nbr_modules was given and is greater than colors.length
  if(nbr_modules > colors_p.length){
      for(let i = colors_p.length; i < nbr_modules; i++){
          let color = randomARGBColor();
          while (colors_p.find(c => c.substring(2) === color.substring(2))) {
            color = randomARGBColor();
          }
          colors_p.push(color);
          console.log("generated new color: ", color);
      }
  }
  shuffleArray(colors_p);

  let colors_i = 0;
  const colors = {};
  creneaux.forEach((creneau) => {
    const row = worksheet.getRow(convertJourToIndex(creneau.jour, joursL, gpes) + gpes.findIndex(g => g === creneau.code_groupe));
    const cell_type = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}-type`);
    cell_type.value = ` ${creneau.type_seance} `;

    const cell_module = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}`);
    cell_module.value = ` ${creneau.code_module} (${creneau.nom}) `;

    const cell_local = row.getCell(`${correctTimeFormat(creneau.debut)} - ${correctTimeFormat(creneau.fin)}-local`);
    cell_local.value = ` ${creneau.code_local} `;
    if (colors[creneau.code_module] === undefined) {
      colors[creneau.code_module] = colors_p[colors_i];
      colors_i++;
    }

    cell_type.style = {
      font: { bold: true,color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
    cell_module.style = {
      font: { bold: true,color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      },
    };

    cell_local.style = {
      font: { bold: true,color: WhiteOrBlackFont(colors[creneau.code_module].substring(2))  },

      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colors[creneau.code_module] },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
  });
  console.log(colors);

  worksheet.eachRow((row) => {
    row.height = 25;

    if (row.getCell("jours").value === "Jours") {
      row.height = 20;
      let cell_merge_c = 3;
      row.eachCell((cell, colNumber) => {
        if (colNumber === cell_merge_c) {
          worksheet.mergeCells(
            row.number,
            colNumber,
            row.number,
            colNumber + 2
          );
          cell_merge_c += 3;
        }
        cell.style = {
          font: { bold: true, color: WhiteOrBlackFont("FFA07A")  },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFA07A" },
          },
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
          alignment: {
            vertical: "middle",
            horizontal: "center",
          },
        };
      });
    }
    const cellJours = row.getCell("jours");
    cellJours.style = {
      font: { bold: true, color: WhiteOrBlackFont("FFA07A")  },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFA07A" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        textRotation: cellJours.value === "Jours" ? 0 : 90,
        vertical: "middle",
        horizontal: "center",
      },
    };
    const cellGpe = row.getCell("gpe");
    cellGpe.style = {
      font: { bold: true, color: WhiteOrBlackFont("FFA07A") },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFA07A" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
    };
  });

  for (let c = 3; c <= worksheet.actualColumnCount-3; c+=3) {
    let r = 2;

    while (r < worksheet.actualRowCount){
      const cell_type = worksheet.getCell(r, c);
      const cell_module = worksheet.getCell(r, c+1);
      const cell_local = worksheet.getCell(r, c+2);

      let i = 1;
      while (i < groupes.length){
        const n_cell_type = worksheet.getCell(r+i, c);
        const n_cell_module = worksheet.getCell(r+i, c+1);
        const n_cell_local = worksheet.getCell(r+i, c+2);

        if(n_cell_type.value === cell_type.value && n_cell_module.value === cell_module.value && n_cell_local.value === cell_local.value){
          i++;
        }
        else{
          break;
        }
      }
      if(i-1 > 0){
        if(!(worksheet.getCell(r,c).text==="")){
          worksheet.mergeCells(r, c, r+i-1, c);     
        } //type merge
        if (!(worksheet.getCell(r,c+1).text==="")) {
          worksheet.mergeCells(r, c+1, r+i-1, c+1);
        } //module merge
        if (!(worksheet.getCell(r,c+2).text==="")) {
          worksheet.mergeCells(r, c+2, r+i-1, c+2);
        } //local merge
      }
      r+=i;
    }
    
  }


  let created = true;
  await workbook.xlsx.writeFile(filename).catch((err) => {
    console.log(err);
    created = false;
  });
  return created;
};


const convertJourToIndex = (jour, jours,groupes) => {

  if(jours === undefined){
// sourcery skip: dont-reassign-parameters
    jours = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
  }
  if(groupes === undefined){
// sourcery skip: dont-reassign-parameters
    groupes = [1];
  }

  let k = 2;
  for (let i = 0; i < jours.length; i++) {
    const j = jours[i];
    if (j === jour) {
      return k;
    }
    else{
      const gl = groupes.length;
      k += gl;
    }
  }

  switch (jour) {
    case "Samedi":
      return 2;
    case "Dimanche":
      return 3;
    case "Lundi":
      return 4;
    case "Mardi":
      return 5;
    case "Mercredi":
      return 6;
    case "Jeudi":
      return 7;
    default:
      return 0;
  }
};

const randomARGBColor = () => {
  let r = Math.floor(Math.random() * (255 + 1));
  let g = Math.floor(Math.random() * (255 + 1));
  let b = Math.floor(Math.random() * (255 + 1));

  let hr = r.toString(16).padStart(2, "0");
  let hg = g.toString(16).padStart(2, "0");
  let hb = b.toString(16).padStart(2, "0");

  return 'FF' + hr + hg + hb;
}

const hexToRgb = (hex) =>{
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
const WhiteOrBlackFont = (bg_color) => {
  const rgb = hexToRgb(bg_color);
  const c = (rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114);
  return c <= 186 ? "FFFFFF" : "000000";
}


export const correctTimeFormat=(hh_mm_ss, sep = "H") => {
  return hh_mm_ss.split(":", 2).join(sep);
}