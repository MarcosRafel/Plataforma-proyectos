-- =====================================================================
-- DATOS DE PRUEBA - ADAPTADOS EXACTAMENTE A TU BD v8 ACTUAL
-- Genera 30 proyectos (10 para IDs: 3, 4 y 5) cruzados como colaboradores.
--Investigadores: Esteban (ID 3), Marcos (ID 4), Arnulfo (ID 5)
-- =====================================================================
USE gestion_proyectos;
SET NAMES utf8mb4;

-- 1) Secuencia temporal de 1 a 30 (10 proyectos por investigador)
DROP TEMPORARY TABLE IF EXISTS tmp_demo_seq;
CREATE TEMPORARY TABLE tmp_demo_seq (n INT UNSIGNED PRIMARY KEY) ENGINE=MEMORY;
INSERT INTO tmp_demo_seq(n) VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),
(21),(22),(23),(24),(25),(26),(27),(28),(29),(30);

START TRANSACTION;

-- 2) 4 convocatorias distribuidas para las pruebas
INSERT INTO convocatoria (nombre, fecha_inicio, fecha_fin, activo)
SELECT
 CONCAT('DEMO - Convocatoria ', ELT(s.n,
    'Investigacion Cientifica 2024', 'Innovacion Educativa 2025',
    'Desarrollo Tecnologico 2025', 'Proyectos Institucionales 2026')),
 DATE_ADD('2024-02-01', INTERVAL (s.n-1)*155 DAY),
 DATE_ADD('2024-04-15', INTERVAL (s.n-1)*155 DAY),
 1
FROM tmp_demo_seq s
WHERE s.n<=4
 AND NOT EXISTS (SELECT 1 FROM convocatoria c WHERE c.nombre = CONCAT('DEMO - Convocatoria ', ELT(s.n,
    'Investigacion Cientifica 2024', 'Innovacion Educativa 2025',
    'Desarrollo Tecnologico 2025', 'Proyectos Institucionales 2026')));

-- 3) 30 proyectos adaptados EXACTAMENTE a las columnas de tu tabla
INSERT INTO proyectos (
 nombre_proyecto, id_convocatoria, id_estado, id_responsable, periodo
)
SELECT
 CONCAT('[DEMO2026-',LPAD(s.n,3,'0'),'] ',ELT(MOD(s.n-1,10)+1,
 'Sistema de monitoreo ambiental', 'Plataforma de seguimiento academico',
 'Modelo predictivo de desercion escolar', 'Aplicacion de realidad aumentada',
 'Analisis de calidad de agua', 'Laboratorio de ciberseguridad',
 'Sistema de control de inventarios', 'Red de sensores IoT',
 'Asistente virtual universitario', 'Clasificacion automatica de documentos')),
 c.id,
 MOD(s.n-1,8)+1,
 CASE 
   WHEN s.n <= 10 THEN 3 -- Proyectos 1-10 para Esteban (ID 3)
   WHEN s.n <= 20 THEN 4 -- Proyectos 11-20 para Marcos (ID 4)
   ELSE 5                -- Proyectos 21-30 para Arnulfo (ID 5)
 END,
 CONCAT(YEAR(DATE_ADD('2024-01-15',INTERVAL (s.n-1)*15 DAY)), '-',
        ELT(MOD(s.n-1,3)+1,'Enero-Junio','Verano','Agosto-Diciembre'))
FROM tmp_demo_seq s
JOIN convocatoria c ON c.nombre = CONCAT('DEMO - Convocatoria ',ELT(MOD(s.n-1,4)+1,
    'Investigacion Cientifica 2024', 'Innovacion Educativa 2025',
    'Desarrollo Tecnologico 2025', 'Proyectos Institucionales 2026'))
WHERE NOT EXISTS (SELECT 1 FROM proyectos p
 WHERE p.nombre_proyecto LIKE CONCAT('[DEMO2026-',LPAD(s.n,3,'0'),'] %'));

-- Mapa temporal para relacionar los ID de proyectos insertados
DROP TEMPORARY TABLE IF EXISTS tmp_demo_map;
CREATE TEMPORARY TABLE tmp_demo_map (
 n INT UNSIGNED PRIMARY KEY, 
 id_proyecto INT UNSIGNED NOT NULL,
 id_responsable INT UNSIGNED NOT NULL, 
 id_estado TINYINT UNSIGNED NOT NULL,
 periodo VARCHAR(100) NOT NULL
) ENGINE=MEMORY;

INSERT INTO tmp_demo_map(n,id_proyecto,id_responsable,id_estado,periodo)
SELECT s.n, p.id, p.id_responsable, p.id_estado, p.periodo
FROM tmp_demo_seq s
JOIN proyectos p ON p.nombre_proyecto LIKE CONCAT('[DEMO2026-',LPAD(s.n,3,'0'),'] %');

-- 4) Colaboradores internos cruzados (colaboran en los de sus compañeros)
INSERT INTO colaboradores (id_proyecto, id_usuario)
SELECT m.id_proyecto, 
  CASE m.id_responsable
    WHEN 3 THEN ELT(k.n, 4, 5) -- En los de Esteban colaboran Marcos y Arnulfo
    WHEN 4 THEN ELT(k.n, 3, 5) -- En los de Marcos colaboran Esteban y Arnulfo
    WHEN 5 THEN ELT(k.n, 3, 4) -- En los de Arnulfo colaboran Esteban y Marcos
  END
FROM tmp_demo_map m
JOIN tmp_demo_seq k ON k.n <= 2
WHERE NOT EXISTS (
  SELECT 1 FROM colaboradores co 
  WHERE co.id_proyecto = m.id_proyecto 
    AND co.id_usuario = CASE m.id_responsable WHEN 3 THEN ELT(k.n, 4, 5) WHEN 4 THEN ELT(k.n, 3, 5) WHEN 5 THEN ELT(k.n, 3, 4) END
);

-- 5) Un colaborador externo ficticio por proyecto
INSERT INTO colaboradores (id_proyecto,nombre_externo,correo_externo)
SELECT m.id_proyecto, CONCAT('Colaborador Externo Demo ',LPAD(m.n,3,'0')),
 CONCAT('externo.',LPAD(m.n,3,'0'),'@example.com')
FROM tmp_demo_map m
WHERE NOT EXISTS (SELECT 1 FROM colaboradores co
 WHERE co.id_proyecto=m.id_proyecto AND co.correo_externo=CONCAT('externo.',LPAD(m.n,3,'0'),'@example.com'));

-- 6) Recursos humanos internos (cruzados)
INSERT INTO recursos_humanos
(id_proyecto,id_usuario,tipo,nombre_actividad,periodo)
SELECT m.id_proyecto,
  CASE m.id_responsable
    WHEN 3 THEN ELT(k.n, 4, 5)
    WHEN 4 THEN ELT(k.n, 3, 5)
    WHEN 5 THEN ELT(k.n, 3, 4)
  END,
 'Investigador colaborador',
 CONCAT('Analisis y prototipos - Demo ',LPAD(m.n,3,'0')),
 m.periodo
FROM tmp_demo_map m
JOIN tmp_demo_seq k ON k.n<=2
WHERE NOT EXISTS (
  SELECT 1 FROM recursos_humanos rh
  WHERE rh.id_proyecto = m.id_proyecto 
    AND rh.id_usuario = CASE m.id_responsable WHEN 3 THEN ELT(k.n, 4, 5) WHEN 4 THEN ELT(k.n, 3, 5) WHEN 5 THEN ELT(k.n, 3, 4) END
    AND rh.nombre_actividad LIKE CONCAT('% - Demo ',LPAD(m.n,3,'0'))
);

-- 7) Estudiante / Participante externo
INSERT INTO recursos_humanos
(id_proyecto,nombre_externo,correo_externo,tipo,nombre_actividad,periodo)
SELECT m.id_proyecto,CONCAT('Estudiante Demo ',LPAD(m.n,3,'0')),
 CONCAT('estudiante.',LPAD(m.n,3,'0'),'@example.com'),
 'Servicio social',
 CONCAT('Documentacion y datos - Demo ',LPAD(m.n,3,'0')),
 m.periodo
FROM tmp_demo_map m
WHERE NOT EXISTS (SELECT 1 FROM recursos_humanos rh
 WHERE rh.id_proyecto=m.id_proyecto AND rh.correo_externo=CONCAT('estudiante.',LPAD(m.n,3,'0'),'@example.com'));

-- 8) Productos academicos (2 por proyecto)
INSERT INTO productos_academicos
(id_proyecto,tipo,nombre_producto,lugar,fecha_envio,fecha_publicacion,estado)
SELECT m.id_proyecto,
 ELT(k.n,'Articulo cientifico','Ponencia'),
 CONCAT(ELT(k.n,'Articulo sobre resultados','Ponencia de avances'), ' - DEMO2026-',LPAD(m.n,3,'0')),
 'Veracruz, Mexico',
 DATE_ADD('2024-03-01', INTERVAL (m.n*10 + k.n*48) DAY),
 DATE_ADD('2024-03-01', INTERVAL (m.n*10 + k.n*48+45) DAY),
 ELT(MOD(m.n+k.n,5)+1,'En preparación','Enviado','En revisión','Aceptado','Publicado')
FROM tmp_demo_map m
JOIN tmp_demo_seq k ON k.n<=2
WHERE NOT EXISTS (SELECT 1 FROM productos_academicos pa
 WHERE pa.id_proyecto=m.id_proyecto AND pa.nombre_producto LIKE CONCAT('% - DEMO2026-',LPAD(m.n,3,'0')));

COMMIT;

-- Limpieza temporal
DROP TEMPORARY TABLE IF EXISTS tmp_demo_map;
DROP TEMPORARY TABLE IF EXISTS tmp_demo_seq;

-- Validar proyectos asignados
SELECT u.id_usuario, u.nombre, COUNT(p.id) AS total_proyectos_creados 
FROM usuarios u 
JOIN proyectos p ON p.id_responsable = u.id_usuario 
WHERE p.nombre_proyecto LIKE '[DEMO2026-%' 
GROUP BY u.id_usuario;