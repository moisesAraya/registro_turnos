"use strict";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import session from "express-session";
import passport from "passport";
import express, { json, urlencoded } from "express";
import { cookieKey, HOST, PORT } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import { createUsers } from "./config/initialSetup.js";
import { passportJwtSetup } from "./auth/passport.auth.js";

// Importación de rutas adicionales (nuevas funcionalidades)
import qrCodeRoutes from "./routes/qrcode.routes.js";
import workAreasRouter from "./routes/workAreas.js";
import chartsRoutes from "./routes/charts.routes.js";

async function setupServer() {
  try {
    const app = express();

    // Deshabilitar cabecera "X-Powered-By"
    app.disable("x-powered-by");

    // Configuración de CORS
    app.use(
      cors({
        credentials: true,
        origin: true,
      })
    );

    // Configuración de middlewares
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
    app.use(morgan("dev"));

    // Configuración de sesión
    app.use(
      session({
        secret: cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: true,
          sameSite: "strict",
        },
      })
    );

    // Inicialización de Passport
    app.use(passport.initialize());
    app.use(passport.session());

    passportJwtSetup(); // Configuración de estrategias de Passport

    // Configuración de rutas
    app.use("/api", indexRoutes); // Ruta base del API
    app.use("/api/qrcode", qrCodeRoutes); // Nueva ruta para QR Code
    app.use("/api/work_areas", workAreasRouter); // Nueva ruta para Áreas de Trabajo
    app.use("/api/charts", chartsRoutes); // Nueva ruta para gráficos

    // Inicio del servidor
    app.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (error) {
    console.log("Error en index.js -> setupServer(), el error es: ", error);
  }
}

async function setupAPI() {
  try {
    await connectDB(); // Conexión a la base de datos
    await setupServer(); // Configuración del servidor
    await createUsers(); // Creación de usuarios iniciales
  } catch (error) {
    console.log("Error en index.js -> setupAPI(), el error es: ", error);
  }
}

// Iniciar la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) =>
    console.log("Error en index.js -> setupAPI(), el error es: ", error)
  );