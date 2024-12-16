import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaChartBar, FaCalendarAlt, FaClock, FaSignOutAlt } from "react-icons/fa"; // Importa el icono FaClock
import "../styles/sidebar.css";

const Sidebar = () => {
  const user = JSON.parse(sessionStorage.getItem("usuario")); // Obtener información del usuario

  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Restaurant Manager</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome /> Inicio
          </NavLink>
        </li>
        {user?.rol === "administrador" && (
          <li>
            <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaUserFriends /> Usuarios
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/charts" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaChartBar /> Gráficos
          </NavLink>
        </li>
        {user?.rol === "administrador" && (
          <>
            <li>
              <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaCalendarAlt /> Eventos
              </NavLink>
            </li>
            <li>
              <NavLink to="/shifts" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaClock /> Turnos
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/auth" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaSignOutAlt /> Cerrar Sesión
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
