import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const QRCodeComponent = () => {
  const [codeData, setCodeData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchQRCode = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/qrcode`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCodeData(response.data.codeData);
    } catch (err) {
      console.error("Error en fetchQRCode:", err);
      setErrorMessage("No hay código QR disponible");
    }
  };
  
  const generateQRCode = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/qrcode/generate`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCodeData(response.data.codeData);
    } catch (err) {
      console.error("Error al generar el código QR:", err);
      setErrorMessage("No se pudo generar el código QR");
    }
  };
  

  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
    <div>
      <h1>Código QR</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {codeData ? (
        <img src={codeData} alt="Código QR" />
      ) : (
        <p>No hay código QR disponible</p>
      )}
      <button onClick={generateQRCode}>Generar Código QR</button>
    </div>
  );
};

export default QRCodeComponent;
