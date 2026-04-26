import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Package, Tag, ShoppingCart, Settings, Globe, LogOut, Menu, X } from "lucide-react";
import { logoutUser } from "../utils/storage";
import { confirmAction, showSuccess } from "../utils/alerts";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const confirmed = await confirmAction({
      title: "Logout Admin?",
      text: "Anda akan keluar dari halaman admin.",
      confirmText: "Logout"
    });
    if (confirmed) {
      logoutUser();
      await showSuccess("Logout berhasil!");
      navigate("/login");
    }
  };

  const navItems = [
    { to: "/admin", icon: Package, label: "Dashboard" },
    { to: "/admin/produk", icon: Package, label: "Produk" },
    { to: "/admin/pesanan", icon: ShoppingCart, label: "Pesanan" },
    { to: "/admin/pembayaran", icon: Settings, label: "Pembayaran" },
    { to: "/admin/brand", icon: Tag, label: "Brand" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Header - shows on lg and below */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 xl:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <Link to="/" className="text-lg font-bold text-gray-800">
          your.i <span className="text-primary-600">scent</span>
        </Link>
        <div className="w-10" />
      </div>

      {/* Overlay for mobile/tablet */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - always fixed on xl, toggleable on lg and below */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
          xl:block
        `}
      >
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
          >
            <Globe className="w-5 h-5" />
            <span>Lihat Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav - only shows below xl */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 xl:hidden">
        <div className="flex justify-around py-2">
          <Link to="/admin" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600">
            <Package className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/admin/produk" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600">
            <Package className="w-5 h-5" />
            <span className="text-xs">Produk</span>
          </Link>
          <Link to="/admin/pesanan" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Order</span>
          </Link>
          <Link to="/admin/pembayaran" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600">
            <Settings className="w-5 h-5" />
            <span className="text-xs">Bayar</span>
          </Link>
          <Link to="/admin/brand" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600">
            <Tag className="w-5 h-5" />
            <span className="text-xs">Brand</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 xl:ml-64 p-4 xl:p-8 pt-20 xl:pt-8 pb-24 xl:pb-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}