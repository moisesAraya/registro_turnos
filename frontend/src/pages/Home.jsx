import React, { useState, useEffect } from 'react';
import ScanQRCodeComponent from '../components/ScanQRCodeComponent';

const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("token");
    setUserRole(role);
  }, []);

  return (
    <div>
      <h1>Bienvenido</h1>
      {userRole !== "usuario" && (
        <>
          <button onClick={() => setShowScanner(!showScanner)}>
            Escanear QR
          </button>
          {showScanner && <ScanQRCodeComponent />}
        </>
      )}
    </div>
  );
};

export default Home;
