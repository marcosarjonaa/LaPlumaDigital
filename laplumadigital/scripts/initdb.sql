SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS LaPlumaDigital;

use LaPlumaDigital;

ALTER DATABASE LaPlumaDigital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(30) NOT NULL UNIQUE,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(1000) NOT NULL,
    Foto VARCHAR(1000) NOT NULL,
    Permitido BOOLEAN NOT NULL,
    Tipo ENUM('Admin','Modder','Usuario')
);
INSERT INTO Usuario (UserName, Nombre, Descripcion, Foto, Permitido, Tipo) VALUES
('Marcos', 'Marcos Arjona Comino', 'Soy el creador de la pluma digital, la plataforma que estas usando. Soy un lector ocasional con ganas de aprender más acerca de los libros de estilos como la fantaía o la ciencia ficcion', 'https://backsubbetica.novacreative.es/images/municipios/GvaJMjci6g5xrTDgpH6HO7BNQ8fxtdunp2q071LH.jpg', 1, 'Admin'),
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

CREATE TABLE IF NOT EXISTS Peticiones(
    idPeticiones INT AUTO_INCREMENT PRIMARY KEY,
    Autor VARCHAR(100) NOT NULL,
    Titulo VARCHAR(50) NOT NULL,
    Sinapsis VARCHAR(250) NOT NULL,
    Descripcion VARCHAR(1000) NOT NULL,
    Paginas INT NOT NULL,
    Fecha DATE NOT NULL,
    Foto VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Autores (
    idAutor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    FechaNac DATE NOT NULL,
    FechaFal DATE,
    Foto VARCHAR(255)
);
INSERT INTO Autores (Nombre, FechaNac, FechaFal, Foto) VALUES
('J. Antonio Jiménez Ayala', '1966-11-24', NULL, '/images/antonio.jpg'),
('Gabriel García Márquez', '1927-03-06', '2014-04-17', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg'),
('Mario Vargas Llosa', '1936-03-28', '2025-04-13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mario_Vargas_Llosa_%28crop_2%29.jpg/960px-Mario_Vargas_Llosa_%28crop_2%29.jpg'),
('J.K. Rowling', '1965-07-31', NULL, 'https://m.media-amazon.com/images/S/amzn-author-media-prod/8cigckin175jtpsk3gs361r4ss.jpg'),
('Ernest Hemingway', '1899-07-21', '1961-07-02', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ernest_Hemingway_1923_passport_photo.jpg/250px-Ernest_Hemingway_1923_passport_photo.jpg'),
('Miguel de Cervantes', '1547-09-29', '1616-04-22', 'https://wmagazin.com/wp-content/uploads/2022/06/AV-ppal-Cervantes-Santiago-Munoz-Machado.2022.jpg'),
('Jose Maria Gironella', '1917-12-31', '2003-01-03', 'https://vidaiconica.com/wp-content/uploads/2024/11/biografia-de-jose-maria-gironella.jpg'),
('Jorge Luis Borges', '1899-08-24', '1986-06-14', 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Jorge_Luis_Borges_1951%2C_by_Grete_Stern.jpg'),
('Julio Cortázar', '1914-08-26', '1984-02-12', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Cort%C3%A1zar.jpg/1200px-Cort%C3%A1zar.jpg'),
('Pablo Neruda', '1904-07-12', '1973-09-23', 'https://upload.wikimedia.org/wikipedia/commons/8/86/Pablo_Neruda_1963.jpg'),
('Laura Esquivel', '1950-09-30', NULL, 'https://www.clarin.com/2013/05/01/By-e59n3mg_312x240.jpg'),
('Carlos Fuentes', '1928-11-11', '2012-05-15', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Carlos_Fuentes_1987.jpg/960px-Carlos_Fuentes_1987.jpg'),
('Federico García Lorca', '1898-06-05', '1936-08-19', 'https://upload.wikimedia.org/wikipedia/commons/2/22/Federico_Garc%C3%ADa_Lorca._Huerta_de_San_Vicente%2C_Granada.jpg'),
('Ana María Matute', '1925-07-26', '2014-06-25', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Ana_Mar%C3%ADa_Matute.jpg'),
('Rosa Montero', '1951-01-03', NULL, 'https://www.welife.es/wp-content/uploads/sites/3/2024/03/Rosa-Montero-c-Daniel-Mordzinski-1200x1707.jpg'),
('Hanya Yanagihara', '1974-09-20', NULL, 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Image_Credit-_Wirasathya_Darmaja._Hanya_Yanagihara-_A_Little_Life._Neka_Museum._-_30675717626_%28cropped%29.jpg'),
('Arturo Pérez-Reverte', '1951-11-25', NULL, 'https://cdn.zendalibros.com/wp-content/uploads/2016/03/Arturo-P%C3%A9rez-Reverte_avatar-500x500.jpg'),
('Mario Benedetti', '1920-09-14', '2009-05-17', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mario_Benedetti%2C_1981.jpg/1200px-Mario_Benedetti%2C_1981.jpg'),
('David Olivas', '1996-10-25', NULL, 'https://dospassos.es/wp-content/uploads/2022/10/David-Olivas-1.jpg'),
('Antonio Machado', '1875-07-26', '1939-02-22', 'https://upload.wikimedia.org/wikipedia/commons/5/50/Antonio_Machado_-_Poes%C3%ADas_completas_-_bdh0000252161_%28page_8_crop%29.jpg');

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
(1, 'Un perro ladra', 'Este libro está escrito por un gran poeta que comparte algunos de sus poemas dedicados a personas cercanas a el y comocidas', 
'Este libro escriot por Antonio Jimémez Ayala, representa parte del arte del poeta que decide compartir con todo el mundo su obra. Dedicado a sus padres, esposa e hijas publica su primer libro de poesía donde nos hace llegar 20 de sus poemas, divididos en dos capitulos, Cementerio de besos y De Profundis.',
57, '2022-05-20', 'https://www.exlibric.com/wp-content/uploads/2022/02/Un-perro-ladra-juan-jimenez-ayala.png'),
(2, 'Cien años de soledad', 
 'La saga de la familia Buendía en el mítico Macondo.',
 'Cien años de soledad es una obra monumental de la literatura hispanoamericana que relata la historia de varias generaciones de la familia Buendía en el pueblo ficticio de Macondo. Escrita por Gabriel García Márquez, esta novela mezcla lo real y lo fantástico a través del estilo del realismo mágico, y aborda temas como la soledad, el tiempo cíclico, el poder, la violencia y la búsqueda del sentido de la vida. La prosa exuberante, las imágenes surrealistas y la estructura compleja hacen de esta obra una experiencia literaria única. A través de los destinos trágicos, amorosos y mágicos de los Buendía, la novela ofrece una profunda crítica a la historia y la política latinoamericana.', 
 471, '1967-05-30', 'https://m.media-amazon.com/images/I/81foacR0CPL.jpg'),
(3, 'La ciudad y los perros',
 'Una historia de corrupción y violencia en una escuela militar de Lima.',
 'La ciudad y los perros, de Mario Vargas Llosa, explora la brutalidad y la deshumanización en una academia militar peruana. La novela es un retrato crítico de una sociedad jerárquica, marcada por el abuso de poder y la represión. A través de los ojos de los cadetes, el lector presencia cómo la violencia y la traición se convierten en medios de supervivencia. La narrativa entrelaza múltiples voces para revelar la crudeza de la adolescencia en un entorno hostil, donde la moralidad se desvanece ante la obediencia ciega. Es una obra clave del boom latinoamericano.', 
 378, '1963-01-01', 'https://m.media-amazon.com/images/I/71EyHH99GfL.jpg'),
(4, 'Harry Potter y la piedra filosofal',
 'El inicio de las aventuras mágicas de Harry Potter en Hogwarts.',
 'Harry Potter y la piedra filosofal es la novela que dio inicio a una de las sagas más influyentes de la literatura contemporánea juvenil. En ella, Harry, un niño huérfano criado por sus crueles tíos, descubre que es un mago y es invitado a asistir al Colegio Hogwarts de Magia y Hechicería. Allí, conocerá amigos leales, como Hermione y Ron, y enemigos como Draco Malfoy. También empezará a descubrir los misterios que rodean su pasado, su conexión con el malvado Lord Voldemort, y el secreto de la piedra filosofal. Una obra de imaginación, valentía y descubrimiento.', 
 223, '1997-06-26', 'https://m.media-amazon.com/images/I/91R1AixEiLL._AC_UF894,1000_QL80_.jpg'),
(5, 'El viejo y el mar',
 'Un pescador lucha contra un enorme pez en alta mar.',
 'En esta novela corta, Ernest Hemingway presenta a Santiago, un viejo pescador cubano que atraviesa una larga racha de mala suerte. Con determinación, se adentra en el mar y lucha durante días contra un enorme marlín. A través de esta batalla épica entre el hombre y la naturaleza, Hemingway explora temas como la dignidad, el honor, la perseverancia y la relación del ser humano con el mundo natural. El viejo y el mar es una historia profunda, escrita con un estilo sobrio, que simboliza la lucha constante por la supervivencia y el valor frente a la derrota.', 
 127, '1952-09-01', 'https://m.media-amazon.com/images/I/71TDhHidulL._AC_UF1000,1000_QL80_.jpg'),
(6, 'Don Quijote de la Mancha',
 'La clásica historia del hidalgo que lucha contra molinos de viento.',
 'Don Quijote de la Mancha, escrita por Miguel de Cervantes, es considerada una de las mayores obras literarias de todos los tiempos. Narra las aventuras de Alonso Quijano, un hidalgo que enloquece tras leer demasiados libros de caballerías y decide convertirse en caballero andante bajo el nombre de Don Quijote. Acompañado por su fiel escudero Sancho Panza, se lanza a combatir injusticias imaginarias. La novela es una sátira brillante, llena de humor y reflexión, que cuestiona la realidad, la locura, los ideales y el sentido de la identidad.', 
 863, '1605-01-16', 'https://images.cdn2.buscalibre.com/fit-in/360x360/c0/63/c0633c2d4dd430b32d5e02475461f030.jpg'),
(2, 'El amor en los tiempos del cólera',
 'Una historia de amor que resiste el paso del tiempo y las circunstancias.',
 'Esta novela de Gabriel García Márquez cuenta la historia de Florentino Ariza y Fermina Daza, quienes se enamoran en su juventud, pero cuyas vidas toman rumbos distintos. Décadas después, tras la muerte del esposo de Fermina, Florentino le reafirma su amor, demostrando una fidelidad y esperanza inquebrantables. La novela es un homenaje a la paciencia, al amor en sus múltiples formas —pasional, platónico, físico—, y una exploración del envejecimiento y la memoria. Con el estilo poético del autor, es una reflexión sobre el amor que desafía el tiempo.', 
 368, '1985-09-05', 'https://m.media-amazon.com/images/I/71mKpV0iLdL._UF1000,1000_QL80_.jpg'),

(3, 'Conversación en La Catedral',
 'Una profunda reflexión sobre el poder, la corrupción y el destino individual en el Perú.',
 'En Conversación en La Catedral, Mario Vargas Llosa construye una novela ambiciosa y compleja que retrata la decadencia moral y política del Perú durante la dictadura de Odría. A través de una conversación entre Santiago y Ambrosio en un bar llamado La Catedral, se desentraña una historia de desencanto, traiciones familiares, manipulación política y pérdida de fe en el futuro. La obra es un estudio psicológico y social que denuncia el autoritarismo y la descomposición ética de una sociedad atrapada en su propia mediocridad. Es una de las novelas más importantes del autor.', 
 601, '1969-05-01', 'https://m.media-amazon.com/images/I/81r4rRFUAzL.jpg'),

(4, 'Harry Potter y la cámara secreta',
 'Harry investiga sucesos extraños en su segundo año en Hogwarts.',
 'La segunda entrega de la saga creada por J.K. Rowling continúa con el segundo año de Harry Potter en Hogwarts. Misteriosos ataques petrifican a los estudiantes, y se descubren mensajes que sugieren la apertura de la Cámara Secreta, un lugar oculto dentro del castillo. Harry, junto con sus amigos, se embarca en la peligrosa misión de descubrir al responsable, mientras lidia con el rechazo de algunos compañeros y la creciente amenaza de Voldemort. Esta novela explora el pasado de la escuela, la importancia del valor y la lealtad, y el poder de la amistad.', 
 251, '1998-07-02', 'https://m.media-amazon.com/images/I/61IphOTR0+L._AC_UF894,1000_QL80_.jpg'),

(5, 'Por quién doblan las campanas',
 'Un soldado estadounidense se une a la lucha contra los franquistas durante la Guerra Civil Española.',
 'En esta intensa novela de Ernest Hemingway, el protagonista Robert Jordan, un joven estadounidense, se une a una unidad guerrillera antifranquista en la Guerra Civil Española. La historia transcurre en pocos días, pero en ellos se refleja la complejidad del conflicto, la crudeza de la guerra, el amor fugaz con María, y las dudas internas sobre el sentido del sacrificio. La obra es tanto una denuncia del horror bélico como una meditación sobre la muerte, el deber y la solidaridad humana. Es una de las novelas más comprometidas y conmovedoras del autor.', 
 471, '1940-10-21', 'https://m.media-amazon.com/images/I/81mKSI5fvOL._AC_UF894,1000_QL80_.jpg'),
(6, 'Novelas ejemplares',
 'Una colección de relatos cortos con crítica social y sátira.',
 'Novelas ejemplares es una colección de doce relatos escritos por Miguel de Cervantes. Cada historia, aunque distinta en estilo y trama, ofrece una lección moral o social, siendo “ejemplares” por su contenido edificante. Mezclando comedia, romanticismo, sátira y realismo, Cervantes retrata la sociedad de su época con ironía y profundidad. Los temas van desde el honor y la fidelidad hasta la locura, el engaño y la justicia. Esta colección demuestra la versatilidad del autor y su habilidad para captar los matices de la condición humana.', 
 384, '1613-01-01', 'https://m.media-amazon.com/images/I/91iyp46q8VL.jpg'),
 (7, 'Un millón de muertos',
 'La Guerra Civil Española vista desde Barcelona.',
 'Gironella narra el quiebre de una familia catalana en la convulsa época de la Segunda República y la Guerra Civil, combinando historia, testimonio y ficción.',
 580, '1968-04-20', 'https://m.media-amazon.com/images/I/61bmI6Rh2bL._AC_UF894,1000_QL80_.jpg'),
(8, 'El Aleph',
 'Un punto en el espacio que contiene todos los lugares del planeta.',
 'Una brillante historia de Borges donde un hombre descubre en un sótano un Aleph, un punto que permite ver todo lo visible en el mundo, explorando lo infinito, la memoria y la realidad.',
 124, '1945-05-14', 'https://m.media-amazon.com/images/I/41dRbJoUtXL._AC_UF1000,1000_QL80_.jpg'),
(9, 'Rayuela',
 'Una novela experimental sobre el amor y la búsqueda.',
 'Obra emblemática del boom latinoamericano, estructura libre y multilineal que aborda la relación entre Horacio Oliveira y La Maga en París y Buenos Aires, cuestionando las normas del arte y la vida.',
 576, '1963-09-28', 'https://m.media-amazon.com/images/I/913qsYmTdmL._AC_UF894,1000_QL80_.jpg'),
(10, 'Veinte poemas de amor y una canción desesperada',
 'Poemas de amor intensos y melancólicos.',
 'Colección de poemas que exploran la pasión, el deseo y el dolor de la separación, escrita en un lenguaje sensual y emotivo.',
 69, '1924-10-12', 'https://m.media-amazon.com/images/I/61Q16MUBN5L._AC_UF894,1000_QL80_.jpg'),
(11, 'Malinche',
 'La historia de la mujer indígena que acompañó a Cortés.',
 'Novela histórica que reconstruye la vida de Malinalli, intérprete y compañera de Hernán Cortés, desde su perspectiva, cuestionando la conquista y la identidad.',
 512, '2006-02-14', 'https://m.media-amazon.com/images/I/61nFXUzdoUL._AC_UF1000,1000_QL80_.jpg'),
(12, 'La muerte de Artemio Cruz',
 'Recuerdos fragmentados de un hombre en su lecho de muerte.',
 'Novela narrada en primera persona a través de monólogos interiores y memoria, que recuenta la vida del poderoso Artemio Cruz, desde la Revolución Mexicana hasta su ocaso.',
 298, '1962-09-19', 'https://m.media-amazon.com/images/I/71WSEDcAXkL.jpg'),
(13, 'Bodas de sangre',
 'Una boda sellada por pasiones trágicas.',
 'Tragedia en verso que narra el drama de una novia que, presa de pasiones inexplicables, huye con su amado, desatando una espiral de tragedia en un entorno opresivo y prematuro.',
 72, '1933-03-14', 'https://m.media-amazon.com/images/I/61axILwG7RL._AC_UF894,1000_QL80_.jpg'),
(14, 'Primera memoria',
 'Una niña que descubre la pérdida y la inocencia.',
 'Novela sobre la infancia y el descubrimiento de la muerte, donde la joven protagonista narra sus recuerdos cargados de nostalgia y miedo.',
 250, '1959-06-01', 'https://www.planetadelibros.com/usuaris/libros/fotos/412/original/portada_primera-memoria_ana-maria-matute_202412090853.jpg'),
(15, 'La ridícula idea de no volver a verte',
 'Cartas y memorias tras la muerte de Ramón Sampedro.',
 'Mezcla de biografía, ensayo y memoria íntima, donde la autora reflexiona sobre la vida, la muerte y la identidad, tras la pérdida de Sampedro y acompañada de referencias históricas.',
 320, '2013-10-10', 'https://www.planetadelibros.com/usuaris/libros/fotos/91/original/portada_la-ridicula-idea-de-no-volver-a-verte__201705300754.jpg'),
(17, 'El capitán Alatriste',
 'Un espadachín al servicio del rey de España.',
 'Primera novela de la saga de Alatriste, ambientada en el Siglo de Oro español. Un soldado veterano navega entre intrigas políticas y aventuras por encargo.',
 304, '1996-10-01', 'https://m.media-amazon.com/images/I/811N2YEQmqL.jpg'),
(18, 'La tregua',
 'Un viudo se enamora en su rutina de oficina.',
 'La novela está narrada en formato de diario. Martín Santomé, viudo y con hijos, espera su jubilación cuando conoce a Laura Avellaneda, iniciándose una historia de amor inesperado y breve.',
 192, '1960-11-21', 'https://m.media-amazon.com/images/I/71CbRWXBY6L.jpg'),
(20, 'Campos de Castilla',
 'Poemas que describen la España rural y la nostalgia.',
 'Colección de poemas modernistas que expresan el paisaje y la identidad de Castilla, la melancolía y la reflexión sobre el paso del tiempo.',
 120, '1912-01-01', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Antonio_Machado_Campos_de_Castilla_1912.jpg'),
(16, 'Tan poca vida',
 'Una historia sobre la amistad, el trauma y la supervivencia.',
 'Tan poca vida es una novela conmovedora que sigue la vida de cuatro amigos desde su juventud hasta la madurez, centrándose en Jude, un hombre con un pasado profundamente traumático. A medida que sus relaciones se desarrollan, la historia explora el amor, el dolor físico y emocional, la resiliencia y la esperanza. Es una obra intensa que retrata con crudeza la fragilidad humana y la complejidad de las emociones.',
 1024, '2015-03-10', 'https://m.media-amazon.com/images/I/81EanLjH-RL._AC_UF1000,1000_QL80_.jpg'),
(19, 'La misma brújula',
 'Una novela sobre los caminos del amor y la búsqueda personal.',
 'La misma brújula es una obra del escritor y fotógrafo David Olivas que narra la historia de dos jóvenes cuyas vidas se entrelazan en un viaje lleno de emociones, decisiones y reencuentros. La novela reflexiona sobre cómo nuestras elecciones y los vínculos afectivos nos marcan, y cómo, a pesar de la distancia y el tiempo, algunas brújulas siguen apuntando al mismo lugar.',
 272, '2019-05-02', 'https://www.planetadelibros.com/usuaris/libros/fotos/250/original/portada_la-misma-brujula_david-sadness_201704041357.jpg');


CREATE TABLE IF NOT EXISTS Publicaciones(
    idPublicaciones INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idLibro INT,
    idAutor INT,
    Titulo VARCHAR(50) NOT NULL,
    Contenido VARCHAR(1000) NOT NULL,
    Foto VARCHAR(255),
    CONSTRAINT FK_UPublicaciones FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT FK_LPublicaciones FOREIGN KEY (idLibro) REFERENCES Libros(idLibro),
    CONSTRAINT FK_APublicaciones FOREIGN KEY (idAutor) REFERENCES Autores(idAutor)
);

INSERT INTO Publicaciones (idUsuario, idLibro, idAutor, Titulo, Contenido, Foto) VALUES
(1, 2, 2, 'Lo que me pareció Cien años de soledad','Cien años de soledad del grandísimo escriptor Gabriel García Márquez, me ha parecido una de las mejores obras literarias de la historia. Un libro muy interesante desde el minuto uno que empiezas a leerlo', 'https://m.media-amazon.com/images/I/81foacR0CPL.jpg'),
(1, 9, 4, 'Harry Potter y la piedra filosofal','Harry potter y la cámara secreta es un muy buen libro de fantasía fusionando la magia con la fantasía de forma impecable. El segundo libro de una saga que nunca será olvidada', 'https://m.media-amazon.com/images/I/61IphOTR0+L._AC_UF894,1000_QL80_.jpg'),
(1, 6, 6, 'Don Quijote de la Mancha','Don Quijote de la Mancha es uno de los libros más vendidos del mundo. Este libro cuenta la historias ficticias que cree vivir don Quijote debia a la locura que tiene causada por las novelas de caballeros', 'https://images.cdn2.buscalibre.com/fit-in/360x360/c0/63/c0633c2d4dd430b32d5e02475461f030.jpg');
