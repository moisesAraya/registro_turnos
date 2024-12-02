"use strict";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import express, { json, urlencoded } from "express";
import { SERVER_PORT, cookieKey } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import { createUsers } from "./config/initialSetup.js";
import { passportJwtSetup } from "./auth/passport.auth.js";
import indexRoutes from "./routes/index.routes.js";
import qrCodeRoutes from "./routes/qrcode.routes.js";
import workAreasRouter from "./routes/workAreas.js";
import chartsRoutes from "./routes/charts.routes.js";

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
    app.use("/api/qrcode", qrCodeRoutes);
    app.use("/api/work_areas", workAreasRouter); // Agrega la ruta de áreas de trabajo
    app.use("/api/charts", chartsRoutes); 

    app.listen(SERVER_PORT, () => {
      console.log(`=> Servidor corriendo en http://localhost:${SERVER_PORT}/api`);
    });
  } catch (error) {
    console.error("Error en index.js -> setupServer(), el error es:", error);
  }
}

async function setupAPI() {
  try {
    await connectDB();
    await setupServer();
    await createUsers();
  } catch (error) {
    console.error("Error en index.js -> setupAPI(), el error es:", error);
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) =>
    console.error("Error en index.js -> setupAPI(), el error es:", error)
  );