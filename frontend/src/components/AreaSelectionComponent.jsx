// src/components/AreaSelectionComponent.jsx
import React from 'react';

const AreaSelectionComponent = ({ areas, selectedArea, onSelection, onSubmit }) => {
  console.log('Propiedades recibidas en AreaSelectionComponent:', areas);
  return (
    <form onSubmit={onSubmit} className="area-selection-form">
      <label htmlFor="work-area">Seleccione un área de trabajo:</label>
      <select
        id="work-area"
        value={selectedArea}
        onChange={onSelection}
        required
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {areas.map((area) => (
          <option key={area.id} value={area.work_area}>
            {area.work_area}
          </option>
        ))}
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AreaSelectionComponent;