import { useEffect, useState } from 'react';
import { getScanInfo } from '../services/charts.service.js';
import { LineChart } from '../components/Line.jsx';
import { BarChart } from '../components/Bar.jsx';

const Charts = () => {
    const [scans, setScans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userData = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const email = userData.email;
    const fetchScans = async () => {
        try {
            const response = await getScanInfo(email);
            setScans(response);
            setIsLoading(false);
            console.log(response);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchScans();
    }, []);
    return (
        <div style={{ textAlign: 'center', marginTop: '110px' }}>
            {isLoading ? (
                <p>Esperando la informacion...</p>
            ): (
                <>
                <h1>Gráficos</h1>
                <h4>Horas Trabajadas por mes</h4>
                <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
                    <LineChart />
                </div>
                <h4>Días trabajados por mes</h4>
                <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
                    <BarChart />
                </div>
                </>
            )}
        </div>
    );
}

export default Charts;