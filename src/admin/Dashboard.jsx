import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, Settings } from 'lucide-react';
import { getProducts, getOrders, logoutUser, isAdmin as checkIsAdmin } from '../utils/storage';
import { formatRupiah } from '../components/ProductCard';
import { confirmAction, showSuccess, showInfo, showError } from '../utils/alerts';

const STATUS_OPTIONS = [
  { value: 'menunggu', label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'diproses', label: 'Diproses', color: 'bg-blue-100 text-blue-700' },
  { value: 'dikirim', label: 'Dikirim', color: 'bg-purple-100 text-purple-700' },
  { value: 'selesai', label: 'Selesai', color: 'bg-green-100 text-green-700' },
  { value: 'dibatalkan', label: 'Dibatalkan', color: 'bg-red-100 text-red-700' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminData = checkIsAdmin();

    if (!adminData) {
      showError('Silakan login sebagai Admin terlebih dahulu.');
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);

    const products = getProducts();
    const orders = getOrders();

    const revenue = orders.reduce((sum, order) => sum + order.total, 0);

    setStats({
      products: products.length,
      orders: orders.length,
      revenue
    });

    setRecentOrders(orders.slice(-5).reverse());
  }, [navigate]);

  const handleLogout = async () => {
    const confirmed = await confirmAction({
      title: 'Logout Admin?',
      text: 'Anda akan keluar dari halaman admin.',
      confirmText: 'Logout'
    });

    if (confirmed) {
      logoutUser();
      await showSuccess('Logout berhasil!');
      navigate('/');
    }
  };

  const getStatusInfo = (status) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500 mt-1">Kelola toko parfum Anda</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Produk</p>
              <p className="text-4xl font-bold text-primary-600">{stats.products}</p>
            </div>
            <Package className="w-12 h-12 text-primary-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Pesanan</p>
              <p className="text-4xl font-bold text-primary-600">{stats.orders}</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Pendapatan</p>
              <p className="text-4xl font-bold text-green-600">{formatRupiah(stats.revenue)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link
          to="/admin/produk"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <Package className="w-10 h-10 text-primary-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Produk</h3>
              <p className="text-sm text-gray-500">Kelola produk</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/pesanan"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <ShoppingCart className="w-10 h-10 text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Pesanan</h3>
              <p className="text-sm text-gray-500">Kelola pesanan</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/pembayaran"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <Settings className="w-10 h-10 text-green-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Pembayaran</h3>
              <p className="text-sm text-gray-500">Atur rekening</p>
            </div>
          </div>
        </Link>

        <Link
          to="/"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <Package className="w-10 h-10 text-yellow-500" />
            <div>
              <h3 className="font-semibold text-gray-800">Website</h3>
              <p className="text-sm text-gray-500">Lihat website</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Pesanan Terbaru</h2>
            <Link to="/admin/pesanan" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Lihat Semua
            </Link>
          </div>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">ID Pesanan</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Pelanggan</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map(order => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm text-gray-800">{order.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800">{order.customer?.name || '-'}</p>
                          <p className="text-sm text-gray-500">{order.customer?.phone || '-'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-800">{formatRupiah(order.total)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500">Belum ada pesanan</p>
          </div>
        )}
      </div>
    </div>
  );
}
