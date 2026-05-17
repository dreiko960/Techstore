import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[rgba(15,15,25,0.9)] border-t border-[rgba(59,130,246,0.2)] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <span className="text-2xl bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] bg-clip-text text-transparent">
                TechStore
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Tu tienda tecnológica de confianza. Los mejores productos gaming y accesorios al mejor precio.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 hover:bg-[#0ea5e9] rounded-lg transition-colors">
                <Facebook className="w-5 h-5 text-gray-300" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-[#0ea5e9] rounded-lg transition-colors">
                <Twitter className="w-5 h-5 text-gray-300" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-[#0ea5e9] rounded-lg transition-colors">
                <Instagram className="w-5 h-5 text-gray-300" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-[#0ea5e9] rounded-lg transition-colors">
                <Youtube className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Compra</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/novedades" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Novedades
                </Link>
              </li>
              <li>
                <Link to="/marcas" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Marcas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Garantía
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 text-[#0ea5e9]" />
                <span>info@techstore.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 text-[#0ea5e9]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-[#0ea5e9]" />
                <span>123 Tech Avenue, Silicon Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(59,130,246,0.2)] mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
