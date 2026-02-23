import type { RouteObject } from 'react-router';
import App from '../pages/App.tsx';
import ProductsPage from '../pages/ProductsPage';
import ItemPage from '../pages/ItemPage';
import { Navigate } from 'react-router';

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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
