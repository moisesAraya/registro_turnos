import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { registerAttendance } from "../services/attendance.service";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Obtener datos del usuario desde sessionStorage
    const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
    setUser(storedUser);
  }, []);

  // Función para registrar el ingreso
  const handleRegisterAttendance = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está soportada en este navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await registerAttendance({
            name: user.nombreCompleto,
            email: user.email,
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          });
          setSuccess(response.message);
          setError("");
        } catch (err) {
          setError("Error al registrar el ingreso: " + err.message);
          setSuccess("");
        }
      },
      () => {
        setError("No se pudo obtener la ubicación.");
      }
    );
  };

  // Mostrar solo si el usuario no es administrador
  if (!user || user.rol === "administrador") return null;

  return (
    <div className="home-container">
      <h1>Registrar Ingreso</h1>
      <button onClick={handleRegisterAttendance} className="register-btn">
        Registrar mi ingreso
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default HomePage;
