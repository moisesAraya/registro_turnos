import React, { useState, useEffect } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../services/event.service";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importar iconos
import "../styles/events.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState("");
  const [shift, setShift] = useState("Mañana");
  const [editingEventId, setEditingEventId] = useState(null);

  // Obtener eventos
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  // Crear evento
  const handleCreateEvent = async () => {
    if (!description) return alert("La descripción no puede estar vacía.");
    try {
      await createEvent({ description, createdBy: "Administrador", shift });
      setDescription("");
      fetchEvents();
    } catch (error) {
      console.error("Error al crear evento:", error);
    }
  };

  // Actualizar evento
  const handleUpdateEvent = async (id, newDescription) => {
    try {
      await updateEvent(id, { description: newDescription });
      setEditingEventId(null);
      fetchEvents();
    } catch (error) {
      console.error("Error al actualizar evento:", error);
    }
  };

  // Eliminar evento con confirmación
  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar este evento?");
    if (!confirmDelete) return;
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error("Error al borrar evento:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h1>Eventos</h1>
      <div className="create-event">
        <textarea
          placeholder="Descripción del evento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={shift} onChange={(e) => setShift(e.target.value)}>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
        <button onClick={handleCreateEvent}>Registrar Evento</button>
      </div>
      <div className="events-list">
        <h2>Eventos Pasados</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="event-item">
              {editingEventId === event.id ? (
                <>
                  <textarea
                    defaultValue={event.description}
                    onBlur={(e) => handleUpdateEvent(event.id, e.target.value)}
                  />
                  <button onClick={() => setEditingEventId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <p>{event.description}</p>
                  <span>Turno: {event.shift}</span>
                  <span>Creado por: {event.createdBy}</span>
                  <span>{new Date(event.createdAt).toLocaleString()}</span>
                  <div className="event-actions">
                    <button className="edit-btn" onClick={() => setEditingEventId(event.id)}>
                      <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsPage;
