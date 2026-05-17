import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { useStore } from '../context/StoreContext';

export function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const discount = cart.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <GlassCard className="p-12 text-center max-w-md mx-auto">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl text-white mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-400 mb-6">
            Agrega productos para comenzar tu compra
          </p>
          <Link to="/catalogo">
            <NeonButton variant="primary">Explorar Productos</NeonButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-white mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-white text-xl mb-1">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="w-12 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      <div className="text-right">
                        {item.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            ${(item.originalPrice * item.quantity).toLocaleString()}
                          </p>
                        )}
                        <p className="text-2xl text-[#0ea5e9]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <GlassCard className="p-6 sticky top-24">
            <h2 className="text-2xl text-white mb-6">Resumen del Pedido</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({cart.length} productos)</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Descuento</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-300">
                <span>Envío</span>
                <span>{shipping === 0 ? 'GRATIS' : `$${shipping}`}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between text-white text-xl">
                  <span>Total</span>
                  <span className="text-[#0ea5e9]">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {subtotal < 500 && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-6">
                <p className="text-yellow-400 text-sm">
                  Agrega ${(500 - subtotal).toLocaleString()} más para envío gratis
                </p>
              </div>
            )}

            <NeonButton
              variant="primary"
              className="w-full mb-3"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/checkout')}
            >
              Continuar Compra
            </NeonButton>

            <Link to="/catalogo">
              <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                Seguir Comprando
              </button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
