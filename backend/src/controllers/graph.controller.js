import { AppDataSource } from "../config/configDb";
import { Escanea } from "../entity/escanea.js";

export const obtenerGraph = async (req, res) => {
    try {
        const graphRepository = AppDataSource.getRepository(Escanea);
        const graph = await graphRepository.find();

        if (!graph) {
            return res.status(404).json({ message: "No hay datos disponibles" });
        }

        res.json({ codeData: graph.codeData });
    } catch (error) {
        console.error("Error al obtener el gráfico:", error);
        return res.status(500).json({ message: "Error al obtener el gráfico", error: error.message });
    }
};