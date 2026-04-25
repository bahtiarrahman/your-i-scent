import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Package, Tag, ShoppingCart, Settings, Globe, LogOut, Menu, X } from 'lucide-react';
import { logoutUser } from '../utils/storage';
import { confirmAction, showSuccess } from '../utils/alerts';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <Link to="/" className="text-lg font-bold text-gray-800">
          your.i <span className="text-primary-600">scent</span>
        </Link>
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:fixed inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 h-full overflow-y-auto
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            your.i <span className="text-primary-600">scent</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
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
            onClick={() => setSidebarOpen(false)}
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
      <main className="flex-1 lg:ml-64 p-4 lg:p-6 pt-20 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}