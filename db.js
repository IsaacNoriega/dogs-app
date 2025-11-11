const mysql = require('mysql2/promise');
const { NODE_ENV } = process.env;

const DB_CONFIG = {
  local: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  prod: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
  },
};

async function getConnection() {
  const config = NODE_ENV === 'prod' ? DB_CONFIG.prod : DB_CONFIG.local;
  const connection = await mysql.createConnection(config);
  console.log(` Conectado a MySQL (${NODE_ENV})`);
  return connection;
}

module.exports = { getConnection, NODE_ENV };
