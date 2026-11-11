const crypto = require('crypto');
const pool = require('./db');

const SECRET = process.env.SESSION_SECRET;
if (!SECRET) {
    throw new Error('Falta SESSION_SECRET para firmar las sesiones.');
}

const crearHashContrasena = (contrasena) => {
    const texto = String(contrasena || '');
    const salt = crypto.randomBytes(16).toString('base64url');
    const hash = crypto.scryptSync(texto, salt, 64).toString('base64url');
    return `scrypt$${salt}$${hash}`;
};

const verificarContrasena = (contrasena, hashGuardado) => {
    if (typeof hashGuardado !== 'string' || !hashGuardado.startsWith('scrypt$')) return false;
    const partes = hashGuardado.split('$');
    if (partes.length !== 3) return false;
    
    const [, salt, hashEsperadoTexto] = partes;
    try {
        const hashCalculado = crypto.scryptSync(String(contrasena || ''), salt, 64);
        const hashEsperado = Buffer.from(hashEsperadoTexto, 'base64url');
        return hashCalculado.length === hashEsperado.length && crypto.timingSafeEqual(hashCalculado, hashEsperado);
    } catch (error) {
        return false;
    }
};

const firmar = (contenido) => crypto.createHmac('sha256', SECRET).update(contenido).digest('base64url');

const crearTokenSesion = (usuario) => {
    const carga = {
        sub: Number(usuario.id_usuario),
        rol: String(usuario.rol),
        exp: Math.floor(Date.now() / 1000) + 28800
    };
    const cuerpo = Buffer.from(JSON.stringify(carga)).toString('base64url');
    return `${cuerpo}.${firmar(cuerpo)}`;
};

const verificarTokenSesion = (token) => {
    if (typeof token !== 'string' || !token.includes('.')) return null;
    const [cuerpo, firmaRecibida] = token.split('.');
    if (firmar(cuerpo) !== firmaRecibida) return null;
    try {
        const carga = JSON.parse(Buffer.from(cuerpo, 'base64url').toString('utf8'));
        if (carga.exp <= Math.floor(Date.now() / 1000)) return null;
        return carga;
    } catch {
        return null;
    }
};

// MODIFICADO: Ahora lee el token desde las cookies
const autenticar = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie || '';
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=').map(c => c.trim());
            if (key) acc[key] = value;
            return acc;
        }, {});

        const token = cookies['plataforma_sesion'];
        const carga = verificarTokenSesion(token);
        
        if (!carga) return res.status(401).json({ error: 'Debes iniciar sesión o el token expiró.' });

        const [filas] = await pool.query(
            'SELECT id_usuario, nombre, apellido, correo, especialidad, rol, activo FROM usuarios WHERE id_usuario = ? AND activo = 1', 
            [carga.sub]
        );

        if (filas.length === 0) return res.status(401).json({ error: 'Usuario no encontrado o inactivo.' });

        req.usuario = filas[0];
        next();
    } catch (error) {
        res.status(500).json({ error: 'No fue posible validar la sesión.' });
    }
};

const requerirAdministrador = (req, res, next) => {
    if (req.usuario.rol !== 'Administrador') {
        return res.status(403).json({ error: 'Requiere permisos de administrador.' });
    }
    next();
};

module.exports = {
    crearHashContrasena,
    verificarContrasena,
    crearTokenSesion,
    autenticar,
    requerirAdministrador
};