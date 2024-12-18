import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/areaSelection.css";

const AreaSelectionModal = ({ userId, onClose, onSubmit }) => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/areas`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setAreas(response.data.data);
      } catch (error) {
        console.error("Error al obtener áreas de trabajo:", error);
        alert("Error al cargar las áreas de trabajo. Por favor, inténtelo más tarde.");
      }
    };

    fetchAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedArea) {
      alert("Por favor selecciona un área de trabajo.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/work_areas`,
        {
          worker_id: userId,
          work_area_id: selectedArea,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      alert("Área de trabajo registrada exitosamente.");
      onSubmit();
    } catch (error) {
      console.error("Error al registrar área de trabajo:", error);
      alert("Error al registrar el área de trabajo. Por favor, inténtelo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Seleccionar Área de Trabajo</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="area-select">Área de trabajo:</label>
          <select
            id="area-select"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            required
          >
            <option value="">-- Selecciona un área --</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AreaSelectionModal;
