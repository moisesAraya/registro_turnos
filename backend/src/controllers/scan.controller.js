// Importa la configuración de la base de datos desde el archivo de configuración
import { AppDataSource } from "../config/configDb.js";

// Importa la entidad "Scan", que representa una tabla en la base de datos
import { Scan } from "../entity/Scan.js";

// Define la función `registrarEscaneo`, un controlador que manejará la solicitud para registrar un escaneo
export const registrarEscaneo = async (req, res) => {
  // Extrae los datos enviados en el cuerpo de la solicitud
  const { qrContent, name, email, scanTime } = req.body;

  try {
    // Obtiene el repositorio para la entidad "Scan" (manejo de la tabla "Scan" en la base de datos)
    const scanRepository = AppDataSource.getRepository(Scan);

    // Crea una nueva instancia de la entidad "Scan" con los datos recibidos
    const newScan = scanRepository.create({
      qrContent, // Contenido del código QR escaneado
      name,      // Nombre de la persona que escaneó
      email,     // Correo electrónico de la persona
      scanTime,  // Momento en el que se realizó el escaneo
    });

    // Guarda el nuevo registro en la base de datos
    await scanRepository.save(newScan);

    // Responde al cliente con un estado 201 (creado) y un mensaje de éxito
    res.status(201).json({ message: "Escaneo registrado exitosamente" });
  } catch (error) {
    // Si ocurre un error, se imprime en la consola para fines de depuración
    console.error("Error al registrar el escaneo:", error);

    // Envía una respuesta al cliente con un estado 500 (error interno del servidor) y un mensaje de error
    res.status(500).json({ message: "Error al registrar el escaneo" });
  }
};

// Exporta el controlador como parte del módulo
export default {
  registrarEscaneo,
};
