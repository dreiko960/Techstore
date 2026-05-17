import { useState } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { products, categories } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export function Catalog() {
  const { addToCart } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const brands = [...new Set(products.map((p) => p.brand))];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedBrand && product.brand !== selectedBrand) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">Catálogo de Productos</h1>
        <p className="text-gray-400">Encuentra el hardware perfecto para tu setup</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <GlassCard className="p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-5 h-5 text-[#0ea5e9]" />
              <h2 className="text-white text-xl">Filtros</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-300 block mb-3">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white focus:outline-none focus:border-[#0ea5e9]"
                >
                  <option value="">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-3">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white focus:outline-none focus:border-[#0ea5e9]"
                >
                  <option value="">Todas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-3">
                  Rango de Precio: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#0ea5e9]"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#0ea5e9]" />
                  <span>Solo en stock</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#0ea5e9]" />
                  <span>Con descuento</span>
                </label>
              </div>
            </div>
          </GlassCard>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Mostrando {filteredProducts.length} productos
            </p>
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 bg-[rgba(30,41,59,0.5)] border border-[rgba(59,130,246,0.3)] rounded-lg text-white focus:outline-none focus:border-[#0ea5e9]">
                <option>Más relevantes</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Mejor valorados</option>
                <option>Novedades</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#0ea5e9] text-white'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#0ea5e9] text-white'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
