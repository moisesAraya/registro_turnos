import { 
    handleErrorClient, 
    handleErrorServer, 
    handleSuccess } from "../handlers/responseHandlers.js";
    import { userQueryValidation } from "../validations/user.validation.js";
    import { 
        getDaysYearService,
        getExtraHoursYearService,
        getHoursYearService, 
    } from "../services/charts.service.js";


export const getChartDaysYear = async (req, res) => {
    try {
        const { email, year, area } = req.query;
        const { error: queryError } = userQueryValidation.validate({
            email
        });

        if (queryError) {
            handleErrorClient(
                res,
                400,
                "Error en la validación de los datos",
                queryError.message,
            );
        }

        const [Data, errorData] = await getDaysYearService({ email, year, area });

        if (errorData) return handleErrorClient(res, 404, "Error obteniendo los días", errorData);

        handleSuccess(res, 200, "Detalle de escaneo encontrado", Data);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
};  

export const getChartHoursYear = async (req, res) => {
    try {
        const { email, year, area } = req.query;
        const { error: queryError } = userQueryValidation.validate({
            email
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error en la validación de los datos",
                queryError.message,
            );
        }
        const [Data, errorData] = await getHoursYearService({ email, year, area });

        if (errorData) return handleErrorClient(res, 404, "Error obteniendo las horas", errorData);

        handleSuccess(res, 200, "Detalle de escaneo encontrado", Data);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
};

export const getChartExtraHoursYear = async (req, res) => {
    try {
        const { email, year, area } = req.query;
        const { error: queryError } = userQueryValidation.validate({
            email
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error en la validación de los datos",
                queryError.message,
            );
        }
        const [Data, errorData] = await getExtraHoursYearService({ email, year, area });

        if (errorData) return handleErrorClient(res, 404, "Error obteniendo las horas extra", errorData);

        handleSuccess(res, 200, "Detalle de escaneo encontrado", Data);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
};







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
