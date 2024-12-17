import { useEffect, useState } from 'react';
import { getScanHours } from '../services/charts.service.js';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
} from 'chart.js';
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
)

export const HourLineChart = ({ email, year, area }) => {
    const [scans, setScans] = useState([]);
    const [hours, setHours] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchScans = async () => {
        try {
            const response = await getScanHours(email, year, area);
            setScans(response);

            const totalHours = response.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
            setHours(totalHours);

            const formattedData = {
                labels: response.labels,
                datasets: [
                    {
                        label: 'Horas trabajadas',
                        data: response.datasets[0].data,
                        fill: false,
                        borderColor: 'rgba(209, 190, 207)',
                        tension: 0
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
    }, [year, area, email]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tittle: {
                display: true,
                text: 'Horas trabajadas por mes'
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
                    text: 'Cantidad de horas',
                    font: { size: 15 }
                }
            }
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Cargando la data...</p>
            ) : scans ? (
                <>
                    <h4 style={{ marginLeft: '100px', marginTop: '0px', textAlign: 'left'}}>
                        Cantidad de horas trabajadas en {year}: {hours}
                    </h4>
                    <div style={{ width: '90%', height: '450px', margin: '0 auto 0' }}>
                        < Line options={options} data={scans} />
                    </div>
                </>
            ) : (
                <p>No hay data para mostrar</p>
            )}
        </div>
    )
}

export default HourLineChart;