import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarChartPrueba = () => {
    const [barData, setBarData] = useState(null);
    
    useEffect(() => {
        const fetchBarData = async () => {
            const response = await axios.get('/api/charts/dias-trabajados');
            setBarData(response.data);
        };
        fetchBarData();
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
            y: {
                beginAtZero: true,
                min: 0,
            }
        }
    };
    return (
        <div>
            {barData && <Bar options={options} data={barData} />}
        </div>
    );
};

export default BarChartPrueba;