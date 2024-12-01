import { 
    getScanDetailService,
    getScanInfo
} from "../services/charts.service.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";
import { userQueryValidation } from "../validations/user.validation.js";

export const getCharts = async (req, res) => {
    try {
        const [scans, errorScans] = await getScanInfo();

        if (errorScans) return handleErrorClient(res, 404, errorScans);

        scans.length === 0
        ? handleSuccess(res, 204)
        : handleSuccess(res, 200, "Escaneos encontrados", scans);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
};

export const getChartsDetail = async (req, res) => {
    try {
        const { email } = req.query;
        const { error: queryError } = userQueryValidation.validate({
            email,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error en la validación de la consulta",
                queryError.message,
            );
        }

        const [scanDetail, errorScanDetail] = await getScanDetailService({ email });

        if (errorScanDetail) return handleErrorClient(res, 404, "Error obteniendo datos", errorScanDetail);

        handleSuccess(res, 200, "Detalle de escaneo encontrado", scanDetail);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
};

export const getChartsFormatted = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};