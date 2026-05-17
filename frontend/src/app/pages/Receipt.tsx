import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Download, Printer, Home, Package } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { Badge } from '../components/ui/Badge';
import { useStore } from '../context/StoreContext';

export function Receipt() {
  const { orderId } = useParams();
  const { orders } = useStore();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <GlassCard className="p-12 text-center max-w-md mx-auto">
          <Package className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl text-white mb-4">Pedido no encontrado</h2>
          <Link to="/">
            <NeonButton variant="primary">Volver al Inicio</NeonButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Función de descarga PDF implementada');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.5)]"
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          <h1 className="text-4xl text-white mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-400">
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </p>
        </div>

        <GlassCard className="p-8 mb-6">
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <span className="text-2xl bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] bg-clip-text text-transparent">
                  TechStore
                </span>
              </div>
              <p className="text-gray-400 text-sm">123 Tech Avenue, Silicon Valley</p>
              <p className="text-gray-400 text-sm">info@techstore.com</p>
            </div>
            <div className="text-right">
              <Badge variant="success" className="mb-2">
                {order.status === 'pending' && 'Pendiente'}
                {order.status === 'processing' && 'En Proceso'}
                {order.status === 'shipped' && 'Enviado'}
                {order.status === 'delivered' && 'Entregado'}
              </Badge>
              <p className="text-white">Pedido: {order.id}</p>
              <p className="text-gray-400 text-sm">
                {new Date(order.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-white mb-2">Información del Cliente</h3>
              <p className="text-gray-400">{order.customerName}</p>
              <p className="text-gray-400">{order.customerEmail}</p>
              <p className="text-gray-400">{order.customerPhone}</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Dirección de Envío</h3>
              <p className="text-gray-400">{order.customerAddress}</p>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-white/10">
            <h3 className="text-white mb-4">Productos</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-white">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      {item.brand} - Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[#0ea5e9]">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>${order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Descuento</span>
                <span>-${order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-300">
              <span>Envío</span>
              <span>{order.shipping === 0 ? 'GRATIS' : `$${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-white text-2xl pt-3 border-t border-white/10">
              <span>Total</span>
              <span className="text-[#0ea5e9]">${order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm text-center">
              Recibirás un correo de confirmación con los detalles de tu pedido y el seguimiento del envío.
            </p>
          </div>
        </GlassCard>

        <div className="flex flex-wrap gap-4 justify-center">
          <NeonButton variant="outline" icon={<Download className="w-5 h-5" />} onClick={handleDownload}>
            Descargar PDF
          </NeonButton>
          <NeonButton variant="outline" icon={<Printer className="w-5 h-5" />} onClick={handlePrint}>
            Imprimir
          </NeonButton>
          <Link to="/">
            <NeonButton variant="primary" icon={<Home className="w-5 h-5" />}>
              Volver al Inicio
            </NeonButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
