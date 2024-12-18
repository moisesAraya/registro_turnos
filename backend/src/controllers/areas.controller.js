import { AppDataSource } from "../config/configDb.js";
import Area from "../entity/area.js";

export const getAllAreas = async (req, res) => {
  try {
    const areaRepository = AppDataSource.getRepository(Area);
    const areas = await areaRepository.find();
    if (!areas || areas.length === 0) {
      return res.status(404).json({ message: "No se encontraron áreas de trabajo" });
    }
    res.status(200).json({
      message: "Áreas de trabajo encontradas",
      data: areas,
    });
  } catch (error) {
    console.error("Error al obtener áreas de trabajo:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
