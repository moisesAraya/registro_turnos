import { 
    getAttendanceDaysService,
    getAttendanceHoursService
} from "../services/charts.service.js"; 
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";
import { userQueryValidation } from "../validations/user.validation.js";

export const getChartDays = async (req, res) => {
    try {
        const { email, year, area } = req.query;

        const { error: queryError } = userQueryValidation.validate({ email });
        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error en la validación de la consulta",
                queryError.message
            );
        }

        const [data, error] = await getAttendanceDaysService({ email, year, area });
        if (error) {
            return handleErrorClient(res, 404, "Error al obtener días trabajados", error);
        }

        handleSuccess(res, 200, "Días trabajados obtenidos exitosamente", data);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

export const getChartHours = async (req, res) => {
    try {
        const { email, year, area } = req.query;

        const { error: queryError } = userQueryValidation.validate({ email });
        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error en la validación de la consulta",
                queryError.message
            );
        }

        const [data, error] = await getAttendanceHoursService({ email, year, area });
        if (error) {
            return handleErrorClient(res, 404, "Error al obtener horas trabajadas", error);
        }

        handleSuccess(res, 200, "Horas trabajadas obtenidas exitosamente", data);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

// Define `getChartDetails` si es necesario
export const getChartDetails = async (req, res) => {
    try {
        // Implementar lógica para `getChartDetails` si aplica
        handleSuccess(res, 200, "Detalles de gráficos no implementados");
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};
