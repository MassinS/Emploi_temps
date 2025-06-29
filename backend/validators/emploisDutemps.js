export const insertOneEmploisValidator = (req, res, next) => {
    const { id_groupe, niveau, semestre } = req.body;
    const missingFields = [];
    if (id_groupe === undefined) {
        missingFields.push('id_groupe');
    }
    if (niveau === undefined) {
        missingFields.push('niveau');
    }
    if (semestre === undefined) {
        missingFields.push('semestre');
    }

    if (missingFields.length > 0){
        return res.status(400).json({
            status: 'Error',
            message: 'Missing required fields: ' + missingFields
        });
    }

    next();
}