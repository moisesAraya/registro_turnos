import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import '../styles/scanqrcomponent.css'; 

const ScanQRCodeComponent = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);

      if (!userData) {
        setErrorMessage('No se pudo obtener información del usuario.');
        return;
      }

      const scanPayload = {
        qrContent: data,
        name: userData.name,
        email: userData.email,
        scanTime: new Date().toISOString(),
      };

      try {
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
    setErrorMessage('Hubo un problema con la cámara.');
  };

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
