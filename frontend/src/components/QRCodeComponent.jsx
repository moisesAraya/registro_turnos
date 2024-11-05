// QRCodeComponent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = () => {
  const [codeData, setCodeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // El token ya está configurado en axios.defaults.headers.common si lo hiciste en login

  const fetchQRCode = async () => {
    try {
      const response = await axios.get('/qrcode');
      setCodeData(response.data.codeData || response.data.code);
    } catch (err) {
      console.error("Error en fetchQRCode:", err);
      setErrorMessage("No hay código QR disponible");
    }
  };
  
  const generateQRCode = async () => {
    try {
      const response = await axios.post('/qrcode/generate');
      setCodeData(response.data.codeData || response.data.code);
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
      <button onClick={generateQRCode}>Generar Código QR</button>
      {codeData ? (
        <div>
          <QRCodeCanvas value={codeData} />
          <p>Escanea este código para registrar tu entrada.</p>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default QRCodeComponent;