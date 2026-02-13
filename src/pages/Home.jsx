import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Sparkles, Tag, Package, ShieldCheck } from 'lucide-react';

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-yellow-400 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Wangi &amp; Berkualitas<br />
            <span className="text-yellow-200">Harga Terjangkau</span>
          </h1>
          <p className="text-base md:text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Coba parfum premium dengan ukuran decant. Hemat, praktis, dan tetap originals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="px-8 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Lihat Katalog
            </Link>
            <Link
              to="/catalog"
              className="px-8 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              Cari Parfum
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Produk Unggulan</h2>
              <p className="text-gray-500 text-sm mt-0.5">Pilihan parfum terbaik untuk Anda</p>
            </div>
            <Link
              to="/catalog"
              className="text-primary-600 font-medium hover:text-primary-700 transition-colors text-sm"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Products We Sell Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Produk yang Kami Jual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-sm">Decant Parfum</h3>
              <p className="text-xs text-gray-500">2ml, 5ml, 10ml</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Tag className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-sm">Preloved Parfum</h3>
              <p className="text-xs text-gray-500">Second berkualitas</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1 text-sm">BNIB</h3>
              <p className="text-xs text-gray-500">Brand New In Box</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary-500 to-yellow-400">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Ingin mencoba parfum premium?
          </h2>
          <p className="text-primary-100 mb-5 text-sm">
            Beli ukuran decant dulu sebelum membeli full bottle. Hemat &amp; praktis!
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-white text-primary-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Kenapa Pilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-1 text-sm">Harga Terjangkau</h3>
              <p className="text-gray-600 text-xs">Nikmati aroma parfum premium dengan harga decant yang ramah di kantong</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-1 text-sm">Kualitas Terjamin</h3>
              <p className="text-gray-600 text-xs">Setiap decant dijamin original dengan standar kualitas tinggi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
