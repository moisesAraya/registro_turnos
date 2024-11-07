import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chrt as chartjs} from 'chart.js/auto';

function GraphBarra({chartData}) {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(user);
    useEffect(() => {
        fetch(`/api/user-data/${user.id}`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [user.id]);
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