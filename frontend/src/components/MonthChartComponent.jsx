import { useEffect, useState } from 'react';
import { getMonthData } from '../services/charts.service.js';
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

const MonthChart = ({ email, area, year, month }) => {
    const [scans, setScans] = useState([]);
    const [days, setDays] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchScans = async () => {
        try {
            const response = await getMonthData(email, area, year, month);
            setScans(response);

            const totalDays = response.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
            setDays(totalDays);

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
                    text: `Día del mes de ${monthName[month]}`,
                    font: { size: 15 }
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Asistencia',
                    font: { size: 15 },
                },
                ticks: {
                    font: { size: 15 },
                    callback: function(value) {
                        if (value === 1) {
                            return "Asiste"; 
                        } else if (value === 0) {
                            return "No asiste"; 
                        }
                        return null; 
                    }
                }
            }
        },
    };

    return (
        <div>
            {isLoading ? (
                <p>Cargando la data...</p>
            ) : scans ? (
                <>
                    <div style={{ width: '90%', height: '480px', margin: '0 auto 0' }}>
                        <h4 style={{ textAlign: 'left', marginLeft: '100px'}}>
                            Total de días asistidos en {monthName[month]} del {year}: {days}
                        </h4>
                        < Bar options={options} data={scans} />
                    </div>
                </>
            ) : (
                <p>No hay data para mostrar</p>
            )}
        </div>
    )
}

export default MonthChart;