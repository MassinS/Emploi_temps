import pg from "pg-promise";


const pgp = pg();
const db = () => {
    const config = {
        host: process.env.DBHost,
        port: process.env.DBPort,
        database: process.env.DBName,
        user: process.env.DBUser,
        password: process.env.DBPass
    };

    return pgp(config);
};

export default db;