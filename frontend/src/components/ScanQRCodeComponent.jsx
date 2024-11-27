import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import 'webrtc-adapter'; // Importa el adaptador para compatibilidad con navegadores antiguos
import '../styles/scanqrcomponent.css'; 

const ScanQRCodeComponent = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Obtiene los datos del usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);

      // Verifica si hay información del usuario
      if (!userData) {
        setErrorMessage('No se pudo obtener información del usuario.');
        return;
      }

      // Construye el payload con los datos del escaneo
      const scanPayload = {
        qrContent: data,
        name: userData.name,
        email: userData.email,
        scanTime: new Date().toISOString(),
      };

      try {
        // Envía los datos del escaneo al backend
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/scan`, scanPayload);
        alert('Escaneo exitoso y datos enviados.');
        setErrorMessage('');
      } catch (error) {
        console.error('Error al enviar datos de escaneo:', error);
        setErrorMessage('Hubo un problema al enviar los datos de escaneo.');
      }
    }
  };

  const handleError = (err) => {
    console.error('Error de escaneo:', err);
    setErrorMessage('Hubo un problema con la cámara o el navegador no es compatible.');
  };

  // Verifica soporte de MediaDevices y muestra un mensaje si no es compatible
  useEffect(() => {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      setErrorMessage(
        'El navegador no soporta la API de cámara. Por favor, utiliza un navegador más moderno.'
      );
    }
  }, []);

  return (
    <div className="qr-container">
      <h2>Escanear Código QR</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {scanResult ? (
        <p className="scan-result">Código escaneado: {scanResult}</p>
      ) : (
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result?.text);
            if (error) handleError(error);
          }}
          className="qr-reader"
        />
      )}
    </div>
  );
};

export default ScanQRCodeComponent;
