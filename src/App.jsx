import { Routes, Route, useLocation } from 'react-router-dom';
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

// Admin
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import Orders from './admin/Orders';
import Brands from './admin/Brands';
import AdminLayout from './admin/AdminLayout';

// Guards
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin as checkIsAdmin } from './utils/storage';

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

function UserRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIsLoggedIn()) {
      showWarning('Kamu harus login dulu.');
      navigate('/login');
    }
  }, [navigate]);

  return checkIsLoggedIn() ? children : null;
}

function App() {
  initStorage();

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-primary-50">

        {!isAdminPage && <Navbar />}

        <main className="flex-1">
          <Routes>

            {/* USER */}
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

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="produk" element={<Products />} />
              <Route path="pesanan" element={<Orders />} />
              <Route path="pembayaran" element={<PaymentSettings />} />
              <Route path="brand" element={<Brands />} />
            </Route>

          </Routes>
        </main>

        {!isAdminPage && <Footer />}

      </div>
    </CartProvider>
  );
}

export default App;