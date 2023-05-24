DROP DATABASE IF EXISTS app_rutas2;
CREATE DATABASE app_rutas2 CHARSET utf8mb4;
USE app_rutas2;

-- TABLA RUTAS
CREATE TABLE rutas(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_ruta VARCHAR(255) NOT NULL,
    parque_natural VARCHAR(255) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    distancia DOUBLE NOT NULL,
    dificultad VARCHAR(50) NOT NULL,
    duracion VARCHAR(50) NOT NULL,
    gpx_file VARCHAR(100) NOT NULL,
    latitud DOUBLE NOT NULL,
    longitud DOUBLE NOT NULL,
    votos INT NOT NULL
);

-- TABLA IMG RUTAS
CREATE TABLE img_rutas(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ruta INT UNSIGNED,
    url_imagen text NOT NULL,
    atribucion text NOT NULL,
    CONSTRAINT fk_ruta_img FOREIGN KEY(id_ruta) REFERENCES rutas(id)
);

-- TABLA COMENTARIOS
CREATE TABLE comentarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ruta INT UNSIGNED,
    nombre_completo VARCHAR(255) NOT NULL,
    comentario text NOT NULL,
    publicado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ruta FOREIGN KEY(id_ruta) REFERENCES rutas(id)
);

