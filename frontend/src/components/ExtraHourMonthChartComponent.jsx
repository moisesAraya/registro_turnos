import { useEffect, useState } from 'react';
import { getExtraHoursMonthData } from '../services/charts.service.js';
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

const ExtraHourMonthChart = ({ area, year, month }) => {
    const [extraHours, setExtraHours] = useState([]);
    const [totalExtraHours, setTotalExtraHours] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const userData = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const email = userData.email;

    const fetchExtraHours = async () => {
        try {
            const response = await getExtraHoursMonthData(email, area, year, month);
            setExtraHours(response);

            const totalHours = response.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
            setTotalExtraHours(totalHours);

            const formattedData = {
                labels: response.labels,
                datasets: [
                    {
                        label: 'Horas extras',
                        data: response.datasets[0].data,
                        fill: false,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                    }
                ]
            }
            setExtraHours(formattedData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchExtraHours();
    }, [area, year, month]);

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
                    text: `Días del mes de ${monthName[month]}`,
                    font: { size: 15 }
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Horas extras',
                    font: { size: 15 }
                },
            }
        }
    }

    return (
        <div>
            {isLoading ? (
                <p>Cargando la data...</p>
            ) : extraHours ? (
                <>
                    <div style={{ width: '90%', height: '480px', margin: '0 auto', marginBottom: '40px' }}>
                        <h4 style={{ textAlign: 'left', marginLeft: '50px'}}>
                            Total de horas extras trabajadas en {monthName[month]} el {year}: {totalExtraHours} 
                        </h4>
                        <Line data={extraHours} options={options} />
                    </div>
                </>
            ) : (
                <p>No se encontraron datos</p>
            )}
        </div>
    );
}

export default ExtraHourMonthChart;