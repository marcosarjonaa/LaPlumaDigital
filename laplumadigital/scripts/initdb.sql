CREATE DATABASE IF NOT EXISTS LaPlumaDigital;

use LaPlumaDigital;

CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(30) NOT NULL UNIQUE,
    Nombre VARCHAR(100) NOT NULL,
    Foto VARCHAR(255),
    Descripcion VARCHAR(255),
    Permitido BOOLEAN NOT NULL,
    Tipo ENUM('Admin','Modder','Usuario')
);

CREATE TABLE IF NOT EXISTS UyP(
    idUsuario INT,
    Email VARCHAR(255) NOT NULL UNIQUE,
    `Password` VARCHAR(255) NOT NULL ,
    CONSTRAINT Fk_UyP FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT Pk_UyP PRIMARY KEY (idUsuario)
);

CREATE TABLE IF NOT EXISTS Autores (
    idAutor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    FechaNac DATE NOT NULL,
    FechaFal DATE,
    Foto VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Libros (
    idLibro INT AUTO_INCREMENT PRIMARY KEY,
    idAutor INT,
    Titulo VARCHAR(50) NOT NULL,
    Sinapsis VARCHAR(250) NOT NULL,
    Paginas INT NOT NULL,
    Fecha DATE NOT NULL,
    Foto VARCHAR(255),
    CONSTRAINT FK_ALibros FOREIGN KEY (idAutor) REFERENCES Autores(idAutor)
);

CREATE TABLE IF NOT EXISTS Publicaciones(
    idPublicaciones INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idLibro INT,
    Titulo VARCHAR(50) NOT NULL,
    Contenido VARCHAR(255) NOT NULL,
    Foto VARCHAR(255),
    Likes INT NOT NULL,
    CONSTRAINT FK_UPublicaciones FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT FK_LPublicaciones FOREIGN KEY (idLibro) REFERENCES Libros(idLibro)
);
