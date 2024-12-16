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
import shiftRoutes from "./routes/shifts.routes.js"; // Nueva ruta para Turnos

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
    app.use("/api/work_areas", workAreasRouter); // Ruta para Áreas de Trabajo
    app.use("/api/charts", chartsRoutes); // Ruta para gráficos
    app.use("/api/shifts", shiftRoutes); // Nueva ruta para Turnos

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
