"use strict";
import Joi from "joi";

export const qrBodyValidation = Joi.object({
  content: Joi.string().required().messages({
    "string.base": "El contenido debe ser una cadena de texto",
    "string.empty": "El contenido no puede estar vacío",
    "any.required": "El contenido es requerido",
  }),
});

export const qrQueryValidation = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.base": "El ID debe ser una cadena de texto",
    "string.empty": "El ID no puede estar vacío",
    "any.required": "El ID es requerido",
    "string.guid": "El ID debe ser un UUID válido",
  }),
});
