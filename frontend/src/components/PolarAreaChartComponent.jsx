import { useEffect, useState } from "react";
import { getScanDays } from "../services/charts.service";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend
);

const PolarAreaChart = ({ email, year, area }) => {
    const [scans, setScans] = useState([]);
    const [days, setDays] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchScans = async () => {
        try {
            const response = await getScanDays(email, year, area);
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
                            'rgba(255, 193, 7, 0.7)',
                            'rgba(255, 87, 34, 0.7)',
                            'rgba(76, 175, 80, 0.7)',
                            'rgba(33, 150, 243, 0.7)',
                            'rgba(156, 39, 176, 0.7)',
                            'rgba(121, 85, 72, 0.7)',
                            'rgba(255, 235, 59, 0.7)',
                            'rgba(3, 169, 244, 0.7)',
                            'rgba(244, 67, 54, 0.7)',
                            'rgba(139, 195, 74, 0.7)',
                            'rgba(0, 188, 212, 0.7)',
                            'rgba(103, 58, 183, 0.7)',
                        ],
                        borderColor: 'rgb(255, 255, 255)',
                        borderWidth: 0,
                    },
                ],
            };
            setScans(formattedData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        fetchScans();
    }, [area, year, email]);

    const options = {
        plugins: {
            title: {
                display: false,
                text: 'Días trabajados por mes',
                font: {
                    size: 20,
                },
            },
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <div>
            {isLoading ? (
                <div>
                    Cargando...
                </div>
            ) : scans ? (
                <>
                    <h4 style={{ textAlign: 'left', marginLeft: '100px' }}>
                    Total de días trabajados en {year}: {days}</h4>
                    <div style={{ width: '90%', maxWidth: '700px', height: 'auto', margin: 'auto', marginLeft: '150px' }}>
                        <PolarArea data={scans} options={options} />  
                    </div>
                </>
            ) : (
                <div>
                    No hay datos para mostrar
                </div>
            )}
        </div>
    );
};

export default PolarAreaChart;