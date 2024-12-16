import { AppDataSource } from "../config/configDb.js";
import Event from "../entity/Event.js";

// Crear un evento (solo para administradores)
export const createEvent = async (req, res) => {
  const { description, createdBy, shift } = req.body;

  if (!description || !createdBy || !shift) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const eventRepository = AppDataSource.getRepository(Event);
    const newEvent = eventRepository.create({
      description,
      createdBy,
      shift,
      createdAt: new Date(),
    });

    await eventRepository.save(newEvent);
    res.status(201).json({ message: "Evento creado con éxito", event: newEvent });
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
      order: { createdAt: "DESC" },
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error al obtener eventos:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Modificar un evento (solo para administradores)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { description, shift } = req.body;

  if (!id || (!description && !shift)) {
    return res.status(400).json({ message: "Datos insuficientes para actualizar el evento" });
  }

  try {
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({ id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
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
    return res.status(400).json({ message: "Se requiere el ID del evento para eliminarlo" });
  }

  try {
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({ id });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    await eventRepository.remove(event);
    res.status(200).json({ message: "Evento eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar evento:", error.message);
    res.status(500).json({ message: "Error al eliminar evento", error: error.message });
  }
};
