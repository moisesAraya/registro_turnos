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
import indexRoutes from "./routes/index.routes.js";
import workAreasRouter from "./routes/workAreas.js";
import chartsRoutes from "./routes/charts.routes.js";
import shiftRoutes from "./routes/shifts.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import areaRoutes from "./routes/areas.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js"; // Importación del dashboard
import earlyExitRoutes from "./routes/earlyexit.routes.js"; // Importación de earlyexit

async function setupServer() {
  try {
    const app = express();

    app.disable("x-powered-by");

    app.use(
      cors({
        credentials: true,
        origin: true,
      })
    );

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

    app.use(passport.initialize());
    app.use(passport.session());
    passportJwtSetup();

    app.use("/api", indexRoutes);
    app.use("/api/work_areas", workAreasRouter);
    app.use("/api/charts", chartsRoutes);
    app.use("/api/shifts", shiftRoutes);
    app.use("/api/attendance", attendanceRoutes);
    app.use("/api/areas", areaRoutes);
    app.use("/api/dashboard", dashboardRoutes); // Registro de rutas del dashboard
    app.use("/api/earlyexit", earlyExitRoutes); // Registro de rutas de earlyexit

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
    await connectDB();
    await setupServer();
    await createUsers();
  } catch (error) {
    console.error("Error en setupAPI:", error.message);
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.error("Error al iniciar la API:", error.message));
