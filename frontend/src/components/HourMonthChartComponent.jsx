import { useEffect, useState } from 'react';
import { getHoursMonthData } from '../services/charts.service.js';
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

const HourMonthChart = ({ email, area, year, month }) => {
    const [hours, setHours] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHours = async () => {
        try {
            const response = await getHoursMonthData(email, area, year, month);
            setHours(response);

            const totalHours = response.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
            setTotalHours(totalHours);

            const formattedData = {
                labels: response.labels,
                datasets: [
                    {
                        label: 'Horas trabajadas',
                        data: response.datasets[0].data,
                        fill: false,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                    }
                ]
            }
            setHours(formattedData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchHours();
    }, [area, year, month, email]);

    const monthName = [
        "",
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: `Día del mes de ${monthName[month]}`,
                    font: {
                        size: 1
                    }
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Horas',
                    font: { size: 15 }
                },
            }
        }
    }

    return (
        <div>
            {isLoading ? (
                <p>Cargando la data...</p>
            ) : hours ? (
                <>
                    <div style={{ width: '90%', height: '480px', margin: '0 auto', marginBottom: '10px' }}>
                        <h4 style={{ textAlign: 'left', marginLeft: '40px'}}>
                            Total de horas trabajadas el {year}: {totalHours}
                        </h4>
                        <Line data={hours} options={options} />
                    </div>
                </>
            ) : (
                <p>No se pudo cargar la data</p>
            )}
        </div>
    )
}

export default HourMonthChart;