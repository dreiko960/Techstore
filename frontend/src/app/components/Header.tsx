import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ShoppingCart, User, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './ui/Input';
import { NeonButton } from './ui/NeonButton';
import { useStore } from '../context/StoreContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useStore();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[rgba(10,10,15,0.9)] border-b border-[rgba(59,130,246,0.2)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
            <span className="text-2xl bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] bg-clip-text text-transparent">
              TechStore
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
              Inicio
            </Link>
            <Link to="/catalogo" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
              Catálogo
            </Link>
            <Link to="/ofertas" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
              Ofertas
            </Link>
            <Link to="/marcas" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
              Marcas
            </Link>
          </nav>

          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <Input
              type="search"
              placeholder="Buscar productos..."
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/admin/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Panel Admin</span>
              </motion.button>
            </Link>

            <Link to="/carrito">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0ea5e9] text-white text-xs rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <User className="w-6 h-6 text-gray-300" />
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-4 py-4 border-t border-[rgba(59,130,246,0.2)]">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  icon={<Search className="w-5 h-5" />}
                />
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[#0ea5e9] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/catalogo"
                  className="text-gray-300 hover:text-[#0ea5e9] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Catálogo
                </Link>
                <Link
                  to="/ofertas"
                  className="text-gray-300 hover:text-[#0ea5e9] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ofertas
                </Link>
                <Link
                  to="/marcas"
                  className="text-gray-300 hover:text-[#0ea5e9] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marcas
                </Link>
                <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                  <NeonButton variant="secondary" className="w-full" icon={<LayoutDashboard className="w-5 h-5" />}>
                    Panel Admin
                  </NeonButton>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
