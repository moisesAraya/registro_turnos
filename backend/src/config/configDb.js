"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD, PORT } from "./configEnv.js";

console.log("Host:", HOST);
console.log("Port:", PORT);
console.log("User:", DB_USERNAME);
console.log("Password:", PASSWORD);
console.log("Database:", DATABASE);

// Configuración de TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: parseInt(PORT) || 5432,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: ["src/entity/**/*.js"],
  synchronize: true,
  logging: false,
});

// Conexión a la Base de Datos
export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}