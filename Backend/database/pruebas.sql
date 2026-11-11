-- ============================================================
-- PLATAFORMA DE GESTIÓN DE PROYECTOS
-- Base de datos definitiva compatible con Backend v8.3.2
-- Requiere MySQL 8.0+
-- ============================================================

DROP DATABASE IF EXISTS gestion_proyectos;

CREATE DATABASE gestion_proyectos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE gestion_proyectos;


-- ============================================================
-- 1. USUARIOS
-- ============================================================

CREATE TABLE usuarios (
    id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(120) NOT NULL,
    apellido VARCHAR(160) NOT NULL,

    nombre_completo VARCHAR(300)
        GENERATED ALWAYS AS (
            TRIM(CONCAT_WS(' ', nombre, apellido))
        ) STORED,

    correo VARCHAR(180) NOT NULL,
    especialidad VARCHAR(200) NOT NULL DEFAULT '',

    rol ENUM(
        'Administrador',
        'Investigador'
    ) NOT NULL DEFAULT 'Investigador',

    activo TINYINT NOT NULL DEFAULT 1,

    password_hash VARCHAR(255) NOT NULL,

    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_usuarios_nombre
        CHECK (CHAR_LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT chk_usuarios_apellido
        CHECK (CHAR_LENGTH(TRIM(apellido)) > 0),

    CONSTRAINT chk_usuarios_correo
        CHECK (CHAR_LENGTH(TRIM(correo)) > 0),

    UNIQUE KEY uq_usuarios_correo (correo),

    KEY idx_usuarios_nombre_completo (nombre_completo),
    KEY idx_usuarios_rol_activo (rol, activo)
) ENGINE = InnoDB;


-- ============================================================
-- 2. TOKENS DE RECUPERACIÓN DE CONTRASEÑA
-- ============================================================

CREATE TABLE tokens_recuperacion_password (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    id_usuario INT UNSIGNED NOT NULL,

    token_hash CHAR(64)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,

    expira_en DATETIME NOT NULL,

    usado_en DATETIME NULL,

    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_token_recuperacion_hash (token_hash),

    KEY idx_tokens_usuario (id_usuario),
    KEY idx_tokens_expiracion (expira_en),

    CONSTRAINT fk_tokens_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE = InnoDB;


-- ============================================================
-- 3. ESTADOS DE PROYECTO
-- ============================================================

CREATE TABLE estados_proyecto (
    id TINYINT UNSIGNED PRIMARY KEY,

    nombre VARCHAR(50) NOT NULL,

    descripcion VARCHAR(255) NULL,

    activo TINYINT NOT NULL DEFAULT 1,

    UNIQUE KEY uq_estados_proyecto_nombre (nombre)
) ENGINE = InnoDB;


-- ============================================================
-- 4. CONVOCATORIAS
-- ============================================================

CREATE TABLE convocatoria (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    fecha_inicio DATE NULL,
    fecha_fin DATE NULL,

    activo TINYINT NOT NULL DEFAULT 1,

    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_convocatoria_nombre
        CHECK (CHAR_LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT chk_convocatoria_fechas
        CHECK (
            fecha_inicio IS NULL
            OR fecha_fin IS NULL
            OR fecha_fin >= fecha_inicio
        ),

    UNIQUE KEY uq_convocatoria_nombre (nombre),

    KEY idx_convocatoria_activo (activo)
) ENGINE = InnoDB;


-- ============================================================
-- 5. PROYECTOS
-- ============================================================

CREATE TABLE proyectos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nombre_proyecto VARCHAR(255) NOT NULL,

    id_convocatoria INT UNSIGNED NOT NULL,

    id_estado TINYINT UNSIGNED NOT NULL DEFAULT 1,

    id_responsable INT UNSIGNED NOT NULL,

    periodo VARCHAR(100) NOT NULL,

    descripcion TEXT NULL,
    modalidad VARCHAR(120) NULL,
    sometido_at DATETIME NULL,
    estado_actualizado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    prioridad ENUM(
        'baja',
        'media',
        'alta',
        'urgente'
    ) NOT NULL DEFAULT 'media',

    fecha_inicio DATE NULL,
    fecha_fin_estimada DATE NULL,
    fecha_finalizacion DATE NULL,
    porcentaje_avance TINYINT UNSIGNED NOT NULL DEFAULT 0,
    activo TINYINT NOT NULL DEFAULT 1,

    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_proyectos_nombre
        CHECK (CHAR_LENGTH(TRIM(nombre_proyecto)) > 0),

    CONSTRAINT chk_proyectos_periodo
        CHECK (CHAR_LENGTH(TRIM(periodo)) > 0),

    CONSTRAINT chk_proyectos_avance
        CHECK (porcentaje_avance >= 0 AND porcentaje_avance <= 100),

    CONSTRAINT chk_proyectos_fechas
        CHECK (
            fecha_inicio IS NULL
            OR fecha_fin_estimada IS NULL
            OR fecha_fin_estimada >= fecha_inicio
        ),

    KEY idx_proyectos_convocatoria (id_convocatoria),
    KEY idx_proyectos_estado (id_estado),
    KEY idx_proyectos_responsable (id_responsable),
    KEY idx_proyectos_activo (activo),
    KEY idx_proyectos_sometido (sometido_at),
    KEY idx_proyectos_actualizacion (fecha_actualizacion),

    CONSTRAINT fk_proyectos_convocatoria
        FOREIGN KEY (id_convocatoria)
        REFERENCES convocatoria(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_proyectos_estado
        FOREIGN KEY (id_estado)
        REFERENCES estados_proyecto(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_proyectos_responsable
        FOREIGN KEY (id_responsable)
        REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE = InnoDB;


-- ============================================================
-- 6. COLABORADORES
-- ============================================================

CREATE TABLE colaboradores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    id_proyecto INT UNSIGNED NOT NULL,

    id_usuario INT UNSIGNED NULL,

    nombre_externo VARCHAR(200) NULL,

    correo_externo VARCHAR(180) NULL,

    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_colaborador_origen
        CHECK (
            (
                id_usuario IS NOT NULL
                AND nombre_externo IS NULL
                AND correo_externo IS NULL
            )
            OR
            (
                id_usuario IS NULL
                AND (
                    NULLIF(TRIM(nombre_externo), '') IS NOT NULL
                    OR NULLIF(TRIM(correo_externo), '') IS NOT NULL
                )
            )
        ),

    UNIQUE KEY uq_colaborador_usuario_proyecto (
        id_proyecto,
        id_usuario
    ),

    KEY idx_colaboradores_proyecto (id_proyecto),
    KEY idx_colaboradores_usuario (id_usuario),
    KEY idx_colaboradores_correo_externo (correo_externo),

    CONSTRAINT fk_colaboradores_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_colaboradores_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
) ENGINE = InnoDB;


-- ============================================================
-- 7. RECURSOS HUMANOS
-- ============================================================

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

    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_recurso_participante
        CHECK (
            (
                id_usuario IS NOT NULL
                AND nombre_externo IS NULL
                AND correo_externo IS NULL
            )
            OR
            (
                id_usuario IS NULL
                AND (
                    NULLIF(TRIM(nombre_externo), '') IS NOT NULL
                    OR NULLIF(TRIM(correo_externo), '') IS NOT NULL
                )
            )
        ),

    CONSTRAINT chk_recurso_tipo
        CHECK (CHAR_LENGTH(TRIM(tipo)) > 0),

    CONSTRAINT chk_recurso_actividad
        CHECK (CHAR_LENGTH(TRIM(nombre_actividad)) > 0),

    CONSTRAINT chk_recurso_periodo
        CHECK (CHAR_LENGTH(TRIM(periodo)) > 0),

    KEY idx_recursos_proyecto (id_proyecto),
    KEY idx_recursos_usuario (id_usuario),
    KEY idx_recursos_tipo (tipo),
    KEY idx_recursos_correo_externo (correo_externo),

    CONSTRAINT fk_recursos_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_recursos_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
) ENGINE = InnoDB;


-- ============================================================
-- 8. PRODUCTOS ACADÉMICOS
-- ============================================================

CREATE TABLE productos_academicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    id_proyecto INT UNSIGNED NOT NULL,

    tipo VARCHAR(100) NOT NULL,

    nombre_producto VARCHAR(255) NOT NULL,

    lugar VARCHAR(255) NULL,

    fecha_envio DATE NULL,

    fecha_publicacion DATE NULL,

    estado ENUM(
        'En preparación',
        'Enviado',
        'En revisión',
        'Aceptado',
        'Publicado',
        'Rechazado'
    ) NOT NULL DEFAULT 'En preparación',

    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_producto_tipo
        CHECK (CHAR_LENGTH(TRIM(tipo)) > 0),

    CONSTRAINT chk_producto_nombre
        CHECK (CHAR_LENGTH(TRIM(nombre_producto)) > 0),

    CONSTRAINT chk_producto_fechas
        CHECK (
            fecha_envio IS NULL
            OR fecha_publicacion IS NULL
            OR fecha_publicacion >= fecha_envio
        ),

    KEY idx_productos_proyecto (id_proyecto),
    KEY idx_productos_tipo (tipo),
    KEY idx_productos_estado (estado),

    CONSTRAINT fk_productos_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE = InnoDB;


-- ============================================================
-- 9. HISTORIAL DE ESTADOS / DICTAMENES
-- ============================================================

CREATE TABLE historial_estados (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    id_proyecto INT UNSIGNED NOT NULL,
    estado_anterior_id TINYINT UNSIGNED NULL,
    estado_nuevo_id TINYINT UNSIGNED NOT NULL,
    id_usuario INT UNSIGNED NULL,
    comentario VARCHAR(500) NULL,
    fecha_cambio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    KEY idx_historial_proyecto_fecha (id_proyecto, fecha_cambio),
    KEY idx_historial_usuario (id_usuario),
    KEY idx_historial_estado_nuevo (estado_nuevo_id),

    CONSTRAINT fk_historial_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_historial_estado_anterior
        FOREIGN KEY (estado_anterior_id)
        REFERENCES estados_proyecto(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_historial_estado_nuevo
        FOREIGN KEY (estado_nuevo_id)
        REFERENCES estados_proyecto(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_historial_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
) ENGINE = InnoDB;


-- ============================================================
-- 10. CATEGORIAS DE ENTREGABLES
-- ============================================================

CREATE TABLE categorias_entregables (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(220) NOT NULL,
    descripcion VARCHAR(500) NULL,
    orden INT UNSIGNED NOT NULL DEFAULT 0,
    activo TINYINT NOT NULL DEFAULT 1,

    UNIQUE KEY uq_categorias_entregables_nombre (nombre),
    KEY idx_categorias_entregables_orden (orden, activo)
) ENGINE = InnoDB;


-- ============================================================
-- 11. TIPOS DE ENTREGABLE
-- ============================================================

CREATE TABLE tipos_entregable (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT UNSIGNED NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(500) NULL,
    orden INT UNSIGNED NOT NULL DEFAULT 0,
    activo TINYINT NOT NULL DEFAULT 1,

    UNIQUE KEY uq_tipo_entregable_categoria_nombre (categoria_id, nombre),
    KEY idx_tipos_entregable_categoria (categoria_id, orden, activo),

    CONSTRAINT fk_tipos_entregable_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias_entregables(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE = InnoDB;


-- ============================================================
-- 12. ENTREGABLES COMPROMETIDOS POR PROYECTO
-- ============================================================

CREATE TABLE proyecto_entregables (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT UNSIGNED NOT NULL,
    tipo_entregable_id INT UNSIGNED NOT NULL,
    cantidad_comprometida INT UNSIGNED NOT NULL DEFAULT 1,
    cantidad_entregada INT UNSIGNED NOT NULL DEFAULT 0,
    observaciones VARCHAR(500) NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_entregables_cantidades
        CHECK (cantidad_comprometida >= 0 AND cantidad_entregada >= 0),

    UNIQUE KEY uq_proyecto_tipo_entregable (id_proyecto, tipo_entregable_id),
    KEY idx_proyecto_entregables_proyecto (id_proyecto),
    KEY idx_proyecto_entregables_tipo (tipo_entregable_id),

    CONSTRAINT fk_proyecto_entregables_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_proyecto_entregables_tipo
        FOREIGN KEY (tipo_entregable_id)
        REFERENCES tipos_entregable(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE = InnoDB;


-- ============================================================
-- 13. ARCHIVOS
-- ============================================================

CREATE TABLE archivos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT UNSIGNED NOT NULL,
    id_proyecto_entregable INT UNSIGNED NULL,
    id_usuario INT UNSIGNED NOT NULL,
    nombre_original VARCHAR(255) NOT NULL,
    nombre_guardado VARCHAR(255) NOT NULL,
    ruta VARCHAR(600) NOT NULL,
    extension VARCHAR(30) NULL,
    tipo_mime VARCHAR(120) NULL,
    tamano BIGINT UNSIGNED NULL,
    descripcion VARCHAR(500) NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    KEY idx_archivos_proyecto (id_proyecto),
    KEY idx_archivos_entregable (id_proyecto_entregable),
    KEY idx_archivos_usuario (id_usuario),

    CONSTRAINT fk_archivos_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_archivos_entregable
        FOREIGN KEY (id_proyecto_entregable)
        REFERENCES proyecto_entregables(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_archivos_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
) ENGINE = InnoDB;


-- ============================================================
-- 14. REPORTES GENERADOS
-- ============================================================

CREATE TABLE reportes_generados (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(180) NOT NULL,

    tipo ENUM(
        'proyectos',
        'entregables'
    ) NOT NULL DEFAULT 'proyectos',

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
-- 15. VISTAS DEL SISTEMA
-- ============================================================

CREATE VIEW vista_proyectos AS
SELECT
    p.id,
    p.nombre_proyecto,
    p.id_convocatoria,
    c.nombre AS convocatoria_nombre,
    p.id_estado,
    e.nombre AS estado_nombre,
    p.id_responsable,
    u.nombre AS responsable_nombre,
    u.apellido AS responsable_apellido,
    u.nombre_completo AS responsable,
    u.correo AS responsable_correo,
    p.periodo,
    p.descripcion,
    p.modalidad,
    p.sometido_at,
    p.estado_actualizado_at AS dictamen_at,
    p.prioridad,
    p.fecha_inicio,
    p.fecha_fin_estimada,
    p.fecha_finalizacion,
    p.porcentaje_avance,
    p.activo,
    p.fecha_creacion,
    p.fecha_actualizacion
FROM proyectos p
INNER JOIN convocatoria c
    ON c.id = p.id_convocatoria
INNER JOIN estados_proyecto e
    ON e.id = p.id_estado
INNER JOIN usuarios u
    ON u.id_usuario = p.id_responsable;


CREATE VIEW vista_colaboradores AS
SELECT
    col.id,
    col.id_proyecto,
    col.id_usuario,
    CASE
        WHEN col.id_usuario IS NOT NULL
            THEN u.nombre_completo
        ELSE COALESCE(
            NULLIF(TRIM(col.nombre_externo), ''),
            NULLIF(TRIM(col.correo_externo), '')
        )
    END AS nombre_colaborador,
    CASE
        WHEN col.id_usuario IS NOT NULL
            THEN u.correo
        ELSE col.correo_externo
    END AS correo,
    CASE
        WHEN col.id_usuario IS NOT NULL
            THEN 'Registrado'
        ELSE 'Externo'
    END AS origen,
    col.fecha_creacion,
    col.fecha_actualizacion
FROM colaboradores col
LEFT JOIN usuarios u
    ON u.id_usuario = col.id_usuario;


CREATE VIEW vista_recursos_humanos AS
SELECT
    rh.id,
    rh.id_proyecto,
    rh.id_usuario,
    CASE
        WHEN rh.id_usuario IS NOT NULL
            THEN u.nombre_completo
        ELSE COALESCE(
            NULLIF(TRIM(rh.nombre_externo), ''),
            NULLIF(TRIM(rh.correo_externo), '')
        )
    END AS nombre_participante,
    CASE
        WHEN rh.id_usuario IS NOT NULL
            THEN u.correo
        ELSE rh.correo_externo
    END AS correo,
    CASE
        WHEN rh.id_usuario IS NOT NULL
            THEN 'Registrado'
        ELSE 'Externo'
    END AS origen,
    rh.tipo,
    rh.nombre_actividad,
    rh.periodo,
    rh.fecha_creacion,
    rh.fecha_actualizacion
FROM recursos_humanos rh
LEFT JOIN usuarios u
    ON u.id_usuario = rh.id_usuario;


CREATE VIEW vista_productos_academicos AS
SELECT
    pa.id,
    pa.id_proyecto,
    pa.tipo,
    pa.nombre_producto,
    pa.lugar,
    pa.fecha_envio,
    pa.fecha_publicacion,
    pa.estado,
    pa.fecha_creacion,
    pa.fecha_actualizacion
FROM productos_academicos pa;


CREATE VIEW vista_entregables_proyecto AS
SELECT
    pe.id,
    pe.id_proyecto,
    ce.id AS categoria_id,
    ce.nombre AS categoria,
    te.id AS tipo_entregable_id,
    te.nombre AS tipo_entregable,
    pe.cantidad_comprometida,
    pe.cantidad_entregada,
    pe.observaciones,
    pe.fecha_creacion,
    pe.fecha_actualizacion
FROM proyecto_entregables pe
INNER JOIN tipos_entregable te
    ON te.id = pe.tipo_entregable_id
INNER JOIN categorias_entregables ce
    ON ce.id = te.categoria_id;


CREATE VIEW vista_historial_estados AS
SELECT
    he.id,
    he.id_proyecto,
    he.estado_anterior_id,
    ea.nombre AS estado_anterior,
    he.estado_nuevo_id,
    enuevo.nombre AS estado_nuevo,
    he.id_usuario,
    u.nombre_completo AS usuario,
    he.comentario,
    he.fecha_cambio
FROM historial_estados he
LEFT JOIN estados_proyecto ea
    ON ea.id = he.estado_anterior_id
INNER JOIN estados_proyecto enuevo
    ON enuevo.id = he.estado_nuevo_id
LEFT JOIN usuarios u
    ON u.id_usuario = he.id_usuario;


-- ============================================================
-- 16. DATOS INICIALES
-- ============================================================

INSERT INTO estados_proyecto
    (id, nombre, descripcion, activo)
VALUES
    (1, 'En captura', 'Proyecto registrado y todavía en proceso de captura.', 1),
    (2, 'Sometido', 'Proyecto enviado a la convocatoria correspondiente.', 1),
    (3, 'Con registro', 'Proyecto que ya cuenta con registro institucional.', 1),
    (4, 'Financiado', 'Proyecto aprobado con financiamiento.', 1),
    (5, 'Rechazado', 'Proyecto que no fue aprobado.', 1),
    (6, 'Informe pendiente', 'Proyecto con un informe todavía pendiente de entrega.', 1),
    (7, 'Informe en deuda', 'Proyecto con un informe vencido o en deuda.', 1),
    (8, 'Liberado', 'Proyecto concluido y liberado.', 1);


INSERT INTO categorias_entregables
    (id, nombre, descripcion, orden, activo)
VALUES
    (1, 'Contribución a la formación de recursos humanos', 'Productos relacionados con formación de estudiantes y recursos humanos.', 1, 1),
    (2, 'Productividad académica', 'Productos relacionados con publicaciones y producción académica.', 2, 1),
    (3, 'Transferencia tecnológica', 'Productos relacionados con transferencia, registro y desarrollo tecnológico.', 3, 1);


INSERT INTO tipos_entregable
    (categoria_id, nombre, descripcion, orden, activo)
VALUES
    (1, 'Incorporación de alumnos de licenciatura', 'Servicio Social, créditos complementarios u otras modalidades equivalentes.', 1, 1),
    (1, 'Alumnos residentes participantes en el proyecto', NULL, 2, 1),
    (2, 'Artículos de divulgación enviados', NULL, 1, 1),
    (3, 'Registro de Software (INDAUTOR)', NULL, 1, 1),
    (3, 'Reportes de investigación', NULL, 2, 1);


-- ============================================================
-- 17. ADMINISTRADOR INICIAL PARA DESARROLLO
-- ============================================================

INSERT INTO usuarios (
    nombre,
    apellido,
    correo,
    especialidad,
    rol,
    activo,
    password_hash
)
VALUES (
    'Administrador',
    'Principal',
    'adminproyectositver@gmail.com',
    'Sistemas Computacionales',
    'Administrador',
    1,
    'scrypt$jb-vSAasRExjkfp2Y2An_g$uXwkQmsoYuaq4vuSKnedVNosYhin2xjRs_XwsHZ_gYd5v2BQcBC9YM_fjxYP9Ndzs-_rB4hpQvsIfvj74fEDMw'
);


-- ============================================================
-- 18. COMPROBACIONES
-- ============================================================

SELECT id, nombre, activo FROM estados_proyecto ORDER BY id;

SELECT id_usuario, nombre, apellido, nombre_completo, correo, rol, activo FROM usuarios;