import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts, saveProducts, getCategories, getBrands, isAdmin } from "../utils/storage";
import { formatRupiah } from "../components/ProductCard";
import { showSuccess, showError, showWarning, confirmAction } from "../utils/alerts";

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function ProductForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state?.product;

  const [isEdit, setIsEdit] = useState(!!editProduct);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(editProduct?.image || "");

  const [form, setForm] = useState({
    id: editProduct?.id || Date.now(),
    name: editProduct?.name || "",
    brand: editProduct?.brand || "",
    categoryId: editProduct?.categoryId || 1,
    description: editProduct?.description || "",
    image: editProduct?.image || "",
    type: editProduct?.type || "decant",
    price: editProduct?.price || 0,
    prices: editProduct?.prices || { "2": 35000, "5": 75000, "10": 140000 },
    quantity: editProduct?.quantity || 1,
    stock: editProduct?.stock || { "2": 1, "5": 1, "10": 1 },
    notes: editProduct?.notes || { top: "", middle: "", base: "" },
    sizes: editProduct?.sizes || []
  });

  const categories = getCategories();
  const brands = getBrands();

  useEffect(() => {
    if (!isEdit && form.type === "decant") {
      setForm({ ...form, stock: { "2": 1, "5": 1, "10": 1 }, prices: { "2": 35000, "5": 75000, "10": 140000 }, price: 0 });
    } else if (!isEdit) {
      setForm({ ...form, quantity: 1, stock: {}, price: 0, prices: {}, notes: { top: "", middle: "", base: "" } });
    }
  }, [product]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      await showError("Ukuran gambar terlalu besar! Maksimal 2MB.");
      return;
    }

    setIsUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setForm({ ...form, image: base64 });
      setImagePreview(base64);
    } catch (error) {
      await showError("Gagal mengupload gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    if (value && !value.startsWith("http") && !value.startsWith("data:")) {
      setForm({ ...form, image: `/images/${value}` });
      setImagePreview(`/images/${value}`);
    } else {
      setForm({ ...form, image: value });
      setImagePreview(value);
    }
  };

  const handleTypeChange = (type) => {
    if (type === "decant") {
      setForm({ ...form, type, stock: { "2": 1, "5": 1, "10": 1 }, prices: { "2": 35000, "5": 75000, "10": 140000 }, price: 0 });
    } else {
      setForm({ ...form, type, quantity: 1, stock: {}, price: 0, prices: {}, notes: { top: "", middle: "", base: "" } });
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

    if (!form.name.trim() || !form.brand.trim() || !form.description.trim()) {
      await showWarning("Semua field wajib diisi!");
      return;
    }

    const allProducts = getProducts();
    const duplicate = allProducts.find(p => 
      p.name.toLowerCase().trim() === form.name.toLowerCase().trim() &&
      p.brand.toLowerCase().trim() === form.brand.toLowerCase().trim() &&
      p.type === form.type &&
      (!isEdit || p.id !== editProduct.id)
    );

    if (duplicate) {
      await showWarning("Produk ini sudah ada!");
      return;
    }

    let products;
    if (isEdit) {
      products = allProducts.map(p => p.id === editProduct.id ? form : p);
    } else {
      products = [...allProducts, form];
    }

    saveProducts(products);
    await showSuccess(isEdit ? "Produk updated!" : "Produk ditambahkan!");
    navigate("/admin/produk");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Produk" : "Tambah Produk"}
        </h1>
        <button onClick={() => navigate("/admin/produk")} className="text-gray-500 hover:text-gray-700">
          ← Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                placeholder="Atau masukkan URL / nama file (cth: Sauvage.jpg)"
                value={form.image.startsWith("/images/") ? form.image.replace("/images/", "") : form.image}
                onChange={handleImageUrlChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="cth: Dior Sauvage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <input
              type="text"
              list="brands"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="input-field"
              placeholder="cth: Dior"
            />
            <datalist id="brands">
              {brands.map(b => <option key={b.id} value={b.name} />)}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis</label>
            <select
              value={form.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="input-field"
            >
              <option value="decant">Decant</option>
              <option value="preloved">Preloved</option>
              <option value="bnib">BNIB (Brand New In Box)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: parseInt(e.target.value) })}
              className="input-field"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input-field h-24"
            placeholder="Deskripsi produk..."
          />
        </div>

        {form.type === "decant" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Harga & Stok per Size</h3>
            {["2", "5", "10"].map(size => (
              <div key={size} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Size {size}ml</label>
                  <input
                    type="number"
                    value={form.stock[size]}
                    onChange={(e) => handleStockChange(size, e.target.value)}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Harga</label>
                  <input
                    type="number"
                    value={form.prices[size]}
                    onChange={(e) => handlePriceChange(size, e.target.value)}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {(form.type === "preloved" || form.type === "bnib") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stok</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
          </div>
        )}

        {form.type === "preloved" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catatan Notes</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                value={form.notes?.top || ""}
                onChange={(e) => setForm({ ...form, notes: { ...form.notes, top: e.target.value } })}
                className="input-field"
                placeholder="Top notes..."
              />
              <input
                type="text"
                value={form.notes?.middle || ""}
                onChange={(e) => setForm({ ...form, notes: { ...form.notes, middle: e.target.value } })}
                className="input-field"
                placeholder="Middle notes..."
              />
              <input
                type="text"
                value={form.notes?.base || ""}
                onChange={(e) => setForm({ ...form, notes: { ...form.notes, base: e.target.value } })}
                className="input-field"
                placeholder="Base notes..."
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={isUploading}>
          {isUploading ? "Mengupload..." : isEdit ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>
    </div>
  );
}