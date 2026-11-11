const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del "transporte" usando Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Función reutilizable para enviar correos
const enviarCorreo = async (destinatario, asunto, html, attachments = []) => {
    try {
        const info = await transporter.sendMail({
            from: `"Gestión de Proyectos" <${process.env.EMAIL_USER}>`, // Remitente
            to: destinatario, // A quién se lo envías
            subject: asunto, // Asunto
            html: html, // Cuerpo del correo en HTML
            attachments
        });
        console.log("Correo enviado: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error enviando el correo:", error);
        throw error;
    }
};

module.exports = { enviarCorreo };