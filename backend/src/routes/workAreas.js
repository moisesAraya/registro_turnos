import express from "express";
import { AppDataSource } from "../config/configDb.js";
import { WorkArea } from "../entity/WorkArea.js";

const router = express.Router();
//POST creacion de area de trabajo
router.post("/", async (req, res) => {
    let { worker_id, work_area } = req.body;

    
    worker_id = parseInt(worker_id, 10);
    if (isNaN(worker_id)) {
        return res.status(400).json({ error: "worker_id must be a valid integer" });
    }

    try {
        const workAreaRepository = AppDataSource.getRepository(WorkArea);
        const newWorkArea = workAreaRepository.create({
            worker_id,
            work_area,
            shift_date: new Date(),
        });

        await workAreaRepository.save(newWorkArea);
        res.status(201).json(newWorkArea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ obtener las seleccione del area de trabajo
router.get("/:worker_id", async (req, res) => {
    const { worker_id } = req.params;
    try {
        const workAreaRepository = AppDataSource.getRepository(WorkArea);
        const workAreas = await workAreaRepository.find({
            where: { worker_id },
        });
        res.json(workAreas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE actualizar area de trabajo
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { work_area } = req.body;
    try {
        const workAreaRepository = AppDataSource.getRepository(WorkArea);
        const workArea = await workAreaRepository.findOneBy({ id });
        if (!workArea) return res.status(404).json({ error: "Work area not found" });

        workArea.work_area = work_area;
        await workAreaRepository.save(workArea);
        res.json(workArea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE eliminar area de trabajo
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const workAreaRepository = AppDataSource.getRepository(WorkArea);
        const workArea = await workAreaRepository.findOneBy({ id });
        if (!workArea) return res.status(404).json({ error: "Work area not found" });

        await workAreaRepository.remove(workArea);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;