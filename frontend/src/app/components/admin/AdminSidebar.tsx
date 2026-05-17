import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Layers,
  TrendingUp,
  FileText,
  LogOut,
} from 'lucide-react';

export function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/productos', icon: Package, label: 'Productos' },
    { path: '/admin/categorias', icon: Layers, label: 'Categorías' },
    { path: '/admin/pedidos', icon: ShoppingCart, label: 'Pedidos' },
    { path: '/admin/stock', icon: TrendingUp, label: 'Stock' },
    { path: '/admin/ventas', icon: BarChart3, label: 'Ventas' },
    { path: '/admin/clientes', icon: Users, label: 'Clientes' },
    { path: '/admin/reportes', icon: FileText, label: 'Reportes' },
    { path: '/admin/configuracion', icon: Settings, label: 'Configuración' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 min-h-screen bg-[rgba(15,15,25,0.9)] border-r border-[rgba(59,130,246,0.2)] fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">⚡</span>
          </div>
          <div>
            <span className="text-xl bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] bg-clip-text text-transparent block">
              TechStore
            </span>
            <span className="text-xs text-gray-500">Admin Panel</span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[rgba(59,130,246,0.2)]">
        <Link to="/">
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </motion.button>
        </Link>
      </div>
    </aside>
  );
}
