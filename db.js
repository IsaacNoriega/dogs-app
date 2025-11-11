const mysql = require('mysql2/promise');

const { NODE_ENV } = process.env;

// Configuraciones para cada entorno
const DB_CONFIG = {
  local: {
    host: process.env.LOCAL_DB_HOST || '127.0.0.1',
    port: process.env.LOCAL_DB_PORT || 3306,
    user: process.env.LOCAL_DB_USER || 'root',
    password: process.env.LOCAL_DB_PASS || '',
    database: process.env.LOCAL_DB_NAME || 'mydogs_local',
  },
  prod: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};

async function getConnection() {
  const config = NODE_ENV === 'prod' ? DB_CONFIG.prod : DB_CONFIG.local;
  try {
    const connection = await mysql.createConnection(config);
    console.log(`✅ Conectado a MySQL (${NODE_ENV})`);
    return connection;
  } catch (err) {
    console.error("❌ Error de conexión a MySQL:", err);
    throw err;
  }
}

module.exports = { getConnection, NODE_ENV };
