import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/charts" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Gráficos
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                        <>
                            <li>
                                <NavLink 
                                    to="/qr" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Generar Código QR
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/users" 
                                    onClick={() => setMenuOpen(false)} 
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Usuarios
                                </NavLink>
                            </li>
                            
                        </>
                    )}
                    <li>
                        <NavLink 
                            to="/auth" 
                            onClick={() => { 
                                logoutSubmit(); 
                                setMenuOpen(false); 
                            }} 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
