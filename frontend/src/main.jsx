import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import QRPage from '@pages/QRPage'; 
import Charts from '@pages/Charts';
import Scan from '@pages/Scan';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import AreaSelection from '@pages/AreaSelection';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/charts',
        element: <Charts />
      },
      {
        path: '/prueba',
        element: <Scan />
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/qr',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <QRPage /> {/* Página de generación de código QR */}
          </ProtectedRoute>
        ),
      },
      {
        path: '/area-selection',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <AreaSelection /> {/* Página de selección de área */}
          </ProtectedRoute>
        ),
      },
    ]
  },
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);