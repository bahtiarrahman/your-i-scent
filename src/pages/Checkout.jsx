import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart, saveOrder, getCurrentUser, logoutUser, getPaymentSettings } from '../utils/storage';
import { showSuccess, showError, showWarning, confirmAction } from '../utils/alerts';
import { Building2, Wallet, Truck, CheckCircle, MessageCircle, ArrowLeft, LogOut } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState({ bank: [], ewallet: [], whatsappAdmin: '' });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    if (!user) {
      showWarning('Kamu harus login dulu sebelum checkout.');
      navigate('/login');
      return;
    }

    const cartData = getCart();
    if (cartData.length === 0) {
      showWarning('Keranjang Anda kosong!');
      navigate('/cart');
      return;
    }
    setCart(cartData);

    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });

    const settings = getPaymentSettings();
    setPaymentSettings(settings);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    const confirmed = await confirmAction({
      title: 'Logout',
      text: 'Apakah Anda yakin ingin logout?',
      confirmText: 'Ya, Logout'
    });

    if (confirmed) {
      logoutUser();
      await showSuccess('Logout berhasil!');
      navigate('/');
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatRupiah = (amount) => {
    return 'Rp ' + amount.toLocaleString('id-ID');
  };

  const getPaymentDetails = () => {
    if (paymentMethod === 'bank') {
      return paymentSettings.bank.map(bank => (
        <div key={bank.id} className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{bank.name}</p>
          <p className="text-sm text-gray-600">Nomor: <span className="font-medium">{bank.accountNumber}</span></p>
          <p className="text-sm text-gray-600">Atas Nama: <span className="font-medium">{bank.accountName}</span></p>
        </div>
      ));
    } else if (paymentMethod === 'ewallet') {
      return paymentSettings.ewallet.map(ew => (
        <div key={ew.id} className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{ew.name}</p>
          <p className="text-sm text-gray-600">Nomor: <span className="font-medium">{ew.number}</span></p>
        </div>
      ));
    } else {
      return (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-600">
            Pembayaran dilakukan saat barang sampai di alamat pengiriman.
          </p>
        </div>
      );
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'bank': return 'Transfer Bank';
      case 'ewallet': return 'E-Wallet';
      case 'cod': return 'COD (Bayar di Tempat)';
      default: return method;
    }
  };

  const openWhatsApp = (order) => {
    const adminNumber = paymentSettings.whatsappAdmin;
    const message = `Halo Admin your.i scent,

Saya sudah melakukan pemesanan.

ID Pesanan: ${order.id}
Nama: ${order.customer.name}
No HP: ${order.customer.phone}
Alamat: ${order.customer.address}
Metode Pembayaran: ${getPaymentMethodLabel(order.payment)}
Total: ${formatRupiah(order.total)}

Saya akan kirim bukti transfer ya. Terima kasih`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      showError('Keranjang Anda kosong!');
      return;
    }

    const order = {
      id: 'ORD-' + Date.now(),
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address
      },
      items: cart,
      total: getTotalPrice(),
      payment: paymentMethod,
      status: 'menunggu',
      date: new Date().toISOString()
    };

    saveOrder(order);
    clearCart();
    setCreatedOrder(order);
    setOrderComplete(true);

    await showSuccess('Pesanan berhasil dibuat!');
  };

  if (orderComplete && createdOrder) {
    return (
      <div className="min-h-screen bg-primary-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Pesanan Berhasil Dibuat
            </h1>
            <p className="text-gray-600">
              Silakan lakukan pembayaran terlebih dahulu sesuai metode yang kamu pilih.
              Setelah transfer, klik tombol Konfirmasi WhatsApp untuk mengirim bukti pembayaran.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Detail Pesanan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Pesanan</span>
                <span className="font-mono font-medium">{createdOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bayar</span>
                <span className="font-bold text-yellow-600">{formatRupiah(createdOrder.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span className="font-medium">{getPaymentMethodLabel(createdOrder.payment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Menunggu Konfirmasi
                </span>
              </div>
            </div>
          </div>

          {createdOrder.payment !== 'cod' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {createdOrder.payment === 'bank' ? 'Rekening Transfer' : 'Nomor E-Wallet'}
              </h2>
              <div className="space-y-3">
                {createdOrder.payment === 'bank' ? (
                  paymentSettings.bank.map(bank => (
                    <div key={bank.id} className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-gray-800 mb-1">{bank.name}</p>
                      <p className="text-sm text-gray-600">{bank.accountNumber} ({bank.accountName})</p>
                    </div>
                  ))
                ) : (
                  paymentSettings.ewallet.map(ew => (
                    <div key={ew.id} className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-gray-800 mb-1">{ew.name}</p>
                      <p className="text-sm text-gray-600">{ew.number}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => openWhatsApp(createdOrder)}
            className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <MessageCircle className="w-5 h-5" />
            Konfirmasi Pembayaran via WhatsApp
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Status pesanan akan berubah setelah admin mengonfirmasi pembayaran.
          </p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-bold text-gray-800 mb-5 text-center">
          Checkout
        </h1>

        {currentUser && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Login sebagai</p>
              <p className="font-semibold text-gray-800">{currentUser.name} ({currentUser.email})</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Metode Pembayaran</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'bank' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-yellow-500"
                  />
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Transfer Bank</span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'ewallet' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ewallet"
                    checked={paymentMethod === 'ewallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-yellow-500"
                  />
                  <Wallet className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">E-Wallet</span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-yellow-500"
                  />
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">COD (Bayar di Tempat)</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {paymentMethod === 'bank' ? 'Rekening Transfer' : paymentMethod === 'ewallet' ? 'Nomor E-Wallet' : 'Informasi COD'}
              </h2>
              <div className="space-y-3">{getPaymentDetails()}</div>
            </div>

            <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">Langkah Pembayaran</h2>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium text-yellow-800">1</span>
                  Buat pesanan terlebih dahulu
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium text-yellow-800">2</span>
                  Lakukan transfer sesuai metode pembayaran
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium text-yellow-800">3</span>
                  Klik tombol konfirmasi WhatsApp
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium text-yellow-800">4</span>
                  Kirim bukti pembayaran ke admin
                </li>
              </ol>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{item.productName}</p>
                        {item.type && (
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            item.type === 'decant' ? 'bg-yellow-100 text-yellow-700' :
                            item.type === 'preloved' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {item.size ? `Ukuran: ${item.size}ml x ${item.quantity}` : `Ukuran: - x ${item.quantity}`}
                      </p>
                    </div>
                    <p className="font-semibold text-yellow-600">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">Total</p>
                    <p className="font-bold text-xl text-yellow-600">Rp {getTotalPrice().toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Data Pengiriman</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: 6281234567890"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-gray-800 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Buat Pesanan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
