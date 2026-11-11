require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const allowedOrigins = new Set([
    'http://localhost:5173',
    process.env.FRONTEND_URL || '',
    ...(process.env.FRONTEND_URLS || '').split(',')
].map(origin => origin.trim().replace(/\/+$/, '')).filter(Boolean));

// Middlewares globales
app.use(cors({
    origin: (origin, callback) => {
        callback(null, !origin || allowedOrigins.has(origin.replace(/\/+$/, '')));
    },
    credentials: true
}));
app.use(express.json({ limit: '8mb' }));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// 1. Importamos la seguridad y las rutas
const { autenticar } = require('./seguridad');
const rutasAuth = require('./rutas/auth');
const rutasProyectos = require('./rutas/proyectos');
const rutasReportes = require('./rutas/reportes');

// 2. Conectamos las rutas al servidor
// Rutas de autenticación y usuarios (el propio archivo auth.js maneja su seguridad interna)
app.use('/api', rutasAuth); 

// Rutas de proyectos (aplicamos el middleware "autenticar" para proteger TODAS estas rutas de golpe)
app.use('/api', autenticar, rutasProyectos); 

// Rutas de reportes (el propio archivo valida autenticación y rol administrador)
app.use('/api/reportes', rutasReportes);

// 3. Iniciamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});