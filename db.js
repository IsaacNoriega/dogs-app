const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const { NODE_ENV } = process.env;

// Configuraciones por entorno
const DB_CONFIG = {
  local: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  prod: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT || 3306,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
  },
};

async function getConnection() {
  const config = NODE_ENV === 'prod' ? DB_CONFIG.prod : DB_CONFIG.local;

  const connection = await mysql.createConnection(config);
  console.log(`Conectado a MySQL (${NODE_ENV})`);

  // Solo asegurar tablas en producción o local según NODE_ENV
  const sqlFile = NODE_ENV === 'prod' ? 'create_tables.sql' : 'create_tables.sql';
  const sqlPath = path.join(__dirname, sqlFile);

  try {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await connection.query(sql);
    console.log('Tablas aseguradas');
  } catch (err) {
    console.error('Error al leer/ejecutar SQL:', err.message);
    throw err;
  }

  return connection;
}

module.exports = { getConnection, NODE_ENV };
