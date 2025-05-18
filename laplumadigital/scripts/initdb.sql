CREATE DATABASE IF NOT EXISTS LaPlumaDigital;

use LaPlumaDigital;

ALTER DATABASE LaPlumaDigital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(30) NOT NULL UNIQUE,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    Foto VARCHAR(1000) NOT NULL,
    Permitido BOOLEAN NOT NULL,
    Tipo ENUM('Admin','Modder','Usuario')
);
INSERT INTO Usuario (UserName, Nombre, Descripcion, Foto, Permitido, Tipo) VALUES
('Marcos', 'Marcos Arjona Comino', 'Este es marcos el creador', 'https://backsubbetica.novacreative.es/images/municipios/GvaJMjci6g5xrTDgpH6HO7BNQ8fxtdunp2q071LH.jpg', 1, 'Admin'),
('Laura', 'Laura Jimenez Muñoz', 'Soy la pareja de Marcos el creador', 'https://www.tiendanimal.es/articulos/wp-content/uploads/2024/03/cachorro-de-golden-retriever-foto.jpg', 1, 'Modder'),
('Pepe', 'Pepe Perez Perez', 'Soy Pepe Perez Perez', 'https://upload.wikimedia.org/wikipedia/commons/5/55/Pepe_2018.jpg', 1, 'Usuario');

CREATE TABLE IF NOT EXISTS UyP(
    idUsuario INT,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL ,
    CONSTRAINT Fk_UyP FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT Pk_UyP PRIMARY KEY (idUsuario)
);
INSERT INTO UyP (idUsuario, Email, Contrasena) VALUES
(1, 'marcos@laplumadigital.com', '$2a$10$SDOOZ7cedJFcuqcNG8xdYOZO3gQvA7RJKMdChrrcuobRkunGwxuFS'),
(2, 'laurajimu05@gmail.com', '$2a$10$KKMj/ZHYFU7kE86H5eKeB.uEa5g/Cs7Fclkekvdu76U6X4XBbjC1O'),
(3, 'pepeperez@gmail.com', '$2a$10$RdnvksEHIhNXzAsCFmZiRunlU2Hjc6EYauSNn/Cn8hGLMfb93XkBC');

CREATE TABLE IF NOT EXISTS Autores (
    idAutor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    FechaNac DATE NOT NULL,
    FechaFal DATE,
    Foto VARCHAR(255)
);
INSERT INTO Autores (Nombre, FechaNac, FechaFal, Foto) VALUES
('Gabriel García Márquez', '1927-03-06', '2014-04-17', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg'),
('Mario Vargas Llosa', '1936-03-28', '2025-04-13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_Vargas_Llosa_%28crop_2%29.jpg/960px-Mario_Vargas_Llosa_%28crop_2%29.jpg'),
('J.K. Rowling', '1965-07-31', NULL, 'https://m.media-amazon.com/images/S/amzn-author-media-prod/8cigckin175jtpsk3gs361r4ss.jpg'),
('Ernest Hemingway', '1899-07-21', '1961-07-02', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ernest_Hemingway_1923_passport_photo.jpg/250px-Ernest_Hemingway_1923_passport_photo.jpg'),
('Miguel de Cervantes', '1547-09-29', '1616-04-22', 'https://wmagazin.com/wp-content/uploads/2022/06/AV-ppal-Cervantes-Santiago-Munoz-Machado.2022.jpg');



CREATE TABLE IF NOT EXISTS Libros (
    idLibro INT AUTO_INCREMENT PRIMARY KEY,
    idAutor INT,
    Titulo VARCHAR(50) NOT NULL,
    Sinapsis VARCHAR(250) NOT NULL,
    Descripcion VARCHAR(1000),
    Paginas INT NOT NULL,
    Fecha DATE NOT NULL,
    Foto VARCHAR(255),
    CONSTRAINT FK_ALibros FOREIGN KEY (idAutor) REFERENCES Autores(idAutor)
);
INSERT INTO Libros (idAutor, Titulo, Sinapsis, Descripcion, Paginas, Fecha, Foto) VALUES
(1, 'Cien años de soledad', 
 'La saga de la familia Buendía en el mítico Macondo.',
 'Cien años de soledad es una obra monumental de la literatura hispanoamericana que relata la historia de varias generaciones de la familia Buendía en el pueblo ficticio de Macondo. Escrita por Gabriel García Márquez, esta novela mezcla lo real y lo fantástico a través del estilo del realismo mágico, y aborda temas como la soledad, el tiempo cíclico, el poder, la violencia y la búsqueda del sentido de la vida. La prosa exuberante, las imágenes surrealistas y la estructura compleja hacen de esta obra una experiencia literaria única. A través de los destinos trágicos, amorosos y mágicos de los Buendía, la novela ofrece una profunda crítica a la historia y la política latinoamericana.', 
 471, '1967-05-30', 'https://m.media-amazon.com/images/I/81foacR0CPL.jpg'),
(2, 'La ciudad y los perros',
 'Una historia de corrupción y violencia en una escuela militar de Lima.',
 'La ciudad y los perros, de Mario Vargas Llosa, explora la brutalidad y la deshumanización en una academia militar peruana. La novela es un retrato crítico de una sociedad jerárquica, marcada por el abuso de poder y la represión. A través de los ojos de los cadetes, el lector presencia cómo la violencia y la traición se convierten en medios de supervivencia. La narrativa entrelaza múltiples voces para revelar la crudeza de la adolescencia en un entorno hostil, donde la moralidad se desvanece ante la obediencia ciega. Es una obra clave del boom latinoamericano.', 
 378, '1963-01-01', 'https://m.media-amazon.com/images/I/71EyHH99GfL.jpg'),
(3, 'Harry Potter y la piedra filosofal',
 'El inicio de las aventuras mágicas de Harry Potter en Hogwarts.',
 'Harry Potter y la piedra filosofal es la novela que dio inicio a una de las sagas más influyentes de la literatura contemporánea juvenil. En ella, Harry, un niño huérfano criado por sus crueles tíos, descubre que es un mago y es invitado a asistir al Colegio Hogwarts de Magia y Hechicería. Allí, conocerá amigos leales, como Hermione y Ron, y enemigos como Draco Malfoy. También empezará a descubrir los misterios que rodean su pasado, su conexión con el malvado Lord Voldemort, y el secreto de la piedra filosofal. Una obra de imaginación, valentía y descubrimiento.', 
 223, '1997-06-26', 'https://m.media-amazon.com/images/I/91R1AixEiLL._AC_UF894,1000_QL80_.jpg'),
(4, 'El viejo y el mar',
 'Un pescador lucha contra un enorme pez en alta mar.',
 'En esta novela corta, Ernest Hemingway presenta a Santiago, un viejo pescador cubano que atraviesa una larga racha de mala suerte. Con determinación, se adentra en el mar y lucha durante días contra un enorme marlín. A través de esta batalla épica entre el hombre y la naturaleza, Hemingway explora temas como la dignidad, el honor, la perseverancia y la relación del ser humano con el mundo natural. El viejo y el mar es una historia profunda, escrita con un estilo sobrio, que simboliza la lucha constante por la supervivencia y el valor frente a la derrota.', 
 127, '1952-09-01', 'https://m.media-amazon.com/images/I/71TDhHidulL._AC_UF1000,1000_QL80_.jpg'),
(5, 'Don Quijote de la Mancha',
 'La clásica historia del hidalgo que lucha contra molinos de viento.',
 'Don Quijote de la Mancha, escrita por Miguel de Cervantes, es considerada una de las mayores obras literarias de todos los tiempos. Narra las aventuras de Alonso Quijano, un hidalgo que enloquece tras leer demasiados libros de caballerías y decide convertirse en caballero andante bajo el nombre de Don Quijote. Acompañado por su fiel escudero Sancho Panza, se lanza a combatir injusticias imaginarias. La novela es una sátira brillante, llena de humor y reflexión, que cuestiona la realidad, la locura, los ideales y el sentido de la identidad.', 
 863, '1605-01-16', 'https://images.cdn2.buscalibre.com/fit-in/360x360/c0/63/c0633c2d4dd430b32d5e02475461f030.jpg'),
(1, 'El amor en los tiempos del cólera',
 'Una historia de amor que resiste el paso del tiempo y las circunstancias.',
 'Esta novela de Gabriel García Márquez cuenta la historia de Florentino Ariza y Fermina Daza, quienes se enamoran en su juventud, pero cuyas vidas toman rumbos distintos. Décadas después, tras la muerte del esposo de Fermina, Florentino le reafirma su amor, demostrando una fidelidad y esperanza inquebrantables. La novela es un homenaje a la paciencia, al amor en sus múltiples formas —pasional, platónico, físico—, y una exploración del envejecimiento y la memoria. Con el estilo poético del autor, es una reflexión sobre el amor que desafía el tiempo.', 
 368, '1985-09-05', 'https://m.media-amazon.com/images/I/71mKpV0iLdL._UF1000,1000_QL80_.jpg'),

(2, 'Conversación en La Catedral',
 'Una profunda reflexión sobre el poder, la corrupción y el destino individual en el Perú.',
 'En Conversación en La Catedral, Mario Vargas Llosa construye una novela ambiciosa y compleja que retrata la decadencia moral y política del Perú durante la dictadura de Odría. A través de una conversación entre Santiago y Ambrosio en un bar llamado La Catedral, se desentraña una historia de desencanto, traiciones familiares, manipulación política y pérdida de fe en el futuro. La obra es un estudio psicológico y social que denuncia el autoritarismo y la descomposición ética de una sociedad atrapada en su propia mediocridad. Es una de las novelas más importantes del autor.', 
 601, '1969-05-01', 'https://m.media-amazon.com/images/I/81r4rRFUAzL.jpg'),

(3, 'Harry Potter y la cámara secreta',
 'Harry investiga sucesos extraños en su segundo año en Hogwarts.',
 'La segunda entrega de la saga creada por J.K. Rowling continúa con el segundo año de Harry Potter en Hogwarts. Misteriosos ataques petrifican a los estudiantes, y se descubren mensajes que sugieren la apertura de la Cámara Secreta, un lugar oculto dentro del castillo. Harry, junto con sus amigos, se embarca en la peligrosa misión de descubrir al responsable, mientras lidia con el rechazo de algunos compañeros y la creciente amenaza de Voldemort. Esta novela explora el pasado de la escuela, la importancia del valor y la lealtad, y el poder de la amistad.', 
 251, '1998-07-02', 'https://m.media-amazon.com/images/I/61IphOTR0+L._AC_UF894,1000_QL80_.jpg'),

(4, 'Por quién doblan las campanas',
 'Un soldado estadounidense se une a la lucha contra los franquistas durante la Guerra Civil Española.',
 'En esta intensa novela de Ernest Hemingway, el protagonista Robert Jordan, un joven estadounidense, se une a una unidad guerrillera antifranquista en la Guerra Civil Española. La historia transcurre en pocos días, pero en ellos se refleja la complejidad del conflicto, la crudeza de la guerra, el amor fugaz con María, y las dudas internas sobre el sentido del sacrificio. La obra es tanto una denuncia del horror bélico como una meditación sobre la muerte, el deber y la solidaridad humana. Es una de las novelas más comprometidas y conmovedoras del autor.', 
 471, '1940-10-21', 'https://m.media-amazon.com/images/I/81mKSI5fvOL._AC_UF894,1000_QL80_.jpg'),

(5, 'Novelas ejemplares',
 'Una colección de relatos cortos con crítica social y sátira.',
 'Novelas ejemplares es una colección de doce relatos escritos por Miguel de Cervantes. Cada historia, aunque distinta en estilo y trama, ofrece una lección moral o social, siendo “ejemplares” por su contenido edificante. Mezclando comedia, romanticismo, sátira y realismo, Cervantes retrata la sociedad de su época con ironía y profundidad. Los temas van desde el honor y la fidelidad hasta la locura, el engaño y la justicia. Esta colección demuestra la versatilidad del autor y su habilidad para captar los matices de la condición humana.', 
 384, '1613-01-01', 'https://m.media-amazon.com/images/I/91iyp46q8VL.jpg');


CREATE TABLE IF NOT EXISTS Publicaciones(
    idPublicaciones INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idLibro INT,
    idAutor INT,
    Titulo VARCHAR(50) NOT NULL,
    Contenido VARCHAR(1000) NOT NULL,
    Foto VARCHAR(255),
    Likes INT NOT NULL,
    CONSTRAINT FK_UPublicaciones FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT FK_LPublicaciones FOREIGN KEY (idLibro) REFERENCES Libros(idLibro),
    CONSTRAINT FK_APublicaciones FOREIGN KEY (idAutor) REFERENCES Autores(idAutor)
);

INSERT INTO Publicaciones (idUsuario, idLibro, idAutor, Titulo, Contenido, Foto, Likes) VALUES
(1, 1, 1, 'Lo que me pareció Cien años de soledad','Cien años de soledad del grandísimo escriptor Gabriel García Márquez, me ha parecido una de las mejores obras literarias de la historia. Un libro muy interesante desde el minuto uno que empiezas a leerlo', 'https://m.media-amazon.com/images/I/81foacR0CPL.jpg', 3);
