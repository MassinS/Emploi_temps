export const addSectionValidator = (req, res, next) => {
    const { code_section, niveau, code_specialite } = req.body;

    const missingFields = [];

    if (code_section === undefined) {
        missingFields.push("code_section");
    }
    if (niveau === undefined) {
        missingFields.push("niveau");
    }
    if (code_specialite === undefined) {
        missingFields.push("code_specialite");
    }

    if (missingFields.length > 0) {
        res.status(400).json({
        status: "error",
        message:
            "missing required fields: " +
            missingFields
        });
        return false;
    }
    next();
    return true;
};