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
            y: {
                beginAtZero: true,
                min: 0,
            }
        }
    };
    return <Bar options={options} data={BarChartData} />
}