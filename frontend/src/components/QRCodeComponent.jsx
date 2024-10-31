import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-modal';

const apiUrl = import.meta.env.VITE_BASE_URL;

Modal.setAppElement('#root');

const QRCodeComponent = ({ user }) => {
  const [codeData, setCodeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Método para obtener el QR si está disponible
  const fetchQRCode = async () => {
    console.log("Iniciando fetchQRCode"); 
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/qrcode`);
      console.log('Respuesta de fetchQRCode:', response.data);
      setCodeData(response.data.codeData || response.data.code);
    } catch (err) {
      console.error('Error en fetchQRCode:', err);
      setErrorMessage('No hay código QR disponible');
    }
  };
  

  // Método para generar el QR con fecha y hora específicas
  const generateQRCode = async (e) => {
    e.preventDefault();
    console.log("Intentando generar QR"); // Confirmación en consola
    try {
      const response = await axios.post(
        `${apiUrl}/qrcode/generate`,
        { password, scheduledAt },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log('Respuesta de generateQRCode:', response.data);
      setCodeData(response.data.codeData || response.data.code);
      setIsModalOpen(false);
      setPassword('');
      setScheduledAt('');
      setErrorMessage('');
    } catch (err) {
      console.error('Error en generateQRCode:', err);
      setErrorMessage('Error al generar el código QR');
    }
  };

  // Cargar QR existente al montar el componente
  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
    <div>
      {user.role === 'administrador' ? (
        <div>
          <button onClick={() => setIsModalOpen(true)}>
            Generar Código QR
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              setPassword('');
              setScheduledAt('');
              setErrorMessage('');
            }}
            contentLabel="Generar Código QR para Turno"
          >
            <h2>Generar Código QR para Turno</h2>
            <form onSubmit={generateQRCode}>
              <label>
                Fecha y Hora del Turno:
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  required
                />
              </label>
              <label>
                Contraseña de Administrador:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <button type="submit">Generar</button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setPassword('');
                  setScheduledAt('');
                  setErrorMessage('');
                }}
              >
                Cancelar
              </button>
            </form>
          </Modal>
        </div>
      ) : (
        <p>No tienes permisos para generar un código QR</p>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {codeData ? (
        <div>
          <QRCodeCanvas value={codeData} />
          {user.role !== 'administrador' && (
            <p>Escanea este código para registrar tu entrada.</p>
          )}
        </div>
      ) : (
        <p>No hay código QR disponible</p>
      )}
    </div>
  );
};

export default QRCodeComponent;
