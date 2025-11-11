const mysql = require('mysql2/promise');

const {
    DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV
} = process.env;


async function getConnection() {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
        });

        console.log(`✅ Conectado a MySQL (${NODE_ENV})`);
        return connection;

    } catch (err) {
        console.error("❌ Error de conexión a MySQL:", err);
        throw err;
    }
}

module.exports = { getConnection, NODE_ENV };
