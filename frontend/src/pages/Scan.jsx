import { useEffect, useState } from 'react';
import { getScanInfo } from '../services/charts.service.js';

const Scan = () => {
    const [scans, setScans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userData = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const email = userData.email;
    const fetchScans = async () => {
        try {
            const response = await getScanInfo(email);
            setScans(response);
            setIsLoading(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchScans();
    }, []);
    return (
        <div style={{ textAlign: 'left', marginTop: '110px' }}>
            <h1>Escaneos</h1>
            {isLoading ? (
                <p>Esperando la data...</p>
            ) : (
                <>
                {scans.length > 0 ? (
                    <ul>
                        {scans.map((scan) => (
                        <div key={scan.id}>
                            <li>
                                <p>Correo electronico: {scan.email}</p>
                                <p>Fecha escaneo: {scan.scanTime}</p>
                            </li>
                        </div>
                        ))}
                    </ul>
                ) : (
                    <p>No hay escaneos disponibles</p>
                )}
                </>
            )}
        </div>
    );
}

export default Scan;