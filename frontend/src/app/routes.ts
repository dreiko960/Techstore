import { createBrowserRouter } from 'react-router';
import { ClientLayout } from './layouts/ClientLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Receipt } from './pages/Receipt';
import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { Orders } from './pages/admin/Orders';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ClientLayout,
    children: [
      { index: true, Component: Home },
      { path: 'catalogo', Component: Catalog },
      { path: 'producto/:id', Component: ProductDetail },
      { path: 'carrito', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'comprobante/:orderId', Component: Receipt },
      { path: 'ofertas', Component: Home },
      { path: 'marcas', Component: Home },
      { path: 'novedades', Component: Home },
    ],
  },
  {
    path: '/admin/login',
    Component: AdminLogin,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { path: 'dashboard', Component: Dashboard },
      { path: 'productos', Component: Products },
      { path: 'categorias', Component: Products },
      { path: 'pedidos', Component: Orders },
      { path: 'stock', Component: Products },
      { path: 'ventas', Component: Dashboard },
      { path: 'clientes', Component: Orders },
      { path: 'reportes', Component: Dashboard },
      { path: 'configuracion', Component: Dashboard },
    ],
  },
]);
