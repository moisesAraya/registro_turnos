import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@components/Sidebar';
import { AuthProvider } from '@context/AuthContext';
import '@styles/Root.css';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  // Obtener la fecha actual
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Simular nombre del usuario (debe venir de tu AuthContext o sesión)
  const userName = "Admin"; // Reemplázalo con datos dinámicos desde AuthContext

  return (
    <div className="layout">
      {/* Sidebar a la izquierda */}
      <Sidebar />
      <div className="main-content">
        {/* Encabezado */}
        <header className="header">
          <span className="header-date">{today}</span>
          <div className="header-user">
            <span>{userName}</span>
            <div className="user-icon"></div>
          </div>
        </header>
        {/* Contenido dinámico */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
