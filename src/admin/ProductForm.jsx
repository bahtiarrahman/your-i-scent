import { useState, useEffect } from 'react';
import { getProducts, saveProducts } from '../utils/storage';
import { confirmAction, showSuccess, showWarning, showError } from '../utils/alerts';

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

export default function ProductForm({ product, brands, categories, onClose, onSave }) {
  const isEdit = !!product;
  
  const [form, setForm] = useState({
    name: '',
    brand: '',
    categoryId: 1,
    description: '',
    image: '',
    type: 'decant',
    price: 0,
    quantity: 1,
    stock: { "2": 1, "5": 1, "10": 1 },
    prices: { "2": 35000, "5": 75000, "10": 140000 },
    notes: { top: '', middle: '', base: '' }
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        brand: product.brand,
        categoryId: product.categoryId,
        description: product.description || '',
        image: product.image || '',
        type: product.type,
        price: product.price || 0,
        quantity: product.quantity || 1,
        stock: product.stock || { "2": 1, "5": 1, "10": 1 },
        prices: product.prices || { "2": 35000, "5": 75000, "10": 140000 },
        notes: product.notes || { top: '', middle: '', base: '' }
      });
      setImagePreview(product.image || '');
    }
  }, [product]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      await showError('Ukuran gambar terlalu besar! Maksimal 2MB.');
      return;
    }

    setIsUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setForm({ ...form, image: base64 });
      setImagePreview(base64);
    } catch (error) {
      await showError('Gagal mengupload gambar.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    // If it's a filename (no http), prepend /images/
    if (value && !value.startsWith('http') && !value.startsWith('data:')) {
      setForm({ ...form, image: `/images/${value}` });
      setImagePreview(`/images/${value}`);
    } else {
      setForm({ ...form, image: value });
      setImagePreview(value);
    }
  };
  };

  const handleTypeChange = (type) => {
    if (type === 'decant') {
      setForm({ ...form, type, stock: { "2": 1, "5": 1, "10": 1 }, prices: { "2": 35000, "5": 75000, "10": 140000 }, price: 0 });
    } else {
      setForm({ ...form, type, quantity: 1, stock: {}, price: 0, prices: {}, notes: { top: '', middle: '', base: '' } });
    }
  };

  const handlePriceChange = (size, value) => {
    setForm({
      ...form,
      prices: { ...form.prices, [size]: parseInt(value) || 0 }
    });
  };

  const handleStockChange = (size, value) => {
    setForm({
      ...form,
      stock: { ...form.stock, [size]: parseInt(value) || 0 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!form.name.trim() || !form.brand.trim() || !form.description.trim()) {
      await showWarning('Semua field wajib diisi!');
      return;
    }

    // Validasi produk duplikat
    const allProducts = getProducts();
    const duplicate = allProducts.find(p => 
      p.name.toLowerCase().trim() === form.name.toLowerCase().trim() &&
      p.brand.toLowerCase().trim() === form.brand.toLowerCase().trim() &&
      p.type === form.type &&
      (!isEdit || p.id !== product.id)
    );

    if (duplicate) {
      await showWarning(`Produk ${form.name} (${form.brand}) dengan jenis ${form.type} sudah ada!`);
      return;
    }

    try {
      const products = getProducts();
      
      if (isEdit) {
        // Update produk
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          products[index] = { ...products[index], ...form };
        }
      } else {
        // Tambah produk baru
        const newProduct = { id: Date.now(), ...form };
        products.push(newProduct);
      }

      saveProducts(products);
      await showSuccess(isEdit ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!');
      onSave();
      onClose();
    } catch (error) {
      await showError('Gagal menyimpan produk: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
                <input
                  type="text"
                  placeholder="Atau masukkan URL gambar..."
                  value={form.image}
                  onChange={handleImageUrlChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Nama & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Contoh: Sauvage"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                required
                className="input-field"
              >
                <option value="">Pilih Brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Jenis & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Produk</label>
              <select value={form.type} onChange={(e) => handleTypeChange(e.target.value)} className="input-field">
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
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              placeholder="Deskripsi produk..."
              className="input-field"
            />
          </div>

          {/* Harga - different based on type */}
          {form.type === 'decant' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga per Ukuran (ml)</label>
              <div className="grid grid-cols-3 gap-3">
                {[2, 5, 10].map(size => (
                  <div key={size}>
                    <label className="text-xs text-gray-500">{size}ml</label>
                    <input
                      type="number"
                      value={form.prices[size] || 0}
                      onChange={(e) => handlePriceChange(size, e.target.value)}
                      className="input-field"
                      placeholder="Harga"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                className="input-field"
                placeholder="Harga"
              />
            </div>
          )}

          {/* Stok - different based on type */}
          {form.type === 'decant' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stok per Ukuran (ml)</label>
              <div className="grid grid-cols-3 gap-3">
                {[2, 5, 10].map(size => (
                  <div key={size}>
                    <label className="text-xs text-gray-500">{size}ml</label>
                    <input
                      type="number"
                      value={form.stock[size] || 0}
                      onChange={(e) => handleStockChange(size, e.target.value)}
                      className="input-field"
                      placeholder="Stok"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stok</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
                min="0"
                className="input-field w-32"
              />
            </div>
          )}

          {/* Fragrance Notes (Decant only) */}
          {form.type === 'decant' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fragrance Notes</label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  value={form.notes.top}
                  onChange={(e) => setForm({ ...form, notes: { ...form.notes, top: e.target.value } })}
                  placeholder="Top Notes"
                  className="input-field"
                />
                <input
                  type="text"
                  value={form.notes.middle}
                  onChange={(e) => setForm({ ...form, notes: { ...form.notes, middle: e.target.value } })}
                  placeholder="Middle Notes"
                  className="input-field"
                />
                <input
                  type="text"
                  value={form.notes.base}
                  onChange={(e) => setForm({ ...form, notes: { ...form.notes, base: e.target.value } })}
                  placeholder="Base Notes"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Batal
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}