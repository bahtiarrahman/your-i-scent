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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold text-gray-800">
          your.i <span className="text-primary-600">scent</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:block pt-16 lg:pt-0
        `}
      >
        <div className="p-4 lg:p-6 border-b border-gray-100 hidden lg:block">
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

        <div className="p-4 border-t border-gray-100 mt-auto hidden lg:block">
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

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
          <Link
            to="/admin/brand"
            className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600"
          >
            <Tag className="w-5 h-5" />
            <span className="text-xs">Brand</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}