import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProducts, getCategories } from '../utils/storage';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const products = getProducts();
    const found = products.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      const categories = getCategories();
      setCategory(categories.find(c => c.id === found.categoryId));
    }
  }, [id]);

  const isDecant = product?.type === 'decant';
  
  // Support both old (sizes array) and new (prices object) format
  const prices = product?.prices || {};
  const sizesArray = product?.sizes || [];
  
  // Get price for specific size from new format or fallback to old format
  const getPriceForSize = (size) => {
    return prices[String(size)] || sizesArray.find(s => s.size === size)?.price || 0;
  };

  // Available sizes for decant
  const availableSizes = prices["2"] ? [2, 5, 10] : sizesArray.map(s => s.size);
  
  const handleAddToCart = () => {
    const size = isDecant ? selectedSize : null;
    const price = isDecant ? getPriceForSize(selectedSize) : product.price;
    
    addToCart(product, size, quantity, price);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const selectedPrice = isDecant ? getPriceForSize(selectedSize) : product?.price || 0;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Produk tidak ditemukan</h2>
        <p className="text-gray-500 mb-6">Produk yang Anda cari tidak tersedia</p>
        <Link to="/catalog" className="text-primary-600 font-medium hover:text-primary-700">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  // Get type badge
  const getTypeBadge = () => {
    const badges = {
      decant: { label: 'DECANT', class: 'bg-yellow-100 text-yellow-700' },
      preloved: { label: 'PRELOVED', class: 'bg-blue-100 text-blue-700' },
      bnib: { label: 'BNIB', class: 'bg-purple-100 text-purple-700' }
    };
    const badge = badges[product.type] || badges.decant;
    return (
      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  // Get notes with fallback
  const notes = product?.notes || {};
  const topNotes = notes.top || '';
  const middleNotes = notes.middle || '';
  const baseNotes = notes.base || '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-primary-600">Beranda</Link>
        <span className="text-gray-400">/</span>
        <Link to="/catalog" className="text-gray-500 hover:text-primary-600">Katalog</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative bg-gray-50">
            <div className="aspect-square p-8">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            {category && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {category.name}
              </span>
            )}
            <span className="absolute top-4 right-4">
              {getTypeBadge()}
            </span>
          </div>

          <div className="p-8 lg:p-10">
            <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h1 className="text-xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Size Selection - Only for Decant */}
            {isDecant && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Pilih Ukuran</label>
                <div className="flex gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="block text-lg font-bold">{size}ml</span>
                      <span className="text-sm text-gray-500">{formatRupiah(getPriceForSize(size))}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fixed Price Display - For Non-Decant */}
            {!isDecant && (
              <div className="mb-5 p-3 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-xl">
                <p className="text-xs text-gray-600 mb-1">Harga</p>
                <p className="text-xl font-bold text-primary-600">
                  {formatRupiah(product.price)}
                </p>
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Harga</p>
              <p className="text-3xl font-bold text-primary-600">
                {formatRupiah(selectedPrice * quantity || 0)}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {added ? 'Ditambahkan ke Keranjang' : 'Tambah ke Keranjang'}
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                className="w-full py-3 rounded-xl font-medium text-sm border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-200"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Fragrance Notes Section */}
        {(topNotes || middleNotes || baseNotes) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mx-4 mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Fragrance Notes</h2>
              <p className="text-gray-500 text-sm mt-1">Komposisi aroma parfum</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Top Notes</h3>
                <p className="text-gray-800">{topNotes || '-'}</p>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Middle Notes</h3>
                <p className="text-gray-800">{middleNotes || '-'}</p>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Base Notes</h3>
                <p className="text-gray-800">{baseNotes || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

