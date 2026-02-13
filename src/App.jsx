import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { initStorage, isLoggedIn as checkIsLoggedIn } from './utils/storage';
import { showWarning } from './utils/alerts';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PaymentSettings from './admin/PaymentSettings';

// Admin Pages
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import Orders from './admin/Orders';

// Route Guards
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin as checkIsAdmin } from './utils/storage';

// Admin Route Guard - only for admins
function AdminRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIsAdmin()) {
      showWarning('Anda tidak punya akses ke halaman admin!');
      navigate('/login');
    }
  }, [navigate]);

  return checkIsAdmin() ? children : null;
}

// User Route Guard - for any logged in user (user or admin)
function UserRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIsLoggedIn()) {
      showWarning('Kamu harus login dulu untuk membuka halaman akun.');
      navigate('/login');
    }
  }, [navigate]);

  return checkIsLoggedIn() ? children : null;
}

function App() {
  initStorage();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-primary-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Customer Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/akun"
              element={
                <UserRoute>
                  <Account />
                </UserRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/produk"
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/pesanan"
              element={
                <AdminRoute>
                  <Orders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/pembayaran"
              element={
                <AdminRoute>
                  <PaymentSettings />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
