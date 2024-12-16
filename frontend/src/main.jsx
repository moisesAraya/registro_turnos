import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import EventsPage from '@pages/EventPage';
import Users from '@pages/Users';
import ShiftsPage from './pages/ShiftspPage';
import Register from '@pages/Register';
import Charts from '@pages/Charts';
import DetailCharts from '@pages/DetailCharts';
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
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <EventsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/shifts',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <ShiftsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/area-selection',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <AreaSelection /> 
          </ProtectedRoute>
        ),
      },
      {
        path: '/charts',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <Charts />
          </ProtectedRoute>
        ),
      },
      {
        path: '/charts/detail',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <DetailCharts />
          </ProtectedRoute>
        ),
      }
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
