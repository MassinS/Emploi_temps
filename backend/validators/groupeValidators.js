export const addGroupeValidator = (req, res, next) => {
    const { code_groupe, id_section } = req.body;
    const missingFeilds = [];

    if (code_groupe === undefined) {
      missingFeilds.push("code_groupe");
    }

    if (id_section === undefined) {
        missingFeilds.push("id_section");
    }

    if (missingFeilds.length > 0){
        const response = {
            status: "error",
            message: "Missing required fields: "+missingFeilds,
        };
        return res.status(400).json(response);
    }

    next();
};