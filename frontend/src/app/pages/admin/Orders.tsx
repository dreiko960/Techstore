import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Eye, Download, Edit, Trash2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { NeonButton } from '../../components/ui/NeonButton';
import { API_URL } from '../../../config';

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data = await res.json();
      const formattedOrders = data.map((o: any) => ({
        ...o,
        customer: o.customerName,
        itemsCount: o.items ? o.items.length : 0
      }));
      formattedOrders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este pedido?")) {
      try {
        await fetch(`${API_URL}/api/orders/${id}`, { 
          method: 'DELETE',
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleSaveOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updateData = {
      customerName: formData.get('customerName') as string,
      customerEmail: formData.get('customerEmail') as string,
      customerPhone: formData.get('customerPhone') as string,
      customerAddress: formData.get('customerAddress') as string,
    };

    try {
      await fetch(`${API_URL}/api/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(updateData)
      });
      setShowModal(false);
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer && order.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl text-white mb-2">Gestión de Pedidos</h1>
        <p className="text-gray-400">Administra y da seguimiento a todos los pedidos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-2">Total Pedidos</p>
          <p className="text-3xl text-white">{orders.length}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-2">Pendientes</p>
          <p className="text-3xl text-yellow-400">
            {orders.filter((o) => o.status === 'pending').length}
          </p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-2">En Proceso</p>
          <p className="text-3xl text-blue-400">
            {orders.filter((o) => o.status === 'processing').length}
          </p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-gray-400 text-sm mb-2">Entregados</p>
          <p className="text-3xl text-green-400">
            {orders.filter((o) => o.status === 'delivered').length}
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Buscar por ID o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white focus:outline-none focus:border-[#0ea5e9]"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="processing">En Proceso</option>
            <option value="shipped">Enviados</option>
            <option value="delivered">Entregados</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 py-3 px-4">ID Pedido</th>
                <th className="text-left text-gray-400 py-3 px-4">Fecha</th>
                <th className="text-left text-gray-400 py-3 px-4">Cliente</th>
                <th className="text-left text-gray-400 py-3 px-4">Productos</th>
                <th className="text-left text-gray-400 py-3 px-4">Total</th>
                <th className="text-left text-gray-400 py-3 px-4">Estado</th>
                <th className="text-left text-gray-400 py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-[#0ea5e9]">{order.id}</td>
                  <td className="py-4 px-4 text-gray-400">
                    {new Date(order.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="py-4 px-4 text-white">{order.customer}</td>
                  <td className="py-4 px-4 text-gray-400">{order.itemsCount} items</td>
                  <td className="py-4 px-4 text-white">${order.total.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <select
                      value={order.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          await fetch(`${API_URL}/api/orders/${order.id}/status`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                            body: JSON.stringify({ status: newStatus })
                          });
                          fetchOrders();
                        } catch (error) {
                          console.error("Error updating status:", error);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-semibold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-opacity-20 cursor-pointer ${
                        order.status === 'delivered' ? 'bg-green-500 text-green-400' :
                        order.status === 'processing' ? 'bg-blue-500 text-blue-400' :
                        order.status === 'shipped' ? 'bg-yellow-500 text-yellow-400' :
                        'bg-red-500 text-red-400'
                      }`}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <option value="pending" className="bg-slate-800 text-white">Pendiente</option>
                      <option value="processing" className="bg-slate-800 text-white">En Proceso</option>
                      <option value="shipped" className="bg-slate-800 text-white">Enviado</option>
                      <option value="delivered" className="bg-slate-800 text-white">Entregado</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors group">
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                      </button>
                      <button 
                        onClick={() => { setEditingOrder(order); setShowModal(true); }}
                        className="p-2 hover:bg-green-500/20 rounded-lg transition-colors group">
                        <Edit className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group">
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {showModal && editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <GlassCard className="p-6 w-full max-w-md">
            <h2 className="text-2xl text-white mb-4">Editar Datos del Cliente</h2>
            <form onSubmit={handleSaveOrder} className="space-y-4">
              <Input
                name="customerName"
                placeholder="Nombre del cliente"
                defaultValue={editingOrder.customerName || ''}
                required
              />
              <Input
                name="customerEmail"
                type="email"
                placeholder="Email del cliente"
                defaultValue={editingOrder.customerEmail || ''}
                required
              />
              <Input
                name="customerPhone"
                placeholder="Teléfono"
                defaultValue={editingOrder.customerPhone || ''}
                required
              />
              <Input
                name="customerAddress"
                placeholder="Dirección"
                defaultValue={editingOrder.customerAddress || ''}
                required
              />
              <div className="flex gap-4 pt-4">
                <NeonButton type="submit" variant="primary" className="flex-1">Guardar</NeonButton>
                <NeonButton type="button" variant="outline" className="flex-1" onClick={() => { setShowModal(false); setEditingOrder(null); }}>Cancelar</NeonButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
