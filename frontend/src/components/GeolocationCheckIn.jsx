import React, { useState } from 'react';
import axios from 'axios';

const GeolocationCheckIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      setErrorMessage('La geolocalización no es soportada por tu navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post(
            'http://<TU_SERVIDOR>/geolocation', // Cambia a tu URL del backend
            {
              latitude,
              longitude,
              scanTime: new Date().toISOString(),
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
            }
          );

          setSuccessMessage(response.data.message);
          setErrorMessage('');
        } catch (error) {
          setErrorMessage(
            error.response?.data.message || 'Error al registrar el ingreso.'
          );
        }
      },
      (error) => {
        setErrorMessage('Error al obtener la ubicación.');
        console.error(error);
      }
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Registrar Ingreso</h2>
      <button
        onClick={handleCheckIn}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Registrar mi ingreso
      </button>
      {successMessage && (
        <p style={{ color: 'green', marginTop: '1rem' }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default GeolocationCheckIn;
