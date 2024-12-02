import {
    getAllWorkAreas,
    getWorkAreasByWorkerId,
    createWorkArea,
    updateWorkArea,
    deleteWorkArea,
  } from "../services/workArea.service.js";
  
  // Obtener todas las áreas de trabajo
  export const handleGetAllWorkAreas = async (req, res) => {
    try {
      const workAreas = await getAllWorkAreas();
      res.json(workAreas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener áreas de trabajo por ID de trabajador
  export const handleGetWorkAreasByWorkerId = async (req, res) => {
    const { worker_id } = req.params;
    try {
      const workAreas = await getWorkAreasByWorkerId(worker_id);
      res.json(workAreas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Crear nueva área de trabajo
  export const handleCreateWorkArea = async (req, res) => {
    const { work_area, worker_id } = req.body;
    try {
      const newWorkArea = await createWorkArea(work_area, worker_id);
      res.status(201).json(newWorkArea);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar área de trabajo
  export const handleUpdateWorkArea = async (req, res) => {
    const { id } = req.params;
    const { work_area } = req.body;
    try {
      const updatedWorkArea = await updateWorkArea(id, work_area);
      res.json(updatedWorkArea);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar área de trabajo
  export const handleDeleteWorkArea = async (req, res) => {
    const { id } = req.params;
    try {
      await deleteWorkArea(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };