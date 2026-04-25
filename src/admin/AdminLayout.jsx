import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Package, Tag, ShoppingCart, Settings, Globe, LogOut } from 'lucide-react';
import { logoutUser } from '../utils/storage';
import { confirmAction, showSuccess } from '../utils/alerts';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await confirmAction({
      title: 'Logout Admin?',
      text: 'Anda akan keluar dari halaman admin.',
      confirmText: 'Logout'
    });
    if (confirmed) {
      logoutUser();
      await showSuccess('Logout berhasil!');
      navigate('/login');
    }
  };

  const navItems = [
    { to: '/admin', icon: Package, label: 'Dashboard' },
    { to: '/admin/produk', icon: Package, label: 'Produk' },
    { to: '/admin/pesanan', icon: ShoppingCart, label: 'Pesanan' },
    { to: '/admin/pembayaran', icon: Settings, label: 'Pembayaran' },
    { to: '/admin/brand', icon: Tag, label: 'Brand' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="text-xl font-bold text-gray-800">
            your.i <span className="text-primary-600">scent</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-primary-600"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
          >
            <Globe className="w-5 h-5" />
            <span>Lihat Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>

    </div>
  );
}