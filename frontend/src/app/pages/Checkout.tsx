import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CreditCard, Truck, MapPin } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { NeonButton } from '../components/ui/NeonButton';
import { NeonButton } from '../components/ui/NeonButton';
import { useStore } from '../context/StoreContext';
import { API_URL } from '../../config';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, addOrder, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
      subtotal,
      discount: 0,
      shipping,
      total,
      status: 'pending',
      paymentMethod: 'Tarjeta de Crédito',
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error('Error al procesar el pedido');
      }
      
      const savedOrder = await response.json();
      addOrder(savedOrder);
      clearCart();
      navigate(`/comprobante/${savedOrder.id}`);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al procesar tu pedido. Verifica si hay stock suficiente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-white mb-8">Finalizar Compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-[#0ea5e9]" />
                <h2 className="text-2xl text-white">Información de Envío</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="address"
                  placeholder="Dirección completa"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="city"
                    placeholder="Ciudad"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="zipCode"
                    placeholder="Código Postal"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-[#0ea5e9]" />
                <h2 className="text-2xl text-white">Método de Envío</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer border border-[#0ea5e9] transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    defaultChecked
                    className="w-4 h-4 accent-[#0ea5e9]"
                  />
                  <div className="flex-1">
                    <p className="text-white">Envío Estándar (24-48h)</p>
                    <p className="text-gray-400 text-sm">
                      {shipping === 0 ? 'GRATIS' : `$${shipping}`}
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer border border-transparent hover:border-[#0ea5e9]/50 transition-colors">
                  <input
                    type="radio"
                    name="shipping"
                    className="w-4 h-4 accent-[#0ea5e9]"
                  />
                  <div className="flex-1">
                    <p className="text-white">Envío Express (12-24h)</p>
                    <p className="text-gray-400 text-sm">$45</p>
                  </div>
                </label>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-[#0ea5e9]" />
                <h2 className="text-2xl text-white">Método de Pago</h2>
              </div>

              <div className="space-y-4">
                <Input
                  name="cardNumber"
                  placeholder="Número de tarjeta"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="cardCvv"
                    placeholder="CVV"
                    value={formData.cardCvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24">
              <h2 className="text-2xl text-white mb-6">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-300 text-sm">
                    <span className="flex-1 truncate">
                      {item.name} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'GRATIS' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-white text-xl pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#0ea5e9]">${total.toLocaleString()}</span>
                </div>
              </div>

              <NeonButton type="submit" variant="primary" className="w-full">
                Confirmar Pedido
              </NeonButton>

              <div className="mt-6 space-y-2 text-xs text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Pago 100% seguro
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Garantía de devolución
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Soporte 24/7
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </form>
    </div>
  );
}
