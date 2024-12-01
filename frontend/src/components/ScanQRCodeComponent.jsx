import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { scanQR } from '../services/scan.service.js';
import '../styles/scanqrcomponent.css';

const ScanQRCodeComponent = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Obtiene los datos del usuario desde localStorage
    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  useEffect(() => {
    // Configura el escáner QR con html5-qrcode
    const scanner = new Html5QrcodeScanner(
      "qr-reader", // ID del elemento DOM donde se renderiza
      { fps: 10, qrbox: { width: 250, height: 250 } } // Configuración de escaneo
    );

    // Maneja el resultado exitoso del escaneo
    scanner.render(
      (decodedText) => {
        handleScan(decodedText);
      },
      (error) => {
        console.error("Error de escaneo:", error);
        setErrorMessage("Hubo un problema al intentar escanear el código.");
      }
    );

    // Limpia el escáner cuando se desmonta el componente
    return () => {
      scanner.clear().catch((error) => {
        console.error("Error al limpiar el escáner:", error);
      });
    };
  }, [userData]); // El escáner depende de los datos del usuario

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
        // Envía los datos al backend
        const response = await scanQR(scanPayload);
        console.log("Datos dsp de la peticion: ", response);
        alert('Escaneo exitoso y datos enviados.');
        setErrorMessage('');
      } catch (error) {
        if(error.response) {
          console.error('Error en la respuesta del backend: ', error.response.data);
          setErrorMessage(`Error del servidor: ${error.response.data.message}`);
        } else if (error.request) {
          console.error('Error en la respuesta del servidor: ', error.request);
          setErrorMessage(`No se pudo conectar al servidor`);
        } else {
          console.error('Error al configurar la solicitud: ', error.message);
          setErrorMessage(`Error inesperado al escanear el qr.`);
        }
      }
    }
  };

  return (
    <div className="qr-container">
      <h2>Escanear Código QR</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {scanResult ? (
        <p className="scan-result">Código escaneado: {scanResult}</p>
      ) : (
        <div id="qr-reader" style={{ width: '100%' }}></div> 
      )}
    </div>
  );
};

export default ScanQRCodeComponent;
