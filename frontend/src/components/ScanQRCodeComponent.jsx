import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const ScanQRCodeComponent = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      const user = {
        name: "Usuario Ejemplo", // Reemplaza con datos reales del usuario
        email: "usuario@ejemplo.com", // Reemplaza con datos reales del usuario
        scanTime: new Date().toISOString(),
      };

      try {
        // Enviar los datos escaneados al backend
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/scan`, {
          qrContent: data, // Contenido del código QR escaneado
          ...user, // Información del usuario
        });
        alert('Escaneo exitoso y datos enviados.');
      } catch (error) {
        console.error("Error al enviar datos de escaneo:", error);
        setErrorMessage("Hubo un problema al enviar los datos de escaneo.");
      }
    }
  };

  const handleError = (err) => {
    console.error("Error de escaneo:", err);
    setErrorMessage("Hubo un problema con la cámara.");
  };

  return (
    <div>
      <h2>Escanear Código QR</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {scanResult ? (
        <p>Código escaneado: {scanResult}</p>
      ) : (
        <QrReader
          onResult={(result, error) => {
            if (!!result) handleScan(result?.text);
            if (!!error) handleError(error);
          }}
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
};

export default ScanQRCodeComponent;
