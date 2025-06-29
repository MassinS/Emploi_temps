export const saveValidator = (req, res, next) => {
  const { data, semestre, annee, override } = req.body;

  const missingFields = [];

  if (!data) {
    missingFields.push("data");
  }
  if (!annee) {
    missingFields.push("annee");
  }
  if (!semestre) {
    missingFields.push("semestre");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "Error",
      message: "missing fields: " + missingFields,
    });
  }

  if (override === "true") {
    req.body.override = true;
  } else if (override === undefined || override === "false" ) {
    req.body.override = false;
  }else{
    return res.status(400).json({
      status: "Value Error",
      message: "override attribute value must be either true or false",
    })
  }

  try {
    req.body.data = JSON.parse(data);
    next();
  } catch {
    return res.status(400).json({
      status: "Type Error",
      message:
        "Failed to Parse data, data attribute value must be JSON string ",
    });
  }
};

export const generateValidator = (req, res, next) => {
  const {
    semestre,
    annee,
    temps_debut,
    temps_fin,
    nbr_creneaux_par_jour,
    duree_creneaux,
    minutes_entre_creneaux,
    max_seances_consecutif,
    max_cours_par_jour,
    shuffle,
    ignore_charges
  } = req.body;

  const missingFields = [];

  if (!semestre) {
    missingFields.push("semestre");
  }
  if (!annee) {
    missingFields.push("annee");
  }

  if (temps_debut === undefined) {
    req.body.temps_debut = { h: 8, m: 0 };
  } else {
    try {
      req.body.temps_debut = JSON.parse(temps_debut);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          'Failed to Parse temps_debut, temps_debut attribute value must be JSON string of object like this :{ "h":8, "m":00  } ',
      });
    }
  }
  if (temps_fin === undefined) {
    req.body.temps_fin = { h: 18, m: 0 };
  } else {
    try {
      req.body.temps_fin = JSON.parse(temps_fin);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          'Failed to Parse temps_fin, temps_fin attribute value must be JSON string of object like this :{ "h":18, "m":0  } ',
      });
    }
  }
  if (duree_creneaux === undefined) {
    req.body.duree_creneaux = { h: 1, m: 30 };
  } else {
    try {
      req.body.duree_creneaux = JSON.parse(duree_creneaux);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          'Failed to Parse duree_creneaux, duree_creneaux attribute value must be JSON string of object like this :{ "h":1, "m":30  } ',
      });
    }
  }
  if (minutes_entre_creneaux === undefined) {
    req.body.minutes_entre_creneaux = 10;
  } else {
    try {
      req.body.minutes_entre_creneaux = parseInt(minutes_entre_creneaux);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          "Failed to Parse minutes_entre_creneaux, minutes_entre_creneaux attribute value must be integer ",
      });
    }
  }
  if (max_seances_consecutif === undefined) {
    req.body.max_seances_consecutif = 3;
  } else {
    try {
      req.body.max_seances_consecutif = parseInt(max_seances_consecutif);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          "Failed to Parse max_seances_consecutif, max_seances_consecutif attribute value must be integer ",
      });
    }
  }
  if (max_cours_par_jour === undefined) {
    req.body.max_cours_par_jour = 2;
  } else {
    try {
      req.body.max_cours_par_jour = parseInt(max_cours_par_jour);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          "Failed to Parse max_cours_par_jour, max_cours_par_jour attribute value must be integer ",
      });
    }
  }
  if (nbr_creneaux_par_jour === undefined) {
    req.body.nbr_creneaux_par_jour =
      getMaxPeriodFromConstraints(
        req.body.temps_debut,
        req.body.temps_fin,
        req.body.duree_creneaux,
        req.body.minutes_entre_creneaux
      ) ;
  } else {
    try {
      req.body.nbr_creneaux_par_jour = parseInt(nbr_creneaux_par_jour);
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          "Failed to Parse nbr_creneaux_par_jour, nbr_creneaux_par_jour attribute value must be integer ",
      });
    }
  }
  if (shuffle === undefined) {
    req.body.shuffle = 0;
  } else {
    try {
      req.body.shuffle = parseInt(shuffle);
      if (req.body.shuffle !== 0 && req.body.shuffle !== 1) {
        return res.status(400).json({
          status: "Value Error",
          message:
            "Failed to Parse shuffle, shuffle attribute value must be integer 0 or 1 ",
        });
      }
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          "Failed to Parse shuffle, shuffle attribute value must be integer 0 or 1 ",
      });
    }
  }

  if (ignore_charges === undefined) {
    req.body.ignore_charges = 1;
  } else {
    try {
      req.body.ignore_charges = parseInt(ignore_charges);
      if (req.body.ignore_charges !== 0 && req.body.ignore_charges !== 1) {
        return res.status(400).json({
          status: "Value Error",
          message:
            "Failed to Parse ignore_charges, ignore_charges attribute value must be integer 0 or 1 ",
        });
      }
    } catch {
      return res.status(400).json({
        status: "Type Error",
        message:
          "Failed to Parse ignore_charges, ignore_charges attribute value must be integer 0 or 1 ",
      });
    }
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "Error",
      message: "missing required fields: " + missingFields,
    });
  }

  next();
};

const getMaxPeriodFromConstraints = (
  temps_debut,
  temps_fin,
  duree_creneaux,
  temps_entre_creneau
) => {
  const t_d = new Date();
  t_d.setUTCHours(temps_debut.h, temps_debut.m);

  const t_f = new Date();
  t_f.setUTCHours(temps_fin.h, temps_fin.m);

  let p = 0;
  while (t_d <= t_f) {
    t_d.setUTCMinutes(
      t_d.getUTCMinutes() + duree_creneaux.m + temps_entre_creneau
    );
    t_d.setUTCHours(t_d.getUTCHours() + duree_creneaux.h);
    if (t_d <= t_f) {
      p++;
    }
  }
  return p;
};
