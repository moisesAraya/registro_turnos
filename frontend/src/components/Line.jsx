import {Line} from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
} from 'chart.js';
import { LineChartData } from '../data.js';
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
)

export const LineChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
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

    return < Line options={options} data={LineChartData} />
}