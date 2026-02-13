import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getPaymentSettings,
  savePaymentSettings,
  isAdmin as checkIsAdmin
} from '../utils/storage';
import Swal from 'sweetalert2';
import { Building2, Wallet, QrCode, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function PaymentSettings() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('bank');
  const [settings, setSettings] = useState({
    bank: [],
    ewallet: [],
    qris: { enabled: true, merchantName: '', image: null },
    whatsappAdmin: ''
  });

  const [bankForm, setBankForm] = useState({ name: '', accountNumber: '', accountName: '' });
  const [editingBankId, setEditingBankId] = useState(null);
  const [ewalletForm, setEwalletForm] = useState({ name: '', number: '' });
  const [editingEwalletId, setEditingEwalletId] = useState(null);
  const [qrisForm, setQrisForm] = useState({ enabled: true, merchantName: '', image: null });
  const [whatsappForm, setWhatsappForm] = useState('');
  const [qrisPreview, setQrisPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const adminData = checkIsAdmin();
    if (!adminData) {
      Swal.fire({
        icon: 'warning',
        title: 'Akses Ditolak',
        text: 'Silakan login sebagai Admin terlebih dahulu.'
      });
      navigate('/login');
      return;
    }
    setIsLoggedIn(true);
    loadSettings();
  }, [navigate]);

  const loadSettings = () => {
    const data = getPaymentSettings();
    setSettings(data);
    setQrisForm({
      enabled: data.qris?.enabled ?? true,
      merchantName: data.qris?.merchantName ?? '',
      image: data.qris?.image ?? null
    });
    setQrisPreview(data.qris?.image ?? '');
    setWhatsappForm(data.whatsappAdmin ?? '');
  };

  const handleAddBank = async () => {
    if (!bankForm.name || !bankForm.accountNumber || !bankForm.accountName) {
      await Swal.fire({
        icon: 'warning',
        title: 'Data Tidak Lengkap',
        text: 'Lengkapi semua data bank!'
      });
      return;
    }
    const newBank = {
      id: `bank_${Date.now()}`,
      name: bankForm.name,
      accountNumber: bankForm.accountNumber,
      accountName: bankForm.accountName
    };
    const data = getPaymentSettings();
    data.bank.push(newBank);
    savePaymentSettings(data);
    setBankForm({ name: '', accountNumber: '', accountName: '' });
    loadSettings();
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Bank berhasil ditambahkan!'
    });
  };

  const handleEditBank = (bank) => {
    setBankForm({ name: bank.name, accountNumber: bank.accountNumber, accountName: bank.accountName });
    setEditingBankId(bank.id);
  };

  const handleUpdateBank = async () => {
    if (!bankForm.name || !bankForm.accountNumber || !bankForm.accountName) {
      await Swal.fire({
        icon: 'warning',
        title: 'Data Tidak Lengkap',
        text: 'Data bank tidak boleh kosong!'
      });
      return;
    }
    const data = getPaymentSettings();
    const index = data.bank.findIndex(b => b.id === editingBankId);
    if (index !== -1) {
      data.bank[index] = { ...data.bank[index], ...bankForm };
      savePaymentSettings(data);
    }
    setBankForm({ name: '', accountNumber: '', accountName: '' });
    setEditingBankId(null);
    loadSettings();
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Bank berhasil diperbarui!'
    });
  };

  const handleDeleteBank = async (id, name) => {
    const result = await Swal.fire({
      title: 'Hapus Bank?',
      text: `${name} akan dihapus dari metode pembayaran.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      const data = getPaymentSettings();
      data.bank = data.bank.filter(b => b.id !== id);
      savePaymentSettings(data);
      loadSettings();
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Bank berhasil dihapus!'
      });
    }
  };

  const handleAddEwallet = async () => {
    if (!ewalletForm.name || !ewalletForm.number) {
      await Swal.fire({
        icon: 'warning',
        title: 'Data Tidak Lengkap',
        text: 'Lengkapi semua data e-wallet!'
      });
      return;
    }
    const newEwallet = {
      id: `ewallet_${Date.now()}`,
      name: ewalletForm.name,
      number: ewalletForm.number
    };
    const data = getPaymentSettings();
    data.ewallet.push(newEwallet);
    savePaymentSettings(data);
    setEwalletForm({ name: '', number: '' });
    loadSettings();
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'E-Wallet berhasil ditambahkan!'
    });
  };

  const handleEditEwallet = (ewallet) => {
    setEwalletForm({ name: ewallet.name, number: ewallet.number });
    setEditingEwalletId(ewallet.id);
  };

  const handleUpdateEwallet = async () => {
    if (!ewalletForm.name || !ewalletForm.number) {
      await Swal.fire({
        icon: 'warning',
        title: 'Data Tidak Lengkap',
        text: 'Data e-wallet tidak boleh kosong!'
      });
      return;
    }
    const data = getPaymentSettings();
    const index = data.ewallet.findIndex(e => e.id === editingEwalletId);
    if (index !== -1) {
      data.ewallet[index] = { ...data.ewallet[index], ...ewalletForm };
      savePaymentSettings(data);
    }
    setEwalletForm({ name: '', number: '' });
    setEditingEwalletId(null);
    loadSettings();
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'E-Wallet berhasil diperbarui!'
    });
  };

  const handleDeleteEwallet = async (id, name) => {
    const result = await Swal.fire({
      title: 'Hapus E-Wallet?',
      text: `${name} akan dihapus dari metode pembayaran.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      const data = getPaymentSettings();
      data.ewallet = data.ewallet.filter(e => e.id !== id);
      savePaymentSettings(data);
      loadSettings();
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'E-Wallet berhasil dihapus!'
      });
    }
  };

  const handleQrisImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Ukuran gambar terlalu besar! Maksimal 2MB.'
      });
      return;
    }
    setIsUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setQrisForm({ ...qrisForm, image: base64 });
      setQrisPreview(base64);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Gagal mengupload gambar.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveQris = async () => {
    const data = getPaymentSettings();
    data.qris = { ...qrisForm };
    savePaymentSettings(data);
    loadSettings();
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Pengaturan QRIS berhasil disimpan!'
    });
  };

  const handleSaveWhatsApp = async () => {
    if (!whatsappForm) {
      await Swal.fire({
        icon: 'warning',
        title: 'Data Tidak Lengkap',
        text: 'Nomor WhatsApp tidak boleh kosong!'
      });
      return;
    }
    const data = getPaymentSettings();
    data.whatsappAdmin = whatsappForm;
    savePaymentSettings(data);
    loadSettings();
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Nomor WhatsApp admin berhasil disimpan!'
    });
  };

  const cancelEdit = () => {
    setBankForm({ name: '', accountNumber: '', accountName: '' });
    setEditingBankId(null);
    setEwalletForm({ name: '', number: '' });
    setEditingEwalletId(null);
  };

  if (!isLoggedIn) return null;

  const tabs = [
    { id: 'bank', label: 'Bank Transfer', icon: Building2 },
    { id: 'ewallet', label: 'E-Wallet', icon: Wallet },
    { id: 'qris', label: 'QRIS & WhatsApp', icon: QrCode }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pengaturan Pembayaran</h1>
          <Link to="/admin" className="text-yellow-600 hover:text-yellow-700 mt-1 inline-block">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-600 hover:bg-yellow-50 border border-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'bank' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Kelola Rekening Bank</h2>
            <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau hapus rekening bank untuk pembayaran</p>
          </div>

          <div className="p-6 bg-yellow-50/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nama Bank"
                value={bankForm.name}
                onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Nomor Rekening"
                value={bankForm.accountNumber}
                onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Nama Pemilik"
                value={bankForm.accountName}
                onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {editingBankId ? (
                <>
                  <button
                    onClick={handleUpdateBank}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddBank}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Bank
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {settings.bank.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada rekening bank ditambahkan</p>
              </div>
            ) : (
              settings.bank.map((bank) => (
                <div key={bank.id} className="p-4 hover:bg-yellow-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{bank.name}</p>
                        <p className="text-gray-500 text-sm">{bank.accountNumber} - {bank.accountName}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditBank(bank)}
                        className="flex items-center gap-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBank(bank.id, bank.name)}
                        className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'ewallet' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Kelola E-Wallet</h2>
            <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau hapus rekening e-wallet untuk pembayaran</p>
          </div>

          <div className="p-6 bg-yellow-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={ewalletForm.name}
                onChange={(e) => setEwalletForm({ ...ewalletForm, name: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all bg-white"
              >
                <option value="">Pilih E-Wallet</option>
                <option value="DANA">DANA</option>
                <option value="OVO">OVO</option>
                <option value="GoPay">GoPay</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="LinkAja">LinkAja</option>
              </select>
              <input
                type="text"
                placeholder="Nomor E-Wallet"
                value={ewalletForm.number}
                onChange={(e) => setEwalletForm({ ...ewalletForm, number: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {editingEwalletId ? (
                <>
                  <button
                    onClick={handleUpdateEwallet}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddEwallet}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Tambah E-Wallet
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {settings.ewallet.length === 0 ? (
              <div className="p-12 text-center">
                <Wallet className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada e-wallet ditambahkan</p>
              </div>
            ) : (
              settings.ewallet.map((ewallet) => (
                <div key={ewallet.id} className="p-4 hover:bg-yellow-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{ewallet.name}</p>
                        <p className="text-gray-500 text-sm">{ewallet.number}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEwallet(ewallet)}
                        className="flex items-center gap-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEwallet(ewallet.id, ewallet.name)}
                        className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'qris' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Nomor WhatsApp Admin</h2>
              <p className="text-gray-500 text-sm mt-1">Nomor WhatsApp untuk menerima notifikasi pesanan</p>
            </div>

            <div className="p-6 bg-yellow-50/50">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="6281349675235"
                  value={whatsappForm}
                  onChange={(e) => setWhatsappForm(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                />
                <button
                  onClick={handleSaveWhatsApp}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Simpan WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">QRIS Payment</h2>
              <p className="text-gray-500 text-sm mt-1">Upload gambar QRIS untuk pembayaran</p>
            </div>

            <div className="p-6 bg-yellow-50/50">
              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-md">
                  <label className="block w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrisImageUpload}
                      className="hidden"
                    />
                    <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Klik untuk upload gambar QRIS</p>
                    <p className="text-gray-400 text-sm mt-1">Format: JPG, PNG (Maksimal 2MB)</p>
                  </label>
                </div>

                {qrisPreview && (
                  <div className="w-full max-w-sm">
                    <p className="text-sm text-gray-600 mb-2 text-center">Preview QRIS:</p>
                    <img
                      src={qrisPreview}
                      alt="QRIS Preview"
                      className="w-full h-auto rounded-xl border border-gray-200"
                    />
                  </div>
                )}

                {qrisForm.image && (
                  <button
                    onClick={handleSaveQris}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Simpan QRIS
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}