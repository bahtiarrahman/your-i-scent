import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, getOrdersByUser, isLoggedIn } from '../utils/storage';
import { formatRupiah } from '../components/ProductCard';
import { confirmAction, showSuccess, showWarning } from '../utils/alerts';
import Swal from 'sweetalert2';

export default function Account() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      showWarning('Kamu harus login dulu untuk membuka halaman akun.');
      navigate('/login');
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = () => {
    setIsLoading(true);
    const userEmail = currentUser?.email;
    
    if (userEmail) {
      const userOrders = getOrdersByUser(userEmail);
      setOrders(userOrders);
    } else {
      setOrders([]);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    const confirmed = await confirmAction({
      title: 'Yakin mau logout?',
      text: 'Kamu akan keluar dari akunmu.',
      confirmText: 'Logout',
      cancelText: 'Batal'
    });

    if (confirmed) {
      logoutUser();
      await showSuccess('Logout berhasil!');
      navigate('/');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'menunggu':
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'diproses':
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'dikirim':
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'selesai':
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'dibatalkan':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'menunggu':
      case 'pending':
        return 'Menunggu';
      case 'diproses':
      case 'confirmed':
        return 'Diproses';
      case 'dikirim':
      case 'shipped':
        return 'Dikirim';
      case 'selesai':
      case 'completed':
        return 'Selesai';
      case 'dibatalkan':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  const getPaymentText = (payment) => {
    switch (payment) {
      case 'transfer':
        return 'Transfer Bank';
      case 'cod':
        return 'COD';
      default:
        return payment;
    }
  };

  const showOrderDetail = (order) => {
    let itemsHtml = '';
    order.items.forEach((item) => {
      itemsHtml += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
          <img src="${item.productImage}" alt="${item.productName}" class="w-12 h-12 object-cover rounded-lg" />
          <div class="flex-1">
            <p class="font-medium text-gray-800">${item.productName}</p>
            <p class="text-sm text-gray-500">${item.size}ml x ${item.quantity}</p>
          </div>
          <span class="font-medium text-gray-700">${formatRupiah(item.price * item.quantity)}</span>
        </div>
      `;
    });

    Swal.fire({
      title: 'Detail Pesanan',
      html: `
        <div class="text-left">
          <div class="bg-primary-50 p-4 rounded-xl mb-4">
            <p class="font-mono text-sm text-primary-700 mb-2">${order.id}</p>
            <p class="text-sm text-gray-600">${formatDate(order.date)}</p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium text-gray-800 mb-2">Data Penerima</h4>
            <p class="text-sm text-gray-600">${order.customer?.name || '-'}</p>
            <p class="text-sm text-gray-600">${order.customer?.phone || '-'}</p>
            <p class="text-sm text-gray-600">${order.customer?.address || '-'}</p>
          </div>
          <h4 class="font-medium text-gray-800 mb-2">Rincian Pesanan</h4>
          ${itemsHtml}
          <div class="border-t border-gray-200 pt-3 mt-3">
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-800">Total Pembayaran</span>
              <span class="text-xl font-bold text-primary-600">${formatRupiah(order.total)}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-600">Metode</span>
              <span class="text-sm font-medium text-gray-700">${getPaymentText(order.payment)}</span>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm text-gray-600">Status</span>
              <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}">
                ${getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#facc15',
      width: '500px'
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Akun Saya</h1>
          <p className="text-gray-600">Kelola profil dan pesananmu</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-medium text-primary-600">AK</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{currentUser.name}</h2>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  currentUser.role === 'admin'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {currentUser.role === 'admin' ? 'Admin' : 'Customer'}
                </span>
              </div>

              {currentUser.role === 'admin' && (
                <Link
                  to="/admin"
                  className="w-full py-3 bg-yellow-100 text-yellow-700 rounded-xl font-medium hover:bg-yellow-200 transition-colors block text-center mb-3"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
              >
                Logout
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link to="/" className="block text-gray-600 hover:text-primary-600 py-2">
                  Kembali ke Beranda
                </Link>
                <Link to="/catalog" className="block text-gray-600 hover:text-primary-600 py-2">
                  Lihat Katalog
                </Link>
                <Link to="/cart" className="block text-gray-600 hover:text-primary-600 py-2">
                  Lihat Keranjang
                </Link>
              </div>
            </div>
          </div>

          {/* Order History Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Riwayat Pesanan</h2>

              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Memuat pesanan...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Belum ada pesanan</p>
                  <Link to="/catalog" className="btn-primary inline-block">
                    Belanja Sekarang
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="font-mono text-sm text-gray-500">{order.id}</p>
                          <p className="text-sm text-gray-400">{formatDate(order.date)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getPaymentText(order.payment)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {order.items.length} item(s) - {order.items.map(i => i.productName).slice(0, 2).join(', ')}
                          {order.items.length > 2 && ` +${order.items.length - 2} lainnya`}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary-600">
                            {formatRupiah(order.total)}
                          </span>
                          <button
                            onClick={() => showOrderDetail(order)}
                            className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
