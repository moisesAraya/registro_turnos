import Joi from "joi";

// Validar worker_id
export const validateWorkerId = (worker_id) => {
  const schema = Joi.number().integer().positive().required();
  return schema.validate(worker_id);
};

// Validar datos al crear un área de trabajo
export const validateWorkAreaData = (data) => {
  const schema = Joi.object({
    work_area: Joi.string().required(),
    worker_id: Joi.number().integer().positive().required(),
  });
  return schema.validate(data);
};

// Validar ID
export const validateId = (id) => {
  const schema = Joi.number().integer().positive().required();
  return schema.validate(id);
};

// Validar nombre de área de trabajo
export const validateWorkArea = (work_area) => {
  const schema = Joi.string().required();
  return schema.validate(work_area);
};