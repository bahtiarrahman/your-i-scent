import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts, getCategories, saveProducts, isAdmin as checkIsAdmin } from '../utils/storage';
import { formatRupiah } from '../components/ProductCard';
import { confirmAction, showSuccess, showInfo, showError, showWarning } from '../utils/alerts';

const PRODUCT_TYPES = [
  { value: 'decant', label: 'Decant' },
  { value: 'preloved', label: 'Preloved' },
  { value: 'bnib', label: 'BNIB' }
];

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    categoryId: 1,
    description: '',
    image: '',
    type: 'decant',
    price: 0,
    prices: {
      "2": 35000,
      "5": 75000,
      "10": 140000
    },
    notes: {
      top: '',
      middle: '',
      base: ''
    }
  });

  useEffect(() => {
    const adminData = checkIsAdmin();

    if (!adminData) {
      showError('Silakan login sebagai Admin terlebih dahulu.');
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);
    loadData();
  }, [navigate]);

  const loadData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      await showError('Ukuran gambar terlalu besar! Maksimal 2MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      await showError('File harus berupa gambar (JPG, PNG, dll).');
      return;
    }

    setIsUploading(true);

    try {
      const base64 = await fileToBase64(file);
      setForm({ ...form, image: base64 });
      setImagePreview(base64);
    } catch (error) {
      await showError('Gagal mengupload gambar. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUrlChange = (e) => {
    setForm({ ...form, image: e.target.value });
    setImagePreview(e.target.value);
  };

  const handleTypeChange = (type) => {
    if (type === 'decant') {
      setForm({ 
        ...form, 
        type,
        prices: {
          "2": 35000,
          "5": 75000,
          "10": 140000
        },
        price: 0
      });
    } else {
      setForm({ 
        ...form, 
        type,
        price: 0,
        prices: {}
      });
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      brand: '',
      categoryId: 1,
      description: '',
      image: '',
      type: 'decant',
      price: 0,
      prices: {
        "2": 35000,
        "5": 75000,
        "10": 140000
      }
    });
    setImagePreview('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    const productNotes = product.notes || { top: '', middle: '', base: '' };
    setForm({
      name: product.name,
      brand: product.brand,
      categoryId: product.categoryId,
      description: product.description,
      image: product.image,
      type: product.type || 'decant',
      price: product.price || 0,
      prices: product.prices || {
        "2": product.sizes?.find(s => s.size === 2)?.price || 35000,
        "5": product.sizes?.find(s => s.size === 5)?.price || 75000,
        "10": product.sizes?.find(s => s.size === 10)?.price || 140000
      },
      notes: productNotes
    });
    setImagePreview(product.image);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.brand.trim() || !form.description.trim()) {
      await showWarning('Lengkapi semua data produk dulu ya!');
      return;
    }

    if (!form.image) {
      await showWarning('Gambar produk wajib diisi!');
      return;
    }

    if (form.type === 'decant') {
      const hasValidPrices = form.prices["2"] > 0 || form.prices["5"] > 0 || form.prices["10"] > 0;
      if (!hasValidPrices) {
        await showWarning('Harga produk harus diisi dengan benar!');
        return;
      }
    } else {
      if (!form.price || form.price <= 0) {
        await showWarning('Harga produk wajib diisi!');
        return;
      }
    }

    let newProducts = [...products];

    const productData = {
      ...form,
      ...(form.type === 'decant' ? { price: 0 } : { prices: {} })
    };

    if (editingProduct) {
      newProducts = newProducts.map(p =>
        p.id === editingProduct.id ? { ...productData, id: p.id } : p
      );
    } else {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      newProducts.push({ ...productData, id: newId });
    }

    saveProducts(newProducts);
    setProducts(newProducts);
    setShowModal(false);
    setImagePreview('');

    await showSuccess('Produk berhasil disimpan!');
  };

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id);
    const confirmed = await confirmAction({
      title: 'Hapus Produk?',
      text: product?.name ? `${product.name} akan dihapus.` : 'Produk yang dihapus tidak bisa dikembalikan.',
      confirmText: 'Ya, Hapus'
    });

    if (confirmed) {
      const newProducts = products.filter(p => p.id !== id);
      saveProducts(newProducts);
      setProducts(newProducts);
      await showSuccess('Produk berhasil dihapus!');
    }
  };

  const updateSizePrice = (size, price) => {
    setForm({ 
      ...form, 
      prices: { 
        ...form.prices, 
        [size]: parseInt(price) || 0 
      } 
    });
  };

  const getDisplayPrice = (product) => {
    if (product.type === 'decant') {
      const prices = product.prices || {};
      const priceValues = Object.values(prices).filter(p => p > 0);
      if (priceValues.length > 0) {
        return formatRupiah(Math.min(...priceValues));
      }
      // Fallback to old format
      const prices2 = product.sizes?.find(s => s.size === 2)?.price || 0;
      return formatRupiah(prices2);
    }
    return formatRupiah(product.price || 0);
  };

  const getTypeBadge = (type) => {
    const badges = {
      decant: { label: 'DECANT', class: 'bg-yellow-100 text-yellow-700' },
      preloved: { label: 'PRELOVED', class: 'bg-blue-100 text-blue-700' },
      bnib: { label: 'BNIB', class: 'bg-purple-100 text-purple-700' }
    };
    const badge = badges[type] || badges.decant;
    return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${badge.class}`}>{badge.label}</span>;
  };

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Produk</h1>
          <Link to="/admin" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Kembali ke Dashboard
          </Link>
        </div>
        <button onClick={openAddModal} className="btn-primary">
          + Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Gambar</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Nama Produk</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Jenis</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Brand</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Harga</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-xl" />
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-800">{product.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    {getTypeBadge(product.type)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                      {product.brand}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-primary-600">
                      {getDisplayPrice(product)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">Belum ada produk</p>
            <button onClick={openAddModal} className="btn-primary inline-block">
              Tambah Produk Pertama
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <button
                onClick={() => { setShowModal(false); setImagePreview(''); }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-3">Foto Produk</label>
                {imagePreview && (
                  <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto" />
                  </div>
                )}
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 font-medium">
                      {isUploading ? 'Mengupload...' : 'Upload Foto'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">atau</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <input
                    type="url"
                    value={form.image.startsWith('data:') ? '' : form.image}
                    onChange={handleImageUrlChange}
                    placeholder="Atau masukkan URL gambar..."
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Contoh: Dior Sauvage"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    required
                    placeholder="Contoh: Dior"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Produk</label>
                <select
                  value={form.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="input-field"
                >
                  {PRODUCT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: parseInt(e.target.value) })}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows="3"
                  placeholder="Deskripsi produk..."
                  className="input-field resize-none"
                />
              </div>

              {/* Fragrance Notes */}
              <div className="p-4 bg-yellow-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-3">Fragrance Notes</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Top Notes</label>
                    <input
                      type="text"
                      value={form.notes.top || ''}
                      onChange={(e) => setForm({ ...form, notes: { ...form.notes, top: e.target.value } })}
                      placeholder="Contoh: Bergamot, Lemon"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Middle Notes</label>
                    <input
                      type="text"
                      value={form.notes.middle || ''}
                      onChange={(e) => setForm({ ...form, notes: { ...form.notes, middle: e.target.value } })}
                      placeholder="Contoh: Lavender, Pepper"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Base Notes</label>
                    <input
                      type="text"
                      value={form.notes.base || ''}
                      onChange={(e) => setForm({ ...form, notes: { ...form.notes, base: e.target.value } })}
                      placeholder="Contoh: Ambroxan, Cedarwood"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {form.type === 'decant' && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Harga per Ukuran</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">2ml</label>
                      <input
                        type="number"
                        value={form.prices["2"] || 0}
                        onChange={(e) => updateSizePrice("2", e.target.value)}
                        required
                        min="0"
                        className="input-field text-center"
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">5ml</label>
                      <input
                        type="number"
                        value={form.prices["5"] || 0}
                        onChange={(e) => updateSizePrice("5", e.target.value)}
                        required
                        min="0"
                        className="input-field text-center"
                      />
                    </div>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-600 mb-2">10ml</label>
                      <input
                        type="number"
                        value={form.prices["10"] || 0}
                        onChange={(e) => updateSizePrice("10", e.target.value)}
                        required
                        min="0"
                        className="input-field text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {form.type !== 'decant' && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                    required
                    min="0"
                    placeholder="Masukkan harga produk..."
                    className="input-field"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setImagePreview(''); }}
                  className="flex-1 py-3.5 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button type="submit" className="flex-1 py-3.5 btn-primary">
                  {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
