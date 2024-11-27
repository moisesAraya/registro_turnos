import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QrCode, RefreshCw, AlertCircle } from 'lucide-react';
import '../styles/qrcodecomponent.css';

const QRCodeComponent = () => {
  const [codeData, setCodeData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchQRCode = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
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
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateQRCode = async () => {
    try {
      setIsGenerating(true);
      setErrorMessage('');
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
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
    <div className="qr-container">
      <div className="qr-card">
        <div className="qr-header">
          <QrCode className="qr-icon" />
          <h1>Código QR del Restaurante</h1>
        </div>

        <div className="qr-content">
          {errorMessage ? (
            <div className="error-message">
              <AlertCircle />
              <p>{errorMessage}</p>
            </div>
          ) : isLoading ? (
            <div className="loading-spinner">
              <RefreshCw className="spin" />
              <p>Cargando código QR...</p>
            </div>
          ) : codeData ? (
            <div className="qr-image-container">
              <img src={codeData} alt="Código QR" className="qr-image" />
              <p className="qr-hint">Escanea este código para registrar tu entrada</p>
            </div>
          ) : (
            <div className="no-qr-message">
              <AlertCircle />
              <p>No hay código QR disponible</p>
            </div>
          )}
        </div>

        <div className="qr-actions">
          <button 
            onClick={generateQRCode} 
            disabled={isGenerating}
            className={`generate-button ${isGenerating ? 'generating' : ''}`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="spin" />
                Generando...
              </>
            ) : (
              <>
                <QrCode />
                Generar Nuevo Código QR
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeComponent;