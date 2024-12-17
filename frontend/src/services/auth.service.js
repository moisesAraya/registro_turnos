import axios from './root.service.js';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { convertirMinusculas } from '@helpers/formatData.js';

export async function login(dataUser) {
    try {
        const response = await axios.post('/auth/login', {
            email: dataUser.email,
            password: dataUser.password,
        });

        const { status, data } = response;

        if (status === 200) {
            const token = data.data.token; // Obtener el token correctamente
            const decoded = jwtDecode(token); // Decodificar el token

            // Extraer el ID y demás datos del token decodificado
            const { id, nombreCompleto, email, rut, rol } = decoded;

            if (!id) {
                console.error("El token no contiene el ID del usuario.");
                throw new Error("Token inválido: falta el ID del usuario.");
            }

            const userData = { id, nombreCompleto, email, rut, rol };

            // Guardar datos del usuario y token en sessionStorage
            sessionStorage.setItem('usuario', JSON.stringify(userData));
            sessionStorage.setItem('token', token);

            // Configurar el encabezado Authorization por defecto en Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return response.data;
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data || error.message);
        return error.response?.data || { message: "Error inesperado" };
    }
}

export async function register(data) {
    try {
        const dataRegister = convertirMinusculas(data);
        const { nombreCompleto, email, rut, password } = dataRegister;

        const response = await axios.post('/auth/register', {
            nombreCompleto,
            email,
            rut,
            password,
        });

        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error.response?.data || error.message);
        return error.response?.data || { message: "Error inesperado" };
    }
}

export async function logout() {
    try {
        await axios.post('/auth/logout');

        // Eliminar datos de sessionStorage y cookies
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
        cookies.remove('jwt-auth');

        // Limpiar encabezados globales
        delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}
