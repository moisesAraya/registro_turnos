Sistema de Registro de Turnos
Este repositorio contiene un sistema de registro de turnos diseñado para gestionar la entrada y salida de trabajadores. La aplicación permite la autenticación y autorización de usuarios mediante JWT, diferenciando roles de administrador y trabajador, y permite a los administradores generar códigos QR diarios para el registro de asistencia.

Tecnologías utilizadas
Frontend: React, Vite, Axios para solicitudes HTTP
Backend: Node.js, Express.js, Passport.js para autenticación
Base de datos: PostgreSQL, manejada con TypeORM como ORM
Autenticación: JWT para la gestión de sesiones y autenticación de usuarios
Almacenamiento de archivos: Multer para gestionar las imágenes de perfil
Estructura del Proyecto
plaintext
Copiar código
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── entity
│   │   ├── middlewares
│   │   ├── routes
│   │   └── app.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── main.jsx
└── README.md
Funcionalidades
1. Autenticación y Autorización
Registro y login: Los usuarios pueden registrarse e iniciar sesión, y se les asigna un rol específico (administrador o trabajador).
Roles: Los administradores tienen acceso a funciones adicionales, como la generación de códigos QR y la gestión de usuarios.
JWT: Los tokens de autenticación se gestionan con JWT, y se utilizan para proteger las rutas del servidor.
2. Gestión de Usuarios (Solo Administradores)
Listado de usuarios: Los administradores pueden ver y gestionar todos los usuarios.
Edición y eliminación de usuarios: Opciones de edición y eliminación en la vista de administración.
3. Generación de Códigos QR (Solo Administradores)
Generación diaria de QR: El sistema permite a los administradores generar un código QR único cada día, el cual los trabajadores pueden escanear para registrar su asistencia.
Visualización automática: Una vez generado, el código QR se muestra en la interfaz de inicio del administrador.
4. Perfil de Usuario
Subida de imagen de perfil: Los usuarios pueden cargar una imagen de perfil utilizando Multer, y esta se almacena en el servidor.
Visualización de perfil: La imagen y el nombre del usuario aparecen en la barra de navegación tras el inicio de sesión.
Instalación y Configuración
Requisitos
Node.js y npm instalados
PostgreSQL como base de datos
Configuración del Backend
Clona este repositorio.

En la carpeta backend, instala las dependencias:

bash
Copiar código
npm install
Crea un archivo .env en backend/config con las siguientes variables de entorno:

plaintext
Copiar código
PORT=3000
HOST=localhost
DATABASE=nombre_base_datos
DB_USERNAME=usuario
PASSWORD=contraseña
JWT_SECRET=tu_secreto_jwt
Inicia el servidor backend:

bash
Copiar código
npm run dev
Configuración del Frontend
Entra a la carpeta frontend y instala las dependencias:

bash
Copiar código
npm install
Inicia el servidor frontend:

bash
Copiar código
npm run dev
Accede a la aplicación en http://localhost:5173.

Uso
Los administradores pueden iniciar sesión y acceder a la interfaz de administración para gestionar usuarios y generar códigos QR.
Los trabajadores pueden ver su perfil y escanear el código QR para registrar su ingreso.
Contribuciones
Para contribuir, crea un fork del repositorio, realiza tus cambios en una nueva rama, y abre un pull request con una descripción detallada de los cambios.

Licencia
Este proyecto está bajo la Licencia MIT.
