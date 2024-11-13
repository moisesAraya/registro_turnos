// Función para obtener los días trabajados en un mes específico
export const getDiasTrabajadosMes = (month, year) => {
    // Simulación de datos: número de días trabajados entre 15 y 22
    const diasTrabajados = Math.floor(Math.random() * (22 - 15 + 1)) + 15;
    return diasTrabajados;
};

// Función para obtener las horas trabajadas en un mes específico
export const getHorasTrabajadasMes = (month, year) => {
    // Simulación de datos: número de horas trabajadas entre 120 y 160
    const horasTrabajadas = Math.floor(Math.random() * (160 - 120 + 1)) + 120;
    return horasTrabajadas;
};

// Función para obtener las horas trabajadas en un año específico
export const getHorasTrabajadasYear = (year) => {
    // Simulación de datos: número de horas trabajadas en el año entre 1800 y 2000
    const horasTrabajadas = Math.floor(Math.random() * (2000 - 1800 + 1)) + 1800;
    return horasTrabajadas;
};