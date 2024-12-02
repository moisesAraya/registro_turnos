import { AppDataSource } from "../config/configDb.js";
import { WorkArea } from "../entity/WorkArea.js";

// Obtener todas las áreas de trabajo
export const getAllWorkAreas = async () => {
  const workAreaRepository = AppDataSource.getRepository(WorkArea);
  return await workAreaRepository.find();
};

// Obtener áreas de trabajo por ID de trabajador
export const getWorkAreasByWorkerId = async (worker_id) => {
  const workAreaRepository = AppDataSource.getRepository(WorkArea);
  return await workAreaRepository.find({ where: { worker_id } });
};

// Crear nueva área de trabajo
export const createWorkArea = async (work_area, worker_id) => {
  const workAreaRepository = AppDataSource.getRepository(WorkArea);
  const newWorkArea = workAreaRepository.create({
    work_area,
    worker_id,
    shift_date: new Date(),
  });
  return await workAreaRepository.save(newWorkArea);
};

// Actualizar área de trabajo
export const updateWorkArea = async (id, work_area) => {
  const workAreaRepository = AppDataSource.getRepository(WorkArea);
  const existingWorkArea = await workAreaRepository.findOneBy({ id });
  if (!existingWorkArea) throw new Error("Work area not found");
  existingWorkArea.work_area = work_area;
  return await workAreaRepository.save(existingWorkArea);
};

// Eliminar área de trabajo
export const deleteWorkArea = async (id) => {
  const workAreaRepository = AppDataSource.getRepository(WorkArea);
  const existingWorkArea = await workAreaRepository.findOneBy({ id });
  if (!existingWorkArea) throw new Error("Work area not found");
  await workAreaRepository.remove(existingWorkArea);
};