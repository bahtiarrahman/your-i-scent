import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign } from 'lucide-react';
import { getProducts, getOrders, isAdmin as checkIsAdmin } from '../utils/storage';
import { formatRupiah } from '../components/ProductCard';

const STATUS_OPTIONS = [
  { value: 'menunggu', label: 'Menunggu', color: 'bg-gray-100 text-gray-700' },
  { value: 'diproses', label: 'Diproses', color: 'bg-primary-100 text-primary-700' },
  { value: 'dikirim', label: 'Dikirim', color: 'bg-primary-100 text-primary-700' },
  { value: 'selesai', label: 'Selesai', color: 'bg-green-100 text-green-700' },
  { value: 'dibatalkan', label: 'Dibatalkan', color: 'bg-gray-100 text-gray-500' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0, completed: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!checkIsAdmin()) {
      navigate('/login');
      return;
    }
    setIsLoggedIn(true);
    loadData();
  }, [navigate]);

  const loadData = () => {
    const orders = getOrders();
    const products = getProducts();
    
    setStats({
      products: products.length,
      orders: orders.length,
      revenue: orders.filter(o => o.status === 'selesai').reduce((sum, o) => sum + (o.total || 0), 0),
      pending: orders.filter(o => o.status === 'menunggu' || o.status === 'diproses').length,
      completed: orders.filter(o => o.status === 'selesai').length
    });

    setRecentOrders(orders.slice(-5).reverse());
  };

  const getStatusInfo = (status) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  };

  const completedPercent = stats.orders > 0 ? Math.round((stats.completed / stats.orders) * 100) : 0;

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards - Primary Yellow theme */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl p-6 text-white">
          <Package className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.products}</p>
          <p className="text-sm opacity-80">Total Produk</p>
        </div>

        <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl p-6 text-white">
          <ShoppingCart className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.orders}</p>
          <p className="text-sm opacity-80">Total Pesanan</p>
        </div>

        <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl p-6 text-white">
          <DollarSign className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-xl font-bold">{formatRupiah(stats.revenue)}</p>
          <p className="text-sm opacity-80">Pendapatan</p>
        </div>

        <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl p-6 text-white">
          <Package className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.completed}</p>
          <p className="text-sm opacity-80">Selesai</p>
        </div>
      </div>

      {/* Stats Box */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Statistik Pesanan</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Selesai</span>
                <span className="font-medium text-primary-600">{completedPercent}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${completedPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-primary-600">{stats.pending} pesanan</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Ringkasan</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
              <span className="text-gray-600">Produk Aktif</span>
              <span className="font-bold text-primary-600">{stats.products}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
              <span className="text-gray-600">Pesanan Pending</span>
              <span className="font-bold text-primary-600">{stats.pending}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-gray-600">Pesanan Selesai</span>
              <span className="font-bold text-green-600">{stats.completed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Pesanan Terbaru</h2>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada pesanan</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map(order => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} className="p-4 lg:p-6 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{order.nama || 'Guest'}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} item</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{formatRupiah(order.total || 0)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}