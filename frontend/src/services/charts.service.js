import axios from './root.service.js';

export async function getScanDays (email, year, area) {
    try {
        const response = await axios.get(`/charts/days-month-year/?email=${email}&year=${year}&area=${area}`);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getScanHours (email, year, area) {
    try {
        const response = await axios.get(`/charts/hours/?email=${email}&year=${year}&area=${area}`);
        return response.data.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getScanExtraHours (email, year, area) {
    try {
        const response = await axios.get(`/charts/extra-hours/?email=${email}&year=${year}&area=${area}`);
        return response.data.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getMonthData (email, area, year, month) {
    try {
        const response = await axios.get(`/charts/months/?email=${email}&area=${area}&year=${year}&month=${month}`);
        return response.data.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getHoursMonthData (email, area, year, month) {
    try {
        const response = await axios.get(`/charts/hours-month/?email=${email}&area=${area}&year=${year}&month=${month}`);
        return response.data.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getExtraHoursMonthData (email, area, year, month) {
    try {
        const response = await axios.get(`/charts/extra-hours-month/?email=${email}&area=${area}&year=${year}&month=${month}`);
        return response.data.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}