require('dotenv').config();
const mysql = require('mysql2/promise');

const password = process.env.DB_PASSWORD;
if (!password) {
    throw new Error('Falta DB_PASSWORD para conectar a la base de datos.');
}

const port = Number(process.env.DB_PORT || 3306);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT debe ser un puerto válido entre 1 y 65535.');
}

const caCertificate = process.env.DB_SSL_CA?.replace(/\\n/g, '\n');
if (process.env.NODE_ENV === 'production' && !caCertificate) {
    throw new Error('Falta DB_SSL_CA: configura el certificado CA de Aiven en producción.');
}

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port,
    user: process.env.DB_USER || 'root',
    password,
    database: process.env.DB_NAME || 'gestion_proyectos',
    ...(caCertificate ? { ssl: { ca: caCertificate, rejectUnauthorized: true } } : {}),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;