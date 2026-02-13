import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getPaymentSettings, 
  savePaymentSettings, 
  isAdmin as checkIsAdmin,
  logoutUser 
} from '../utils/storage';
import { confirmAction, showSuccess, showError, showInfo } from '../utils/alerts';
import Swal from 'sweetalert2';
import { Save, LogOut, Building2, Smartphone, MessageCircle, CreditCard, Circle, Lightbulb } from 'lucide-react';

export default function PaymentSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    bank: [],
    ewallet: [],
    whatsappAdmin: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('bank');

  useEffect(() => {
    const adminData = checkIsAdmin();

    if (!adminData) {
      showError('Silakan login sebagai Admin terlebih dahulu.');
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);
    loadSettings();
  }, [navigate]);

  const loadSettings = () => {
    const data = getPaymentSettings();
    setSettings(data);
  };

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

  const updateBank = (bankId, field, value) => {
    const updatedBank = settings.bank.map(bank => 
      bank.id === bankId ? { ...bank, [field]: value } : bank
    );
    const newSettings = { ...settings, bank: updatedBank };
    setSettings(newSettings);
    savePaymentSettings(newSettings);
  };

  const updateEwallet = (ewalletId, field, value) => {
    const updatedEwallet = settings.ewallet.map(ew => 
      ew.id === ewalletId ? { ...ew, [field]: value } : ew
    );
    const newSettings = { ...settings, ewallet: updatedEwallet };
    setSettings(newSettings);
    savePaymentSettings(newSettings);
  };

  const updateWhatsApp = (value) => {
    const newSettings = { ...settings, whatsappAdmin: value };
    setSettings(newSettings);
    savePaymentSettings(newSettings);
  };

  const handleSave = async () => {
    savePaymentSettings(settings);
    await showSuccess('Pengaturan pembayaran berhasil disimpan!');
  };

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Pengaturan Pembayaran</h1>
          <p className="text-gray-500 text-sm mt-0.5">Kelola rekening dan nomor WhatsApp admin</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Back Link */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        ← Kembali ke Dashboard
      </Link>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('bank')}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            activeTab === 'bank'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 hover:bg-primary-50'
          }`}
        >
          <Building2 className="w-4 h-4 inline-block mr-2" />
          Bank Transfer
        </button>
        <button
          onClick={() => setActiveTab('ewallet')}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            activeTab === 'ewallet'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 hover:bg-primary-50'
          }`}
        >
          <Smartphone className="w-4 h-4 inline-block mr-2" />
          E-Wallet
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            activeTab === 'whatsapp'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 hover:bg-primary-50'
          }`}
        >
          <MessageCircle className="w-4 h-4 inline-block mr-2" />
          WhatsApp Admin
        </button>
      </div>

      {/* Bank Transfer Tab */}
      {activeTab === 'bank' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Rekening Bank</h2>
          
          <div className="space-y-4">
            {settings.bank.map(bank => (
              <div key={bank.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-gray-600" />
                  <span className="font-semibold text-gray-800">{bank.name}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Rekening
                    </label>
                    <input
                      type="text"
                      value={bank.accountNumber}
                      onChange={(e) => updateBank(bank.id, 'accountNumber', e.target.value)}
                      className="input-field"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Pemilik Rekening
                    </label>
                    <input
                      type="text"
                      value={bank.accountName}
                      onChange={(e) => updateBank(bank.id, 'accountName', e.target.value)}
                      className="input-field"
                      placeholder="your.i scent Official"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* E-Wallet Tab */}
      {activeTab === 'ewallet' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">E-Wallet</h2>
          
          <div className="space-y-4">
            {settings.ewallet.map(ew => (
              <div key={ew.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <span className="font-semibold text-gray-800">{ew.name}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor {ew.name}
                  </label>
                  <input
                    type="text"
                    value={ew.number}
                    onChange={(e) => updateEwallet(ew.id, 'number', e.target.value)}
                    className="input-field"
                    placeholder="081234567890"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Admin Tab */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">WhatsApp Admin</h2>
          <p className="text-gray-500 mb-6">Nomor WhatsApp yang akan menerima notifikasi pesanan</p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Pastikan nomor menggunakan format internasional (contoh: 6281234567890)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor WhatsApp Admin
            </label>
            <input
              type="text"
              value={settings.whatsappAdmin}
              onChange={(e) => updateWhatsApp(e.target.value)}
              className="input-field max-w-md"
              placeholder="6281349675235"
            />
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-4">Preview Pesan WhatsApp</h3>
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 font-mono">
              <p>Halo Admin your.i scent,</p>
              <p>Saya sudah melakukan pemesanan.</p>
              <br />
              <p>ID Pesanan: ORD-XXXXX</p>
              <p>Nama: John Doe</p>
              <p>No HP: 081234567890</p>
              <p>Alamat: Jl. Sudirman No. 123</p>
              <p>Metode Pembayaran: Transfer Bank</p>
              <p>Total: Rp 500.000</p>
              <br />
              <p>Saya akan kirim bukti transfer. Terima kasih</p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button (Bottom) */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
