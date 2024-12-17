import { AppDataSource } from "../config/configDb.js";
import Event from "../entity/Event.js";
import User from "../entity/user.entity.js";

// Crear un evento (solo para administradores)
export const createEvent = async (req, res) => {
  const { description, shift } = req.body;

  if (!description || !shift) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const eventRepository = AppDataSource.getRepository(Event);

    // Obtener el usuario autenticado
    const user = await userRepository.findOneBy({ id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Validar que el usuario sea administrador
    if (req.user.rol !== "administrador") {
      return res.status(403).json({ message: "No tienes permisos para crear un evento." });
    }

    // Crear el evento con la relación al usuario
    const newEvent = eventRepository.create({
      description,
      shift,
      user, // Relación al usuario autenticado
      createdAt: new Date(),
    });

    await eventRepository.save(newEvent);

    res.status(201).json({
      message: "Evento creado con éxito",
      event: {
        id: newEvent.id,
        description: newEvent.description,
        shift: newEvent.shift,
        createdAt: newEvent.createdAt,
        createdBy: user.nombreCompleto, // Nombre completo del usuario
      },
    });
  } catch (error) {
    console.error("Error al crear evento:", error.message);
    res.status(500).json({ message: "Error al crear evento", error: error.message });
  }
};

// Obtener eventos (disponible para todos)
export const getEvents = async (req, res) => {
  try {
    const eventRepository = AppDataSource.getRepository(Event);

    const events = await eventRepository.find({
      relations: ["user"], // Incluye la relación con el usuario
      order: { createdAt: "DESC" },
    });

    // Formatear la respuesta para incluir el nombre completo del usuario
    const formattedEvents = events.map((event) => ({
      id: event.id,
      description: event.description,
      shift: event.shift,
      createdAt: event.createdAt,
      createdBy: event.user?.nombreCompleto || "Desconocido", // Evita fallos si no hay usuario
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error("Error al obtener eventos:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Modificar un evento (solo para administradores)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { description, shift } = req.body;

  if (!id || (!description && !shift)) {
    return res.status(400).json({ message: "Datos insuficientes para actualizar el evento." });
  }

  try {
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({ id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado." });
    }

    // Validar permisos
    if (req.user.rol !== "administrador") {
      return res.status(403).json({ message: "No tienes permisos para modificar el evento." });
    }

    if (description) event.description = description;
    if (shift) event.shift = shift;

    await eventRepository.save(event);

    res.status(200).json({ message: "Evento actualizado con éxito", event });
  } catch (error) {
    console.error("Error al actualizar evento:", error.message);
    res.status(500).json({ message: "Error al actualizar evento", error: error.message });
  }
};

// Eliminar un evento (solo para administradores)
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Se requiere el ID del evento para eliminarlo." });
  }

  try {
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({ id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado." });
    }

    // Validar permisos
    if (req.user.rol !== "administrador") {
      return res.status(403).json({ message: "No tienes permisos para eliminar el evento." });
    }

    await eventRepository.remove(event);

    res.status(200).json({ message: "Evento eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar evento:", error.message);
    res.status(500).json({ message: "Error al eliminar evento", error: error.message });
  }
};
