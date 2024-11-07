import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chrt as chartjs} from 'chart.js/auto';
import { UserContext } from '../context/UserContext';

function GraphBarra({chartData}) {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        if (user) {
            fetch(`/api/user-data/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('User data:', data); // Verifica los datos aquí
                    setUserData(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setUserData(null); // Asegúrate de manejar el error adecuadamente
                });
        }
    }, [user]);
    if (!userData) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div>
            <h1>Datos del Usuario</h1>
            {/* Renderiza los datos del usuario */}
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
}

export default GraphBarra;