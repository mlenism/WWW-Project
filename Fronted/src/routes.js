import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Solicitud from './pages/Solicitud';
import Cedula from './pages/Cedula';
import Turnos from './pages/Turnos';
import Confirmado from './pages/Confirmado';
import Publicidad from './pages/Publicidad';
<<<<<<< HEAD
import Caja from './pages/Caja';
=======
import Pantallas from './pages/Pantallas';
>>>>>>> bc971a2394acd0b188c2d7f26271dd0587dd8d47
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'publicidad', element: <Publicidad /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: 'caja', element: <Caja /> },
        { path: 'solicitud', element: <Solicitud /> },
        { path: 'cedula', element: <Cedula /> },
        { path: 'confirmado', element: <Confirmado /> },
        { path: 'turnos', element: <Turnos /> },
        { path: 'pantallas', element: <Pantallas /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
