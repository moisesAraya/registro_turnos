import axios from './root.service.js';

export async function scanQR(scanPayload) {
    try {
        const response = await axios.post('/scan', scanPayload);
        console.log("Respuestaaaa: ", response);
        return response;
    } catch (error) {
        console.log("Error al hacer la peticion: ", error)
    }
}