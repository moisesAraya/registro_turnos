import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MonthChart from "../components/MonthChartComponent";
import HourMonthChart from "../components/HourMonthChartComponent";
import ExtraHourMonthChart from "../components/ExtraHourMonthChartComponent";

const DetailCharts = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const nombre = userData.nombreCompleto;
    const rut = userData.rut;

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value, 10));
    };

    const [selectedArea, setSelectedArea] = useState(0);
    const [areas] = useState([
        { id: 0, work_area: 'Todas las áreas' },
        { id: 1, work_area: 'Maestro Cocina' },
        { id: 2, work_area: 'Ayudante' },
        { id: 3, work_area: 'Mesero' },
        { id: 4, work_area: 'Cajero y/o Anfitrión' },
        { id: 5, work_area: 'Aseo' },
        { id: 6, work_area: 'Bartender' },
    ]);
    const handleAreaChange = (e) => {
        setSelectedArea(parseInt(e.target.value, 10));
    };

    const [selectedMonth, setSelectedMonth] = useState(1);
    const months = [
        { id: 1, month: 'Enero' },
        { id: 2, month: 'Febrero' },
        { id: 3, month: 'Marzo' },
        { id: 4, month: 'Abril' },
        { id: 5, month: 'Mayo' },
        { id: 6, month: 'Junio' },
        { id: 7, month: 'Julio' },
        { id: 8, month: 'Agosto' },
        { id: 9, month: 'Septiembre' },
        { id: 10, month: 'Octubre' },
        { id: 11, month: 'Noviembre' },
        { id: 12, month: 'Diciembre' },
        
    ];
    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value, 10));
    };

    const selectedMonthName = months.find((month) => month.id === selectedMonth)?.month || "";

    const renderFilters = () => (
        <div style={{ textAlign: 'center', marginBottom: '10px', marginLeft: '0px'}}>
            <h3>Filtros:</h3>
            <label htmlFor="area" style={{ marginLeft: '0px' }}>Área de trabajo: </label>
            <select
                id="area"
                value={selectedArea}
                onChange={handleAreaChange}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
                {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                        {area.work_area}
                    </option>
                ))}
            </select>

            <label htmlFor="month" style={{ marginLeft: '30px'}}>Mes</label>
                <select 
                    id="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{ marginLeft: '10px', cursor: 'pointer'}}
                >
                    {months.map((month) => (
                        <option key={month.id} value={month.id}>
                            {month.month}
                        </option>
                    ))}
                </select>
            
            <label htmlFor="year" style={{ marginLeft: '30px'}}>Año: </label>
            <select 
                id="year"
                value={year}
                onChange={handleYearChange}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear - 1}>{currentYear - 1}</option>
                <option value={currentYear - 2}>{currentYear - 2}</option>
                <option value={currentYear - 3}>{currentYear - 3}</option>
                <option value={currentYear - 4}>{currentYear - 4}</option>
            </select>
        </div>
    );

    const nameArea = areas.find(area => area.id === selectedArea)?.work_area || 'Todas las áreas';

    return (
        <div id="charts-page-container" style={{textAlign: 'center', marginTop: '100px'}}>
            <div className="chart-block">
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', marginTop: '5px'}}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ 
                            textAlign: 'left',
                            marginRight: '0px',
                            backgroundColor: '#FF5722',
                            padding: '10px 20px',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}>
                        Retroceder
                    </button>
                </div>
            
                <h1>Detalles por mes para {nombre}</h1>
                <h1>RUT: {rut}</h1>
            </div>

            <div className="chart-block">
                <h2 style={{ marginBottom: '30px'}}>Total de asistencia en {selectedMonthName} del {year}</h2>
                <div className="chart-block">
                    {renderFilters()}
                </div>
                <div className="chart-block">
                    <h2>{nameArea}</h2>
                    <MonthChart area={selectedArea} year={year} month={selectedMonth} style={{ marginTop: '50px'}}/>
                </div>
            </div>

            <div className="chart-block">
                <h2 style={{ marginBottom: '30px'}}>Total de horas trabajadas en {selectedMonthName} del {year}</h2>
                <div className="chart-block">
                    {renderFilters()}
                </div>
                <div className="chart-block">
                    <h2>{nameArea}</h2>
                    <HourMonthChart area={selectedArea} year={year} month={selectedMonth} style={{ marginTop: '50px'}}/>
                </div>
            </div>

            <div className="chart-block">
                <h2 style={{ marginBottom: '30px'}}>Total de horas extra trabajadas en {selectedMonthName} del {year}</h2>
                <div className="chart-block">
                    {renderFilters()}
                </div>
                <div className="chart-block">
                    <h2>{nameArea}</h2>
                    <ExtraHourMonthChart area={selectedArea} year={year} month={selectedMonth} style={{ marginTop: '50px'}}/>
                </div>
            </div>
        </div>
    );
}

export default DetailCharts;