import {
  getAllWorkAreas,
  getWorkAreasByWorkerId,
  createWorkArea,
  updateWorkArea,
  deleteWorkArea,
} from "../services/workArea.service.js";

import {
  validateWorkerId,
  validateWorkAreaData,
  validateId,
} from "../validations/workArea.validation.js";

// Obtener todos los registros de áreas de trabajo
export const handleGetAllWorkAreas = async (req, res) => {
  try {
    const workAreas = await getAllWorkAreas();
    if (!workAreas || workAreas.length === 0) {
      return res.status(404).json({ message: "No se encontraron registros áreas de trabajo" });
    }
    res.status(200).json({
      message: "Registro de selección de área de trabajo encontradas",
      data: workAreas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener áreas de trabajo por ID de trabajador
export const handleGetWorkAreasByWorkerId = async (req, res) => {
  try {
    const { worker_id } = req.params;
    const { error } = validateWorkerId(worker_id);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const workAreas = await getWorkAreasByWorkerId(worker_id);
    if (!workAreas || workAreas.length === 0) {
      return res.status(404).json({ message: "No se encontraron áreas de trabajo para este trabajador" });
    }
    res.status(200).json({
      message: "Áreas de trabajo encontradas",
      data: workAreas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar área de trabajo
export const handleCreateWorkArea = async (req, res) => {
  try {
    const { error } = validateWorkAreaData(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { work_area_id, worker_id } = req.body;
    const newWorkArea = await createWorkArea(work_area_id, worker_id);
    res.status(201).json({
      message: "Área de trabajo registrada exitosamente",
      data: newWorkArea,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar área de trabajo
export const handleUpdateWorkArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { work_area_id, worker_id } = req.body;

    const idError = validateId(id).error;
    if (idError) return res.status(400).json({ message: idError.details[0].message });

    const updatedWorkArea = await updateWorkArea(id, { work_area_id, worker_id });
    res.status(200).json({
      message: "Área de trabajo actualizada exitosamente",
      data: updatedWorkArea,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar área de trabajo
export const handleDeleteWorkArea = async (req, res) => {
  try {
    const { id } = req.params;

    const idError = validateId(id).error;
    if (idError) return res.status(400).json({ message: idError.details[0].message });

    await deleteWorkArea(id);
    res.status(200).json({ message: "Área de trabajo eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};