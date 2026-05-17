import { motion } from 'motion/react';
import { ArrowRight, Zap, TrendingUp, Award, Cpu, Monitor, Keyboard, Mouse, Headphones, Gamepad2, Laptop } from 'lucide-react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { ProductCard } from '../components/ProductCard';
import { products, categories, brands } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export function Home() {
  const { addToCart } = useStore();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const newProducts = products.filter((p) => p.isNew);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const categoryIcons: Record<string, any> = {
    Laptop,
    Monitor,
    Cpu,
    MonitorSpeaker: Monitor,
    Keyboard,
    Mouse,
    Headphones,
    Gamepad2,
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1920"
          alt="Gaming Setup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-[#0ea5e9] to-[#3b82f6] bg-clip-text text-transparent">
              La Nueva Era del Gaming
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Descubre el hardware más potente y los accesorios gaming de última generación
            </p>
            <div className="flex gap-4">
              <Link to="/catalogo">
                <NeonButton variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
                  Explorar Productos
                </NeonButton>
              </Link>
              <Link to="/ofertas">
                <NeonButton variant="outline">
                  Ver Ofertas
                </NeonButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-20 relative z-30 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#0ea5e9]" />
              </div>
              <div>
                <h3 className="text-white">Envío Rápido</h3>
                <p className="text-gray-400 text-sm">Entrega en 24-48h</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-[#0ea5e9]" />
              </div>
              <div>
                <h3 className="text-white">Garantía Premium</h3>
                <p className="text-gray-400 text-sm">Hasta 3 años</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0ea5e9]" />
              </div>
              <div>
                <h3 className="text-white">Mejores Precios</h3>
                <p className="text-gray-400 text-sm">Ofertas exclusivas</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-white mb-8 text-center"
        >
          Categorías Destacadas
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category.icon] || Cpu;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/catalogo?categoria=${category.id}`}>
                  <GlassCard hover className="p-6 text-center group cursor-pointer">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6] rounded-lg flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(14,165,233,0.6)] transition-all">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white text-sm group-hover:text-[#0ea5e9] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{category.productCount}</p>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl text-white"
          >
            Productos Destacados
          </motion.h2>
          <Link to="/catalogo">
            <NeonButton variant="outline">Ver Todos</NeonButton>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-white mb-8 text-center"
        >
          Novedades
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-white mb-8 text-center"
        >
          Marcas Reconocidas
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover className="p-8 flex items-center justify-center">
                <img src={brand.logo} alt={brand.name} className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
