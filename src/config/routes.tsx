import type { RouteObject } from 'react-router';
import App from 'pages/App';
import ProductsPage from 'pages/ProductsPage';
import ItemPage from 'pages/ProductPage';
import { Navigate } from 'react-router';
import LoginPage from 'pages/LoginPage';
import RegistrationPage from 'pages/RegistrationPage';
import ProfilePage from 'pages/ProfilePage';
import CartPage from 'pages/CartPage';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ItemPage />,
      },
      /* роуты для новых страниц */
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
