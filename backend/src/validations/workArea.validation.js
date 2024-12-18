import Joi from "joi";

// Validar worker_id
export const validateWorkerId = (worker_id) => {
  const schema = Joi.number().integer().positive().required();
  return schema.validate(worker_id);
};

// Validar datos al crear un área de trabajo
export const validateWorkAreaData = (data) => {
  const schema = Joi.object({
    work_area_id: Joi.number().required(),
    worker_id: Joi.number().integer().positive().required(),
  });
  return schema.validate(data);
};

// Validar ID
export const validateId = (id) => {
  const schema = Joi.number().integer().positive().required();
  return schema.validate(id);
};