import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../components/ProductCard';
import { confirmAction, showSuccess, showInfo } from '../utils/alerts';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();
  const total = getCartTotal();
  const count = getCartCount();

  const handleRemove = async (item) => {
    const confirmed = await confirmAction({
      title: 'Hapus Item?',
      text: `${item.productName} akan dihapus dari keranjang.`,
      confirmText: 'Hapus'
    });

    if (confirmed) {
      removeFromCart(item.id);
      await showSuccess('Item berhasil dihapus dari keranjang.');
    } else {
      await showInfo('Dibatalkan. Item tidak jadi dihapus.');
    }
  };

  const handleClearCart = async () => {
    const confirmed = await confirmAction({
      title: 'Kosongkan Keranjang?',
      text: 'Semua item akan dihapus dari keranjang.',
      confirmText: 'Ya, Kosongkan'
    });

    if (confirmed) {
      clearCart();
      await showSuccess('Keranjang berhasil dikosongkan.');
    } else {
      await showInfo('Dibatalkan. Keranjang tetap tersimpan.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h1>
        <p className="text-gray-500 mb-8">Yuk, tambahkan parfum favoritmu!</p>
        <Link to="/catalog" className="btn-primary inline-block">
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Keranjang</h1>
          <p className="text-gray-500 mt-1">{count} item dalam keranjang</p>
        </div>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
        >
          Kosongkan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {cart.map(item => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-lg truncate">{item.productName}</h3>
                      {item.type && (
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${
                          item.type === 'decant' ? 'bg-yellow-100 text-yellow-700' :
                          item.type === 'preloved' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                        {item.type.toUpperCase()}
                      </span>
                      )}
                    </div>
                    <p className="text-sm text-primary-600 font-medium">{item.brand}</p>
                    {item.size ? (
                      <p className="text-sm text-gray-500 mt-1">Ukuran: {item.size}ml</p>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">Ukuran: -</p>
                    )}
                    <p className="font-medium text-primary-600 mt-2">
                      {formatRupiah(item.price)} / item
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-800 text-lg">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => handleRemove(item)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/catalog" className="inline-block text-primary-600 font-medium hover:text-primary-700 mt-6">
            Lanjut Belanja
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({count} item)</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end">
                <span className="text-gray-600">Total</span>
                <span className="text-3xl font-bold text-primary-600">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary py-4"
            >
              Lanjut ke Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
