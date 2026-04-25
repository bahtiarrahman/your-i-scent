import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  isAdmin as checkIsAdmin
} from '../utils/storage';

import {
  confirmAction,
  showSuccess,
  showError,
  showWarning
} from '../utils/alerts';

export default function Brands() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [newBrandName, setNewBrandName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ================= LOAD =================
  useEffect(() => {
    const adminData = checkIsAdmin();

    if (!adminData) {
      showError('Silakan login sebagai Admin terlebih dahulu.');
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);
    loadBrands();
  }, [navigate]);

  const loadBrands = () => {
    try {
      const data = getBrands() || [];
      setBrands(data);
    } catch (err) {
      console.error(err);
      setBrands([]);
    }
  };

  // ================= PAGINATION =================
  const totalPages = Math.ceil((brands?.length || 0) / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentBrands = (brands || []).slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoggedIn) return null;

  // ================= MODAL =================
  const openAddModal = () => {
    setNewBrandName('');
    setEditingBrand(null);
    setShowModal(true);
  };

  const openEditModal = (brand) => {
    if (!brand) return;
    setNewBrandName(brand.name || '');
    setEditingBrand(brand);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewBrandName('');
    setEditingBrand(null);
  };

  // ================= SAVE =================
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const name = newBrandName.trim();

      if (!name) {
        showWarning('Nama brand tidak boleh kosong.');
        return;
      }

      const isDuplicate = (brands || []).some(
        (b) =>
          b.name?.toLowerCase() === name.toLowerCase() &&
          (!editingBrand || b.id !== editingBrand.id)
      );

      if (isDuplicate) {
        showWarning('Brand sudah ada.');
        return;
      }

      if (editingBrand) {
        updateBrand(editingBrand.id, { name: name });
        await showSuccess('Brand berhasil diperbarui!');
      } else {
        addBrand({ name: name });
        await showSuccess('Brand berhasil ditambahkan!');
      }

      loadBrands();
      closeModal();
    } catch (err) {
      console.error(err);
      showError('Terjadi kesalahan!');
    }
  };

  // ================= DELETE =================
  const handleDelete = async (brand) => {
    if (!brand) return;

    const confirmed = await confirmAction({
      title: 'Hapus Brand?',
      text: `"${brand.name}" akan dihapus`
    });

    if (confirmed) {
      try {
        deleteBrand(brand.id);
        await showSuccess('Berhasil dihapus');
        loadBrands();
      } catch (err) {
        console.error(err);
        showError('Gagal menghapus');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kelola Brand</h1>
        <button onClick={openAddModal} className="btn-primary">
          + Tambah Brand
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="grid grid-cols-[60px_1fr_150px] bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
          <div>No</div>
          <div>Nama Brand</div>
          <div>Aksi</div>
        </div>

        <div className="divide-y">
          {currentBrands.length > 0 ? (
            currentBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="grid grid-cols-[60px_1fr_150px] items-center px-4 py-3 hover:bg-gray-50"
              >
                <div>{index + 1}</div>

                <div className="font-medium text-gray-800">
                  {brand.name || '-'}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(brand)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(brand)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">
              Belum ada brand
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages >= 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
            }`}
          >
            ← Sebelumnya
          </button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);
              
              if (!showPage && page === currentPage - 2) {
                return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
              }
              if (!showPage && page === currentPage + 2) {
                return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
              }
              if (!showPage) return null;
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
            }`}
          >
            Berikutnya →
          </button>
        </div>
      )}

      {/* MODAL PREMIUM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              {editingBrand ? 'Edit Brand' : 'Tambah Brand'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">

              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  Nama Brand
                </label>

                <input
                  type="text"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="Contoh: Dior, Chanel..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                />
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                >
                  Simpan
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}