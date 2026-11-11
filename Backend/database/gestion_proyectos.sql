-- ============================================================
-- SCRIPT CORREGIDO: CREACIÓN DE LA BASE DE DATOS DESDE CERO
-- ============================================================
CREATE DATABASE gestion_proyectos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestion_proyectos;

-- ============================================================
-- 1. USUARIOS Y TOKENS
-- ============================================================
CREATE TABLE usuarios (
    id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    apellido VARCHAR(160) NOT NULL,
    nombre_completo VARCHAR(300) GENERATED ALWAYS AS (TRIM(CONCAT_WS(' ', nombre, apellido))) STORED,
    correo VARCHAR(180) NOT NULL,
    especialidad VARCHAR(200) NOT NULL DEFAULT '',
    rol ENUM('Administrador', 'Investigador') NOT NULL DEFAULT 'Investigador',
    activo TINYINT(1) NOT NULL DEFAULT 1,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_usuarios_nombre CHECK (CHAR_LENGTH(TRIM(nombre)) > 0),
    CONSTRAINT chk_usuarios_apellido CHECK (CHAR_LENGTH(TRIM(apellido)) > 0),
    CONSTRAINT chk_usuarios_correo CHECK (CHAR_LENGTH(TRIM(correo)) > 0),
    UNIQUE KEY uq_usuarios_correo (correo),
    KEY idx_usuarios_nombre_completo (nombre_completo),
    KEY idx_usuarios_rol_activo (rol, activo)
) ENGINE = InnoDB;

CREATE TABLE tokens_recuperacion_password (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNSIGNED NOT NULL,
    token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    expira_en DATETIME NOT NULL,
    usado_en DATETIME NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_token_recuperacion_hash (token_hash),
    CONSTRAINT fk_tokens_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB;

-- ============================================================
-- 2. CATÁLOGOS
-- ============================================================
CREATE TABLE estados_proyecto (
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    UNIQUE KEY uq_estados_proyecto_nombre (nombre)
) ENGINE = InnoDB;

CREATE TABLE convocatoria (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    fecha_inicio DATE NULL,
    fecha_fin DATE NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_convocatoria_fechas CHECK (fecha_inicio IS NULL OR fecha_fin IS NULL OR fecha_fin >= fecha_inicio),
    UNIQUE KEY uq_convocatoria_nombre (nombre)
) ENGINE = InnoDB;

-- ============================================================
-- 3. TRANSACCIONALES (PROYECTOS Y DEPENDENCIAS)
-- ============================================================
CREATE TABLE proyectos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_proyecto VARCHAR(255) NOT NULL,
    id_convocatoria INT UNSIGNED NOT NULL,
    id_estado TINYINT UNSIGNED NOT NULL DEFAULT 1,
    id_responsable INT UNSIGNED NOT NULL,
    periodo VARCHAR(100) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_proyectos_convocatoria FOREIGN KEY (id_convocatoria) REFERENCES convocatoria(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_proyectos_estado FOREIGN KEY (id_estado) REFERENCES estados_proyecto(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_proyectos_responsable FOREIGN KEY (id_responsable) REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE colaboradores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT UNSIGNED NOT NULL,
    id_usuario INT UNSIGNED NULL,
    nombre_externo VARCHAR(200) NULL,
    correo_externo VARCHAR(180) NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_colaborador_usuario_proyecto (id_proyecto, id_usuario),
    CONSTRAINT fk_colaboradores_proyecto FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_colaboradores_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE recursos_humanos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT UNSIGNED NOT NULL,
    id_usuario INT UNSIGNED NULL,
    nombre_externo VARCHAR(200) NULL,
    correo_externo VARCHAR(180) NULL,
    tipo VARCHAR(100) NOT NULL,
    nombre_actividad VARCHAR(255) NOT NULL,
    periodo VARCHAR(100) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_recursos_proyecto FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_recursos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB;

CREATE TABLE productos_academicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT UNSIGNED NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    nombre_producto VARCHAR(255) NOT NULL,
    lugar VARCHAR(255) NULL,
    fecha_envio DATE NULL,
    fecha_publicacion DATE NULL,
    estado ENUM('En preparación', 'Enviado', 'En revisión', 'Aceptado', 'Publicado', 'Rechazado') NOT NULL DEFAULT 'En preparación',
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_producto_fechas CHECK (fecha_envio IS NULL OR fecha_publicacion IS NULL OR fecha_publicacion >= fecha_envio),
    CONSTRAINT fk_productos_proyecto FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB;


-- ============================================================
-- 4. Reportes generado (PROYECTOS)
-- ============================================================
CREATE TABLE reportes_generados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(180) NOT NULL,
    tipo ENUM('proyectos', 'entregables') NOT NULL DEFAULT 'proyectos',
    filtros_json JSON NOT NULL,
    contenido_json JSON NOT NULL,
    total_registros INT UNSIGNED NOT NULL DEFAULT 0,
    generado_por INT UNSIGNED NOT NULL,
    fecha_generacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    KEY idx_reportes_fecha (fecha_generacion),
    KEY idx_reportes_generado_por (generado_por),

    CONSTRAINT fk_reportes_generado_por
        FOREIGN KEY (generado_por)
        REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE = InnoDB;


-- ============================================================
-- 4. VISTAS
-- ============================================================
CREATE VIEW vista_proyectos AS
SELECT p.id, p.nombre_proyecto, p.id_convocatoria, c.nombre AS convocatoria_nombre, p.id_estado, e.nombre AS estado_nombre, p.id_responsable, u.nombre AS responsable_nombre, u.apellido AS responsable_apellido, u.nombre_completo AS responsable, u.correo AS responsable_correo, p.periodo, p.fecha_creacion, p.fecha_actualizacion
FROM proyectos p
INNER JOIN convocatoria c ON c.id = p.id_convocatoria
INNER JOIN estados_proyecto e ON e.id = p.id_estado
INNER JOIN usuarios u ON u.id_usuario = p.id_responsable;

CREATE VIEW vista_colaboradores AS
SELECT col.id, col.id_proyecto, col.id_usuario,
    CASE WHEN col.id_usuario IS NOT NULL THEN u.nombre_completo ELSE COALESCE(NULLIF(TRIM(col.nombre_externo), ''), NULLIF(TRIM(col.correo_externo), '')) END AS nombre_colaborador,
    CASE WHEN col.id_usuario IS NOT NULL THEN u.correo ELSE col.correo_externo END AS correo,
    CASE WHEN col.id_usuario IS NOT NULL THEN 'Registrado' ELSE 'Externo' END AS origen, col.fecha_creacion, col.fecha_actualizacion
FROM colaboradores col LEFT JOIN usuarios u ON u.id_usuario = col.id_usuario;

CREATE VIEW vista_recursos_humanos AS
SELECT rh.id, rh.id_proyecto, rh.id_usuario,
    CASE WHEN rh.id_usuario IS NOT NULL THEN u.nombre_completo ELSE COALESCE(NULLIF(TRIM(rh.nombre_externo), ''), NULLIF(TRIM(rh.correo_externo), '')) END AS nombre_participante,
    CASE WHEN rh.id_usuario IS NOT NULL THEN u.correo ELSE rh.correo_externo END AS correo,
    CASE WHEN rh.id_usuario IS NOT NULL THEN 'Registrado' ELSE 'Externo' END AS origen, rh.tipo, rh.nombre_actividad, rh.periodo, rh.fecha_creacion, rh.fecha_actualizacion
FROM recursos_humanos rh LEFT JOIN usuarios u ON u.id_usuario = rh.id_usuario;

CREATE VIEW vista_productos_academicos AS
SELECT pa.id, pa.id_proyecto, pa.tipo, pa.nombre_producto, pa.lugar, pa.fecha_envio, pa.fecha_publicacion, pa.estado, pa.fecha_creacion, pa.fecha_actualizacion
FROM productos_academicos pa;

-- ============================================================
-- 5. TRIGGERS
-- ============================================================
DELIMITER $$
CREATE TRIGGER trg_colaboradores_ai AFTER INSERT ON colaboradores FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = NEW.id_proyecto; END$$
CREATE TRIGGER trg_colaboradores_au AFTER UPDATE ON colaboradores FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = NEW.id_proyecto; IF OLD.id_proyecto <> NEW.id_proyecto THEN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = OLD.id_proyecto; END IF; END$$
CREATE TRIGGER trg_colaboradores_ad AFTER DELETE ON colaboradores FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = OLD.id_proyecto; END$$

CREATE TRIGGER trg_recursos_humanos_ai AFTER INSERT ON recursos_humanos FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = NEW.id_proyecto; END$$
CREATE TRIGGER trg_recursos_humanos_au AFTER UPDATE ON recursos_humanos FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = NEW.id_proyecto; IF OLD.id_proyecto <> NEW.id_proyecto THEN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = OLD.id_proyecto; END IF; END$$
CREATE TRIGGER trg_recursos_humanos_ad AFTER DELETE ON recursos_humanos FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = OLD.id_proyecto; END$$

CREATE TRIGGER trg_productos_ai AFTER INSERT ON productos_academicos FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = NEW.id_proyecto; END$$
CREATE TRIGGER trg_productos_au AFTER UPDATE ON productos_academicos FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = NEW.id_proyecto; IF OLD.id_proyecto <> NEW.id_proyecto THEN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = OLD.id_proyecto; END IF; END$$
CREATE TRIGGER trg_productos_ad AFTER DELETE ON productos_academicos FOR EACH ROW BEGIN UPDATE proyectos SET fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = OLD.id_proyecto; END$$
DELIMITER ;

-- ============================================================
-- 6. SEMILLAS (DATOS INICIALES)
-- ============================================================
INSERT INTO estados_proyecto (id, nombre, descripcion, activo) VALUES 
(1, 'En captura', 'Proyecto registrado y todavía en proceso de captura.', 1),
(2, 'Sometido', 'Proyecto enviado a la convocatoria correspondiente.', 1),
(3, 'Con registro', 'Proyecto que ya cuenta con registro institucional.', 1),
(4, 'Financiado', 'Proyecto aprobado con financiamiento.', 1),
(5, 'Rechazado', 'Proyecto que no fue aprobado.', 1),
(6, 'Informe pendiente', 'Proyecto con un informe todavía pendiente de entrega.', 1),
(7, 'Informe en deuda', 'Proyecto con un informe vencido o en deuda.', 1),
(8, 'Liberado', 'Proyecto concluido y liberado.', 1);


-- Correo: admproyectositver@gmail.com
-- Contraseña: admin
INSERT INTO usuarios (nombre, apellido, correo, especialidad, rol, activo, password_hash)
VALUES ('Administrador', 'Local', 'admproyectositver@gmail.com', 'Sistemas Computacionales', 'Administrador', 1, 'scrypt$RNxdeiaN0NA-fVOS_fzNUQ$CaDAa1AVZ2sEYNe_M58peRmeHY5e2yALqbZ1t-6BNXZ75EEul8cchCp3qKEhrYAyyr-mHieGVPAFNaf-NGAiNw');