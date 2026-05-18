import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit, Trash2, Eye, Grid3x3, List } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { API_URL } from '../../../config';

// Eliminamos mockData
// import { products } from '../../data/mockData';

export function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData = {
      id: editingProduct ? editingProduct.id : `PROD-${Date.now()}`,
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string, 10),
      category: formData.get('category') as string,
      brand: editingProduct?.brand || 'Generico',
      description: editingProduct?.description || 'Nueva descripción',
      image: editingProduct?.image || 'https://via.placeholder.com/800x600',
      rating: 0,
      reviews: 0,
      sku: `SKU-${Date.now()}`
    };

    try {
      if (editingProduct) {
        await fetch(`${API_URL}/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      } else {
        await fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      }
      setShowModal(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-white text-center py-20">Cargando productos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-white mb-2">Gestión de Productos</h1>
          <p className="text-gray-400">Administra tu catálogo de productos</p>
        </div>
        <NeonButton 
          variant="primary" 
          icon={<Plus className="w-5 h-5" />}
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
        >
          Nuevo Producto
        </NeonButton>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-3 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white focus:outline-none focus:border-[#0ea5e9]">
              <option>Todas las categorías</option>
              <option>Laptops Gaming</option>
              <option>Tarjetas Gráficas</option>
              <option>Periféricos</option>
            </select>
            <select className="px-4 py-3 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white focus:outline-none focus:border-[#0ea5e9]">
              <option>Todos los estados</option>
              <option>En stock</option>
              <option>Agotado</option>
            </select>
            <div className="flex gap-2 border border-[rgba(59,130,246,0.3)] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#0ea5e9] text-white'
                    : 'text-gray-400 hover:bg-white/10'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#0ea5e9] text-white'
                    : 'text-gray-400 hover:bg-white/10'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-400 py-3 px-4">Producto</th>
                  <th className="text-left text-gray-400 py-3 px-4">Categoría</th>
                  <th className="text-left text-gray-400 py-3 px-4">Marca</th>
                  <th className="text-left text-gray-400 py-3 px-4">Precio</th>
                  <th className="text-left text-gray-400 py-3 px-4">Stock</th>
                  <th className="text-left text-gray-400 py-3 px-4">Estado</th>
                  <th className="text-left text-gray-400 py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-white">{product.name}</p>
                          <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{product.category}</td>
                    <td className="py-4 px-4 text-gray-400">{product.brand}</td>
                    <td className="py-4 px-4 text-[#0ea5e9]">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={product.stock > 10 ? 'text-white' : 'text-yellow-400'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                        {product.stock > 0 ? 'En Stock' : 'Agotado'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors group">
                          <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                        </button>
                        <button 
                          onClick={() => { setEditingProduct(product); setShowModal(true); }}
                          className="p-2 hover:bg-green-500/20 rounded-lg transition-colors group">
                          <Edit className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard hover className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#0ea5e9] text-xl">
                      ${product.price.toLocaleString()}
                    </span>
                    <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                      Stock: {product.stock}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors">
                      <Eye className="w-4 h-4 mx-auto" />
                    </button>
                    <button 
                      onClick={() => { setEditingProduct(product); setShowModal(true); }}
                      className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-colors">
                      <Edit className="w-4 h-4 mx-auto" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
          <p className="text-gray-400">
            Mostrando {filteredProducts.length} productos
          </p>
        </div>
      </GlassCard>

      {/* Basic Modal for Create/Edit (Demo) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <GlassCard className="p-6 w-full max-w-md">
            <h2 className="text-2xl text-white mb-4">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <Input
                name="name"
                placeholder="Nombre del producto"
                defaultValue={editingProduct?.name || ''}
                required
              />
              <Input
                name="price"
                type="number"
                placeholder="Precio"
                defaultValue={editingProduct?.price || ''}
                required
              />
              <Input
                name="stock"
                type="number"
                placeholder="Stock"
                defaultValue={editingProduct?.stock || ''}
                required
              />
              <Input
                name="category"
                placeholder="Categoría"
                defaultValue={editingProduct?.category || ''}
                required
              />
              <div className="flex gap-4 pt-4">
                <NeonButton type="submit" variant="primary" className="flex-1">Guardar</NeonButton>
                <NeonButton type="button" variant="outline" className="flex-1" onClick={() => { setShowModal(false); setEditingProduct(null); }}>Cancelar</NeonButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
