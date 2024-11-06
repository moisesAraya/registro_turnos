import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios

const QRCodeComponent = () => {
  const [codeData, setCodeData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para obtener el código QR existente
  const fetchQRCode = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/qrcode');
      setCodeData(response.data.codeData);
    } catch (err) {
      console.error("Error en fetchQRCode:", err);
      setErrorMessage("No hay código QR disponible");
    }
  };

  // Función para generar un nuevo código QR
  const generateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/qrcode/generate');
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
