import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { BarChartData } from "../data.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarChart = () => {
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
    return <Bar options={options} data={BarChartData} />
}