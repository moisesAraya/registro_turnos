import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/users/useGetUsers";
import HourLineChart from "../components/HourLineChartComponent";
import ExtraHourLineChart from "../components/ExtraHourLineChartComponent";
import PolarAreaChart from "../components/PolarAreaChartComponent";
import '../styles/charts.css';

const Charts = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const nombre = userData.nombreCompleto;
    const rol = userData.rol;
    const emailUsuario = userData.email;

    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    const [selectedUser, setSelectedUser] = useState({ rut: '', email: '' });
    const { users } = useUsers();

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

    const handleUserChange = (e) => {
        const selectedRut = e.target.value;
        const user = users.find(user => user.rut === selectedRut) || { rut: '', email: '' };
        setSelectedUser({ rut: user.rut, email: user.email });
    };

    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value, 10));
    };

    const handleAreaChange = (e) => {
        setSelectedArea(parseInt(e.target.value, 10));
    };

    const emailCharts = rol === "administrador" && selectedUser.email ? selectedUser.email : emailUsuario;

    const titulo = () => (
        <div>
            {rol === 'administrador' && (
                <h1>
                    Resumen anual de trabajadores
                </h1>
            )}
            {rol === 'usuario' && (
                <h1>
                    Resumen anual de {nombre}
                </h1>
            )}
        </div>
    );

    const renderFilters = () => (
        <div style={{ textAlign: 'center', marginBottom: '5px', marginLeft: '0px'}}>
            <h3>Filtros:</h3>

            <div>
                {rol === "administrador" && (
                    <>
                        <label htmlFor="user">Trabajador:</label>
                        <select 
                            id="user"
                            value={selectedUser.rut}
                            onChange={handleUserChange}
                            style={{ marginLeft: '10px', cursor: 'pointer', marginBottom: '25px' }}
                        >
                            <option value="">Seleccionar trabajador</option>
                                {users.map(user => (
                                    <option key={user.rut} value={user.rut}>
                                        {user.nombreCompleto}
                                    </option>
                                ))}
                        </select>
                    </>
                )}
            </div>

            <label htmlFor="area">Área de trabajo: </label>
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
    )

    const busquedaMesButton = () => (
        <button
            onClick={() => navigate('/charts/detail')}
            style={{ 
                marginBottom: '0px auto',
                backgroundColor: '#73DC42',
                color: 'black',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
                cursor: 'pointer'}}
        >
        Búsqueda por mes
        </button>
    );

    const nameArea = areas.find(area => area.id === selectedArea)?.work_area || 'Todas las áreas';

    return  (
        <div id="charts-page-container" style={{ textAlign: 'center' }}>
            <div className="chart-block">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px', marginTop: '5px',  }}>
                        {busquedaMesButton()}
                    </div>
                    {titulo()}
            </div>

            <div className="chart-block">
                <h2>Días trabajados por mes</h2>
                <div className="chart-block">
                    {renderFilters()}
                </div>
                <div className="chart-block">
                    <h2>{nameArea} </h2>
                    <PolarAreaChart email={emailCharts} year={year} area={selectedArea} nombreArea={nameArea} />
                </div>
            </div>
            
            <div className="chart-block">
                <h2>Horas trabajadas por mes en {year}</h2>
                <div className="chart-block">
                    {renderFilters()}
                </div>
                <div className="chart-block">
                <h2>{nameArea} </h2>
                <HourLineChart email={emailCharts} year={year} area={selectedArea}/>
                </div>
                
            </div>
            
            <div className="chart-block">
                <h2>Horas extra trabajadas por mes en {year}</h2>
                <div className="chart-block">
                    {renderFilters()}
                </div>
                <div className="chart-block">
                    <h2>{nameArea} </h2>
                    <ExtraHourLineChart email={emailCharts} year={year} area={selectedArea}/>
                </div>
                
            </div>
        </div>
    );
};

export default Charts;