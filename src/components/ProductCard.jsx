import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { showSuccess } from '../utils/alerts';

export default function ProductCard({ product }) {
  const isDecant = product.type === 'decant';
  
  // Support both old (sizes array) and new (prices object) format
  const prices = product.prices || {};
  const sizesArray = product.sizes || [];
  
  // Get prices from new format or fallback to old format
  const getPrice2ml = () => prices["2"] || sizesArray.find(s => s.size === 2)?.price || 0;
  const getPrice5ml = () => prices["5"] || sizesArray.find(s => s.size === 5)?.price || 0;
  const getPrice10ml = () => prices["10"] || sizesArray.find(s => s.size === 10)?.price || 0;
  
  const displayPrice = isDecant ? getPrice2ml() : product.price;
  
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const size = isDecant ? selectedSize : null;
    const price = isDecant 
      ? (prices[String(selectedSize)] || sizesArray.find(s => s.size === selectedSize)?.price)
      : product.price;
    
    addToCart(product, size, 1, price);
    
    const productName = isDecant 
      ? `${product.name} (${selectedSize}ml)` 
      : product.name;
    showSuccess(`${productName} ditambahkan ke keranjang!`);
  };

  const getTypeBadge = () => {
    const badges = {
      decant: { label: 'DECANT', class: 'bg-yellow-100 text-yellow-700' },
      preloved: { label: 'PRELOVED', class: 'bg-blue-100 text-blue-700' },
      bnib: { label: 'BNIB', class: 'bg-purple-100 text-purple-700' }
    };
    const badge = badges[product.type] || badges.decant;
    return (
      <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-sm flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {product.category?.name || 'Parfum'}
        </span>
        {/* Type Badge */}
        {getTypeBadge()}
        {/* Hover Overlay with Quick Actions */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-white rounded-full hover:bg-yellow-50 transition-colors shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <p className="text-xs font-medium text-yellow-600 uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2 group-hover:text-yellow-600 transition-colors">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        {isDecant ? (
          <>
            <p className="text-xs text-gray-400 mb-2">Mulai dari</p>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-gray-800">
                {formatRupiah(displayPrice)}
              </p>
              <div className="flex gap-1.5">
                {[2, 5].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'bg-yellow-100 text-yellow-700 font-medium'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {size}ml
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-800">
              {formatRupiah(product.price)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Detail
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}
