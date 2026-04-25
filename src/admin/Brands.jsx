import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBrands, addBrand, updateBrand, deleteBrand, isAdmin as checkIsAdmin } from '../utils/storage';
import { confirmAction, showSuccess, showError, showWarning } from '../utils/alerts';

export default function Brands() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [newBrandName, setNewBrandName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    setBrands(getBrands());
  };

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBrands = brands.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoggedIn) return null;

  const openAddModal = () => {
    setNewBrandName('');
    setEditingBrand(null);
    setShowModal(true);
  };

  const openEditModal = (brand) => {
    setNewBrandName(brand.name);
    setEditingBrand(brand);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewBrandName('');
    setEditingBrand(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const name = newBrandName.trim();
    if (!name) {
      showWarning('Nama brand tidak boleh kosong.');
      return;
    }

    const isDuplicate = brands.some(
      b => b.name.toLowerCase() === name.toLowerCase() &&
           (!editingBrand || b.id !== editingBrand.id)
    );

    if (isDuplicate) {
      showWarning('Brand sudah ada.');
      return;
    }

    if (editingBrand) {
      updateBrand(editingBrand.id, name);
      await showSuccess('Brand berhasil diperbarui!');
    } else {
      addBrand(name);
      await showSuccess('Brand berhasil ditambahkan!');
    }

    loadBrands();
    closeModal();
  };

  const handleDelete = async (brand) => {
    const confirmed = await confirmAction({
      title: 'Hapus Brand?',
      text: `"${brand.name}" akan dihapus`,
      confirmText: 'Hapus'
    });

    if (confirmed) {
      deleteBrand(brand.id);
      await showSuccess('Berhasil dihapus');
      loadBrands();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Brand</h1>
        <button onClick={openAddModal} className="btn-primary">
          + Tambah Brand
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-[60px_1fr_150px] bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
          <div>No</div>
          <div>Nama Brand</div>
          <div>Aksi</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {currentBrands.length > 0 ? (
            currentBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="grid grid-cols-[60px_1fr_150px] items-center px-4 py-3 hover:bg-gray-50"
              >

                {/* No */}
                <div>{index + 1}</div>

                {/* Nama */}
                <div className="font-medium text-gray-800">
                  {brand.name}
                </div>

                {/* Aksi (SAMA KAYAK PRODUCT) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(brand)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => handlePageChange(currentPage - 1)}>
            ←
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)}>
            →
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingBrand ? 'Edit Brand' : 'Tambah Brand'}
            </h2>

            <form onSubmit={handleSave}>
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                className="input-field w-full mb-4"
                placeholder="Nama brand..."
              />

              <div className="flex gap-2">
                <button type="button" onClick={closeModal} className="btn-secondary w-full">
                  Batal
                </button>
                <button type="submit" className="btn-primary w-full">
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