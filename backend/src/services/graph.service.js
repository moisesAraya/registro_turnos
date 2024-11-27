import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb";

export async function getUserId(User){
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if (!users || users.length === 0) return [null, "No hay usuarios"];

        return users.map(({ id }) => ({ id }));
    } catch (error) {
        console.error("Error al obtener a los usuarios:", error);
        return [null, "Error interno del servidor"];
    }
}