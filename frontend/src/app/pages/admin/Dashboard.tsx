import { motion } from 'motion/react';
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';

const salesData = [
  { name: 'Ene', ventas: 4000, ganancias: 2400 },
  { name: 'Feb', ventas: 3000, ganancias: 1398 },
  { name: 'Mar', ventas: 2000, ganancias: 9800 },
  { name: 'Abr', ventas: 2780, ganancias: 3908 },
  { name: 'May', ventas: 1890, ganancias: 4800 },
  { name: 'Jun', ventas: 2390, ganancias: 3800 },
];

const categoryData = [
  { name: 'Laptops', value: 400, color: '#0ea5e9' },
  { name: 'PCs', value: 300, color: '#3b82f6' },
  { name: 'Periféricos', value: 200, color: '#8b5cf6' },
  { name: 'Accesorios', value: 100, color: '#ec4899' },
];

export function Dashboard() {
  const stats = [
    {
      title: 'Ventas Totales',
      value: '$48,574',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Pedidos',
      value: '356',
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Clientes',
      value: '2,847',
      change: '+23.1%',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Productos',
      value: '128',
      change: '+5.3%',
      icon: Package,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Juan Pérez', product: 'ASUS ROG Laptop', amount: '$1,899', status: 'delivered' },
    { id: 'ORD-002', customer: 'María García', product: 'RTX 4090', amount: '$1,799', status: 'processing' },
    { id: 'ORD-003', customer: 'Carlos López', product: 'Logitech Mouse', amount: '$149', status: 'shipped' },
    { id: 'ORD-004', customer: 'Ana Martínez', product: 'Samsung Monitor', amount: '$699', status: 'pending' },
  ];

  const alerts = [
    { type: 'warning', message: 'Stock bajo: RTX 4090 (5 unidades)' },
    { type: 'info', message: '12 pedidos pendientes de procesar' },
    { type: 'success', message: 'Ventas del mes superan objetivo' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Resumen general del sistema</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Última actualización</p>
          <p className="text-white">{new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success">{stat.change}</Badge>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl text-white">{stat.value}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="text-2xl text-white mb-6">Estadísticas de Ventas</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="ventas" fill="#0ea5e9" />
                <Bar dataKey="ganancias" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-6">
            <h2 className="text-2xl text-white mb-6">Productos por Categoría</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="text-2xl text-white mb-6">Pedidos Recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 py-3">ID</th>
                    <th className="text-left text-gray-400 py-3">Cliente</th>
                    <th className="text-left text-gray-400 py-3">Producto</th>
                    <th className="text-left text-gray-400 py-3">Monto</th>
                    <th className="text-left text-gray-400 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 text-[#0ea5e9]">{order.id}</td>
                      <td className="py-4 text-white">{order.customer}</td>
                      <td className="py-4 text-gray-400">{order.product}</td>
                      <td className="py-4 text-white">{order.amount}</td>
                      <td className="py-4">
                        <Badge
                          variant={
                            order.status === 'delivered'
                              ? 'success'
                              : order.status === 'processing'
                              ? 'info'
                              : order.status === 'shipped'
                              ? 'warning'
                              : 'error'
                          }
                        >
                          {order.status === 'delivered' && 'Entregado'}
                          {order.status === 'processing' && 'En Proceso'}
                          {order.status === 'shipped' && 'Enviado'}
                          {order.status === 'pending' && 'Pendiente'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-6">
            <h2 className="text-2xl text-white mb-6">Alertas</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border backdrop-blur-sm ${
                    alert.type === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/50'
                      : alert.type === 'info'
                      ? 'bg-blue-500/10 border-blue-500/50'
                      : 'bg-green-500/10 border-green-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className={`w-5 h-5 flex-shrink-0 ${
                        alert.type === 'warning'
                          ? 'text-yellow-400'
                          : alert.type === 'info'
                          ? 'text-blue-400'
                          : 'text-green-400'
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        alert.type === 'warning'
                          ? 'text-yellow-400'
                          : alert.type === 'info'
                          ? 'text-blue-400'
                          : 'text-green-400'
                      }`}
                    >
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
