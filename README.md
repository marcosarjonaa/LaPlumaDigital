# La Pluma Digital 
### Marcos Arjona Comino


## Índice: 

1. Introducción 
   
   1.1. Resumen del proyecto
   
   1.2. Explicacion de la aplicación

   1.3. Tecnologías usadas

2. Requisitos

    2.1. Requisitos funcionales

    2.2. Requisitos no funcionales

3. Diagramas y Casos

    3.1. Casos de uso

    3.2. Diagrama entidad-relacion

    3.3. Diagrama de clases del modelo

    3.4. Diagrama de secuencia

4. Implementaciones, Tecnologías y Código

5. Manual de usuario

6. Conclusiones

--- 

### 1. Introducción
#### 1.1. Resumen del proyecto
La pluma digital consiste en una red social dedicada a los lectores y escritores. Hablando con personas lectoras, pude detectar la falta de una red social para personas lectoras que quieran debatir acerca de libros, o autores. Así como, la falta de una forma para conocer gente con sus mismos gustos en cuanto a lectura se refiere. 

De ahí nace la idea de La Pluma Digital, encontrar un sitio donde poder conversar, conocer y descubrir cosas sobre cualquier libro. 

#### 1.2. Explicacion de la aplicación

Esta aplicación será utilizada para ver comentarios de personas que quieran conocer a más personas ya que podrán seguir a otras e incluso conocer su correo electrónico si ambas se siguen. Así como tener escritores favoritos y poder ver los libros que han escrito. Otra cosa que los usuarios podrán hacer es ver los comentarios que hagan las personas sobre cualquier libro sobre sus libros preferidos o cualquiera que quieran ver. 

Por otro lado también podrán ver los ranking de los libros más populares de la red social en cuanto a número de comentarios. Y por supuesto, podrán ver y buscar los libros que están en la base de datos para saber si existe ese libro, para conocer más de él o lo que quieran. 

#### 1.3. Tecnologías usadas 
Para este proyecto usaré NodeJs para el backend, y Pug como herramienta para el frontend. He decidido usar NodeJs como backend porque es una herramienta de uso poco común que se basa en el lenguaje JavaScript. Este lenguaje, no tipado, presenta una prueba para determinar la lógica de programación de la persona que lo programa. También he aprovechado la formación que he tenido en la empresa de prácticas (Nter tech Services)

---
### 2. Requisitos
#### 2.1. Requisitos funcionales
**Autenticación y Autorización**
- El sistema debe permitir el registro de nuevos usuarios.
- El sistema debe permitir el inicio y cierre de sesión.
- El sistema debe validar el token JWT para proteger rutas privadas.
- El sistema debe mostrar contenido dinámico según el rol del usuario (usuario, modder,admin).

**Gestión de Libros y Autores**
- El sistema debe listar todos los libros disponibles.
- El sistema debe listar todos los autores.
- El sistema debe permitir subir libros (solo usuarios registrados).
- El sistema debe permitir visualizar detalles de un libro o autor.

**Ranking**
- El sistema debe generar rankings de libros en función de cuántas veces han sido mencionados.
- El sistema debe generar rankings de autores del mismo modo.
- El sistema debe mostrar rankings en formato de tabla, incluyendo nombre, foto y posición.

**Perfil de Usuario**
- El sistema debe permitir a un usuario ver y editar su perfil.
- El sistema debe permitir que los usuarios vean sus publicaciones.

**Publicaciones**
- El sistema debe permitir a los usuarios publicar contenido relacionado con libros/autores.
- Las publicaciones deben estar ligadas a libros y autores (vía idLibro e idAutor).

#### 2.2. Requisitos no funcionales
**Seguridad**
- El sistema debe cifrar los tokens JWT con una clave secreta segura.
- Las contraseñas deben almacenarse cifradas (por ejemplo, usando bcrypt).
- Las cookies deben tener opciones httpOnly y secure (en producción).

**Rendimiento**
- Las consultas de ranking deben ser eficientes, usando agregaciones SQL y ventanas (RANK()).
- Las rutas protegidas deben evitar accesos innecesarios a la base de datos si el token no es válido.

**Usabilidad**
- El sistema debe tener una interfaz clara, con navegación sencilla entre libros, autores y rankings.
- El encabezado debe cambiar dinámicamente según si el usuario está logueado o no (por ejemplo, "Iniciar sesión" ↔ "Cerrar sesión").

**Mantenibilidad**
- El sistema debe estructurar su código en controladores, rutas, middlewares y vistas organizadas.
- Las vistas deben estar basadas en plantillas reutilizables (por ejemplo, usando layout.pug).

**Compatibilidad**
- El sistema debe funcionar en navegadores modernos (Chrome, Firefox, Edge).