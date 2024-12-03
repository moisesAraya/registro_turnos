import { useEffect, useState } from 'react';
import { getScanInfo } from '../services/charts.service.js';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Charts = () => {
    const [scans, setScans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userData = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const email = userData.email;

    const fetchScans = async () => {
        try {
            const response = await getScanInfo(email);
            setScans(response);
            
            const formattedData = {
                labels: response.labels,
                datasets: [
                    {
                        label: 'Dias trabajados',
                        data: response.datasets[0].data,
                        backgroundColor: [
                            'rgba(209, 190, 207, 0.7)',
                            'rgba(160, 210, 219, 0.7)'],
                        borderColor: "rgb(75, 192, 192)",
                    }
                ]
            }
            setScans(formattedData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchScans();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            tittle: {
                display: true,
                text: 'Dias trabajados por mes'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Meses',
                    font: { size: 15 }
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                title: {
                    display: true,
                    text: 'Cantidad de días',
                    font: { size: 15 }
                }
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '110px' }}>
            <h1>Escaneos</h1>
            <h4>Días trabajados por mes</h4>
            {isLoading ? (
                <p>Esperando la data...</p>
            ) : scans ? (
                <>  
                    <div style={{ width: '60%', height: '600px', margin: '0 auto' }}>
                        <Bar options={options} data={scans} />
                    </div>
                </>
                ) : (
                    <p>No hay escaneos disponibles</p>
                )}
        </div>
    );
}

export default Charts;