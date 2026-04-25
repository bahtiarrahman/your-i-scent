import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts, getCategories, getBrands, isAdmin as checkIsAdmin } from '../utils/storage';
import { showError } from '../utils/alerts';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('semua');

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
    setCategories(getCategories() || []);
    setBrands(getBrands() || []);
  };

  if (!isLoggedIn) return null;

  const openAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    loadData();
  };

  // Filter & Search
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'semua' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

      <ProductTable
        products={currentProducts}
        categories={categories}
        brands={brands}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        onEdit={openEditModal}
        onDelete={loadData}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showModal && (
        <ProductForm
          product={editingProduct}
          brands={brands}
          categories={categories}
          onClose={closeModal}
          onSave={loadData}
        />
      )}
    </div>
  );
}