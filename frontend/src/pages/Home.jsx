import React from 'react';
import ScanQRCodeComponent from '../components/ScanQRCodeComponent';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-scanner-container">
      <div className="scanner-section">
        <h1>Escáner QR</h1>
        <ScanQRCodeComponent />
      </div>
    </div>
  );
};

export default Home;
