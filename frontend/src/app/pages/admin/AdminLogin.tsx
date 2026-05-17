import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Mail, LayoutDashboard, Eye, EyeOff } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Input } from '../../components/ui/Input';
import { NeonButton } from '../../components/ui/NeonButton';
import { useStore } from '../../context/StoreContext';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('admin');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0ea5e9] rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3b82f6] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(14,165,233,0.6)]">
            <LayoutDashboard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-white via-[#0ea5e9] to-[#3b82f6] bg-clip-text text-transparent">
            Panel Administrativo
          </h1>
          <p className="text-gray-400">Accede al sistema de gestión</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-300 block mb-2">Correo Electrónico</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@techstore.com"
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-2">Contraseña</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0ea5e9] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#0ea5e9]"
                  />
                  <span className="text-sm">Recordar sesión</span>
                </label>
                <a href="#" className="text-sm text-[#0ea5e9] hover:text-[#0284c7] transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <NeonButton type="submit" variant="primary" className="w-full">
                Iniciar Sesión
              </NeonButton>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                Credenciales de prueba: admin@techstore.com / admin123
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <a href="/" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">
            ← Volver a la tienda
          </a>
        </motion.div>
      </div>
    </div>
  );
}
