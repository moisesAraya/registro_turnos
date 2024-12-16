"use strict";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import express, { json, urlencoded } from "express";
import { cookieKey, HOST, PORT } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import { createUsers } from "./config/initialSetup.js";
import { passportJwtSetup } from "./auth/passport.auth.js";

// Importación de rutas
import indexRoutes from "./routes/index.routes.js"; // Rutas principales
import workAreasRouter from "./routes/workAreas.js";
import chartsRoutes from "./routes/charts.routes.js";
import eventRoutes from "./routes/event.routes.js"; // Rutas de eventos
import attendanceRoutes from "./routes/attendance.routes.js"; // Rutas de asistencia

async function setupServer() {
  try {
    const app = express();

    // Deshabilitar cabecera "X-Powered-By" para seguridad
    app.disable("x-powered-by");

    // Configuración de CORS
    app.use(
      cors({
        credentials: true,
        origin: true, // Permitir todas las solicitudes por ahora (ajustar en producción)
      })
    );

    // Middlewares generales
    app.use(
      urlencoded({
        extended: true,
        limit: "1mb",
      })
    );

    app.use(
      json({
        limit: "1mb",
      })
    );

    app.use(cookieParser());
    app.use(morgan("dev")); // Logger de solicitudes

    // Configuración de sesión
    app.use(
      session({
        secret: cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false, // Cambiar a true si usas HTTPS
          httpOnly: true,
          sameSite: "strict",
        },
      })
    );

    // Inicialización de Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Configuración de estrategias de Passport
    passportJwtSetup();

    // Configuración de rutas
    app.use("/api", indexRoutes); // Ruta base del API
    app.use("/api/work_areas", workAreasRouter); // Ruta para áreas de trabajo
    app.use("/api/charts", chartsRoutes); // Ruta para gráficos
    app.use("/api/events", eventRoutes); // Ruta para eventos
    app.use("/api/attendance", attendanceRoutes); // Ruta para asistencia

    // Middleware de error 404 (ruta no encontrada)
    app.use((req, res, next) => {
      res.status(404).json({
        message: "La ruta solicitada no existe.",
      });
    });

    // Middleware de error general
    app.use((err, req, res, next) => {
      console.error("Error del servidor:", err.message);
      res.status(500).json({
        message: "Error interno del servidor",
        error: err.message,
      });
    });

    // Inicio del servidor
    app.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (error) {
    console.error("Error en setupServer:", error.message);
    process.exit(1);
  }
}

async function setupAPI() {
  try {
    await connectDB(); // Conexión a la base de datos
    await setupServer(); // Configuración del servidor
    await createUsers(); // Creación de usuarios iniciales
  } catch (error) {
    console.error("Error en setupAPI:", error.message);
  }
}

// Iniciar la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.error("Error al iniciar la API:", error.message));
