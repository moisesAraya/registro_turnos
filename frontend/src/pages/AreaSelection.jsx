import React, { useState } from 'react';
import AreaSelectionComponent from '@components/AreaSelectionComponent';
import '@styles/areaSelection.css';

const AreaSelection = () => {
  // Lista fija de áreas de trabajo
  const [areas] = useState([
    { id: 1, work_area: 'Maestro Cocina' },
    { id: 2, work_area: 'Ayudante' },
    { id: 3, work_area: 'Mesero' },
    { id: 4, work_area: 'Cajero y/o Anfitrión' },
    { id: 5, work_area: 'Aseo' },
    { id: 6, work_area: 'Bartender' },
  ]);
  const [selectedArea, setSelectedArea] = useState(''); 
  const [responseMessage, setResponseMessage] = useState(''); 

  // Leer la URL base desde el archivo .env del frontend
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSelection = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Enviando área seleccionada:', selectedArea);

      // POST al backend
      const response = await fetch(`${BASE_URL}/work_areas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ work_area: selectedArea, worker_id: 1 }),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar área: ${response.status}`);
      }

      const result = await response.json();
      console.log('Área guardada:', result);
      setResponseMessage('Área guardada correctamente');
    } catch (error) {
      console.error('Error al guardar área:', error);
      setResponseMessage('Error al guardar área');
    }
  };

  return (
    <div className="area-selection-page">
      <h1>Seleccionar Área de Trabajo</h1>
      <AreaSelectionComponent
        areas={areas}
        selectedArea={selectedArea}
        onSelection={handleSelection}
        onSubmit={handleSubmit}
      />
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AreaSelection;