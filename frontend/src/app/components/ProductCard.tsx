import { motion } from 'motion/react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { Badge } from './ui/Badge';
import { NeonButton } from './ui/NeonButton';
import { GlassCard } from './ui/GlassCard';
import { Link } from 'react-router';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <GlassCard hover className="p-4 group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <Badge variant="new" className="absolute top-3 left-3">
            NUEVO
          </Badge>
        )}
        {product.discount && (
          <Badge variant="discount" className="absolute top-3 right-3">
            -{product.discount}%
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link to={`/producto/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Eye className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart?.(product)}
            className="p-3 bg-[#0ea5e9]/80 backdrop-blur-sm rounded-full hover:bg-[#0ea5e9] transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{product.brand}</span>
          {product.stock < 10 && (
            <Badge variant="warning" className="text-xs">
              Solo {product.stock}
            </Badge>
          )}
        </div>

        <h3 className="text-white group-hover:text-[#0ea5e9] transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-300">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl text-[#0ea5e9]">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <NeonButton
            variant="primary"
            onClick={() => onAddToCart?.(product)}
            className="px-4 py-2 text-sm"
          >
            Agregar
          </NeonButton>
        </div>
      </div>
    </GlassCard>
  );
}
