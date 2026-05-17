import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-white">Producto no encontrado</div>;
  }

  const images = product.images || [product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0ea5e9] mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative overflow-hidden rounded-xl mb-4"
          >
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            {product.discount && (
              <Badge variant="discount" className="absolute top-4 right-4">
                -{product.discount}%
              </Badge>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-[#0ea5e9] shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                    : 'border-transparent hover:border-[#0ea5e9]/50'
                }`}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <span className="text-[#0ea5e9] text-sm">{product.brand}</span>
            <h1 className="text-4xl text-white mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-white">{product.rating}</span>
              </div>
              <span className="text-gray-400">({product.reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <Badge variant="success">En stock ({product.stock})</Badge>
              ) : (
                <Badge variant="error">Agotado</Badge>
              )}
              <span className="text-gray-400">SKU: {product.sku}</span>
            </div>
          </div>

          <GlassCard className="p-6 mb-6">
            <div className="flex items-baseline gap-4 mb-6">
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-5xl text-[#0ea5e9]">
                ${product.price.toLocaleString()}
              </span>
            </div>

            <p className="text-gray-300 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <span className="w-16 text-center text-white text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              <NeonButton
                variant="primary"
                className="flex-1"
                icon={<ShoppingCart className="w-5 h-5" />}
                onClick={() => addToCart(product, quantity)}
              >
                Agregar al Carrito
              </NeonButton>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center justify-center gap-2 transition-colors">
                <Heart className="w-5 h-5" />
                Favoritos
              </button>
              <button className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center justify-center gap-2 transition-colors">
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="p-4 flex items-center gap-3">
              <Truck className="w-8 h-8 text-[#0ea5e9]" />
              <div>
                <p className="text-white text-sm">Envío Gratis</p>
                <p className="text-gray-400 text-xs">Entrega en 24-48h</p>
              </div>
            </GlassCard>
            <GlassCard className="p-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#0ea5e9]" />
              <div>
                <p className="text-white text-sm">Garantía</p>
                <p className="text-gray-400 text-xs">Hasta 3 años</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <GlassCard className="p-6">
          <h2 className="text-2xl text-white mb-6">Especificaciones Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications &&
              Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">{key}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <h2 className="text-3xl text-white mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
