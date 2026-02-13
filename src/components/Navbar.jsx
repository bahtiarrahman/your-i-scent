import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getCurrentUser, logoutUser, isAdmin } from '../utils/storage';
import { showSuccess } from '../utils/alerts';
import { useState } from 'react';

export default function Navbar() {
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();
  const currentUser = getCurrentUser();
  const isAdminUser = isAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/catalog', label: 'Katalog' },
    { path: '/tentang', label: 'Tentang' },
    { path: '/kontak', label: 'Kontak' },
    { path: '/faq', label: 'FAQ' },
  ];

  const handleLogout = async () => {
    logoutUser();
    await showSuccess('Logout berhasil!');
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <span>
              your.i <span className="text-yellow-500">scent</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-lg transition-all duration-200 ${
                isActive('/cart')
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
                <Link
                  to="/akun"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/akun')
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Akun
                </Link>
                {isAdminUser && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-200 transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-yellow-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium"
              >
                <ShoppingCart className="w-4 h-4" />
                Keranjang
                {cartCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {currentUser ? (
                <>
                  <Link
                    to="/akun"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    Akun
                  </Link>
                  {isAdminUser && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 px-4 py-2 text-center text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 px-4 py-2 text-center bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
