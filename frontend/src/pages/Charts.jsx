import { LineChart } from '../components/Line.jsx';
import { BarChart } from '../components/Bar.jsx';

const Charts = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <p>Horas trabajadas por mes</p>
            <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
                <LineChart />
            </div>
            <p>Días trabajados por mes</p>
            <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
                <BarChart />
            </div>
        </div>
    );
}

export default Charts;