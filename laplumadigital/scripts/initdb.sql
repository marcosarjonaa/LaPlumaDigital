CREATE DATABASE IF NOT EXISTS LaPlumaDigital;

use LaPlumaDigital;

ALTER DATABASE LaPlumaDigital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

INSERT INTO Autores (Nombre, FechaNac, FechaFal, Foto) VALUES
('Gabriel Garcia Marquez', '1927-03-06', '2014-04-17', 'garcia_marquez.jpg'),
('Mario Vargas Llosa', '1936-03-28', NULL, 'vargas_llosa.jpg'),
('J.K. Rowling', '1965-07-31', NULL, 'jk_rowling.jpg'),
('Ernest Hemingway', '1899-07-21', '1961-07-02', 'hemingway.jpg'),
('Miguel de Cervantes', '1547-09-29', '1616-04-22', 'cervantes.jpg');

INSERT INTO Libros (idAutor, Titulo, Sinapsis, Paginas, Fecha, Foto) VALUES
(1, 'Cien años de soledad', 'La saga de la familia Buendía en el mítico Macondo.', 471, '1967-05-30', 'https://m.media-amazon.com/images/I/81foacR0CPL.jpg'),
(2, 'La ciudad y los perros', 'Una historia de corrupción y violencia en una escuela militar de Lima.', 378, '1963-01-01', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAhkNoZAu6orOUh71tzySkZ3pquAYfKNZhA&s'),
(3, 'Harry Potter y la piedra filosofal', 'El inicio de las aventuras mágicas de Harry Potter en Hogwarts.', 223, '1997-06-26', 'https://m.media-amazon.com/images/I/91R1AixEiLL._AC_UF894,1000_QL80_.jpg'),
(4, 'El viejo y el mar', 'Un pescador lucha contra un enorme pez en alta mar.', 127, '1952-09-01', 'https://cdn.zendalibros.com/wp-content/uploads/2024/07/el-viejo-y-el-mar-ernest-hemingway.webp'),
(5, 'Don Quijote de la Mancha', 'La clásica historia del hidalgo que lucha contra molinos de viento.', 863, '1605-01-16', 'https://images.cdn2.buscalibre.com/fit-in/360x360/c0/63/c0633c2d4dd430b32d5e02475461f030.jpg'),
(1, 'El amor en los tiempos del cólera', 'Una historia de amor que resiste el paso del tiempo y las circunstancias.', 368, '1985-09-05', 'https://imagessl1.casadellibro.com/a/l/s5/51/9788497592451.webp'),
(2, 'Conversación en La Catedral', 'Una profunda reflexión sobre el poder, la corrupción y el destino individual en el Perú.', 601, '1969-05-01', 'https://imagessl5.casadellibro.com/a/l/s5/85/9788420467085.webp'),
(3, 'Harry Potter y la cámara secreta', 'Harry investiga sucesos extraños en su segundo año en Hogwarts.', 251, '1998-07-02', 'https://m.media-amazon.com/images/I/61IphOTR0+L._AC_UF894,1000_QL80_.jpg'),
(4, 'Por quién doblan las campanas', 'Un soldado estadounidense se une a la lucha contra los franquistas durante la Guerra Civil Española.', 471, '1940-10-21', 'https://m.media-amazon.com/images/I/81mKSI5fvOL._AC_UF894,1000_QL80_.jpg'),
(5, 'Novelas ejemplares', 'Una colección de relatos cortos con crítica social y sátira.', 384, '1613-01-01', 'https://m.media-amazon.com/images/I/91iyp46q8VL.jpg');
