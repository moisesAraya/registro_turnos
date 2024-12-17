import React, { useState, useEffect } from "react";
import Attendance from "../components/Attendance";
import "../styles/home.css";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener datos del usuario desde sessionStorage
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (err) {
      console.error("Error al cargar datos de usuario:", err);
    }
  }, []);

  // Mostrar solo si el usuario no es administrador
  if (!user || user.rol === "administrador") return null;

  return (
    <div className="home-container">
      <Attendance user={user} />
    </div>
  );
};

export default HomePage;
