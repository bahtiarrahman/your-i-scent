import { Link } from 'react-router-dom';
import { Sparkles, Tag, ShieldCheck, Star, DollarSign, Box } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tentang Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Toko parfum decant dan parfum original terpercaya di Tambak Boyo, Yogyakarta
          </p>
        </div>
      </section>

      {/* Business Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Cerita Kami
            </h2>
            <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-6">
              Your.i Scent merupakan usaha parfum yang berlokasi di area Tambak Boyo, Sleman, DIY. 
              Kami menyediakan berbagai jenis parfum mulai dari decant untuk coba-coba, 
              preloved, hingga BNIB (Brand New In Box).
            </p>
            <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-6">
              Kami percaya bahwa setiap aroma memiliki karakter, dan setiap individu berhak menemukan signature scent yang merepresentasikan dirinya.             
              Melalui sistem decant, kami memberikan kesempatan bagi Anda untuk mengeksplorasi berbagai parfum berkualitas sebelum memutuskan untuk memiliki full bottle</p>
            <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
              Your.i Scent hadir sebagai ruang eksplorasi aroma — di mana kualitas, kepercayaan, dan pengalaman menjadi prioritas utama.</p>
          </div>
        </div>
      </section>

      {/* Products We Sell Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Produk yang Kami Jual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Product 1 */}
            <div className="bg-primary-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                Decant Parfum
              </h3>
              <p className="text-sm text-gray-600">
                Ukuran 2ml, 5ml, 10ml untuk coba-coba sebelum beli penuh
              </p>
            </div>

            {/* Product 2 */}
            <div className="bg-primary-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Tag className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                Preloved Parfum
              </h3>
              <p className="text-sm text-gray-600">
                Parfum second berkualitas dengan harga lebih terjangkau
              </p>
            </div>

            {/* Product 3 */}
            <div className="bg-primary-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                BNIB
              </h3>
              <p className="text-sm text-gray-600">
                Brand New In Box, belum pernah dibuka sama sekali
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Cara Pesan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Pilih Parfum
              </h3>
              <p className="text-sm text-gray-600">
                Telusuri katalog parfum kami
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Pilih Ukuran
              </h3>
              <p className="text-sm text-gray-600">
                2ml, 5ml, 10ml, atau 30ml
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Checkout
              </h3>
              <p className="text-sm text-gray-600">
                Konfirmasi via WhatsApp
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Produk Dikirim
              </h3>
              <p className="text-sm text-gray-600">
                Pengiriman ke alamat Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ingin coba parfum baru hari ini?
            </h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              Temukan aroma favoritmu dari koleksi parfum decant original kami.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Lihat Katalog
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
