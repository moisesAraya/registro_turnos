import axios from './root.service.js';

export async function getScanData () {
    try {
        const response = await axios.get('/charts/');
        return response.data.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getScanInfo (email) {
    try {
        const response = await axios.get(`/charts/detail/?email=${email}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}