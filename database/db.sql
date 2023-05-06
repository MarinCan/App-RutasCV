DROP DATABASE IF EXISTS app_rutas;
CREATE DATABASE app_rutas CHARSET utf8mb4;
USE app_rutas;

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
    longitud DOUBLE NOT NULL
);

-- TABLA USUARIOS
CREATE TABLE usuarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    color_icono VARCHAR(10) NOT NULL
);

-- TABLA COMENTARIOS
CREATE TABLE comentarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNSIGNED,
    id_ruta INT UNSIGNED,
    comentario text NOT NULL,
    puntuacion INT UNSIGNED,
    publicado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY(id_usuario) REFERENCES usuarios(id),
    CONSTRAINT fk_ruta FOREIGN KEY(id_ruta) REFERENCES rutas(id)
);

-- TABLA RUTAS FAVORITAS
CREATE TABLE rutas_favs(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNSIGNED,
    id_ruta INT UNSIGNED,
    CONSTRAINT fk_usuario_fav FOREIGN KEY(id_usuario) REFERENCES usuarios(id),
    CONSTRAINT fk_ruta_fav FOREIGN KEY(id_ruta) REFERENCES rutas(id)
);
