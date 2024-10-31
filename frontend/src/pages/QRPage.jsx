// src/pages/QRPage.jsx
import React from 'react';
import QRCodeComponent from '../components/QRCodeComponent';

const QRPage = () => {
  const user = JSON.parse(sessionStorage.getItem('usuario')) || {};

  return (
    <div className="qr-page">
      <h1>Generar Código QR</h1>
      <QRCodeComponent user={user} />
    </div>
  );
};

export default QRPage;
