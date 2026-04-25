import { useState } from 'react';
import { getProducts, saveProducts } from '../utils/storage';
import { formatRupiah } from '../components/ProductCard';
import { confirmAction, showSuccess, showError } from '../utils/alerts';

export default function ProductTable({
  products,
  categories,
  brands,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange
}) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = await confirmAction({
      title: 'Hapus Produk?',
      text: 'Produk ini akan dihapus permanently.',
      confirmText: 'Ya, Hapus',
      confirmColor: '#ef4444'
    });

    if (confirmed) {
      try {
        const allProducts = getProducts();
        const filteredProducts = allProducts.filter(p => p.id !== productId);
        saveProducts(filteredProducts);
        await showSuccess('Produk berhasil dihapus!');
        onDelete();
      } catch (error) {
        showError('Gagal menghapus produk.');
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '-';
  };

  const getPriceDisplay = (product) => {
    if (product.type === 'decant' && product.prices) {
      const minPrice = Math.min(...Object.values(product.prices));
      return `dari ${formatRupiah(minPrice)}`;
    }
    return formatRupiah(product.price || 0);
  };

  const getStockDisplay = (product) => {
    if (product.type === 'decant' && product.stock) {
      return (
        <div className="flex flex-wrap gap-1">
          {Object.entries(product.stock).map(([size, qty]) => (
            <span key={size} className={`px-1.5 py-0.5 rounded text-xs ${
              qty > 5 ? 'bg-green-100 text-green-700' :
              qty > 0 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {size}ml:{qty}
            </span>
          ))}
        </div>
      );
    }
    return (
      <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
        product.quantity > 5 ? 'bg-green-100 text-green-700' :
        product.quantity > 0 ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {product.quantity}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Filter */}
      <div className="p-4 border-b border-gray-100 overflow-x-auto">
        <div className="flex flex-wrap gap-3 items-center min-w-max">
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); onPageChange(1); }}
            className="input-field min-w-[140px] flex-1 sm:flex-none"
          />

          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); onPageChange(1); }}
            className="input-field min-w-[100px]"
          >
            <option value="semua">Semua Jenis</option>
            <option value="decant">Decant</option>
            <option value="preloved">Preloved</option>
            <option value="bnib">BNIB</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="input-field min-w-[110px]"
          >
            <option value="name-asc">Nama A-Z</option>
            <option value="name-desc">Nama Z-A</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Produk</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Brand</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Jenis</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Kategori</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Harga</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Stok</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'}
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                        {product.brand}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        product.type === 'decant' ? 'bg-blue-100 text-blue-700' :
                        product.type === 'preloved' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {product.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{getCategoryName(product.categoryId)}</td>
                    <td className="py-3 px-4 font-medium text-gray-800 text-sm">{getPriceDisplay(product)}</td>
                    <td className="py-3 px-4">{getStockDisplay(product)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-2 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-xs font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    Tidak ada produk ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border border-gray-100 rounded-xl p-3">
                <div className="flex gap-3">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        product.type === 'decant' ? 'bg-blue-100 text-blue-700' :
                        product.type === 'preloved' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {product.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getCategoryName(product.categoryId)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Harga</p>
                    <p className="font-semibold text-gray-800 text-sm">{getPriceDisplay(product)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Stok</p>
                    {getStockDisplay(product)}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Tidak ada produk ditemukan
            </div>
          )}
        </div>

      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="px-4 py-3 border-t border-gray-100 flex justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            ←
          </button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
              
              if (!showPage && page === currentPage - 2) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }
              if (!showPage && page === currentPage + 2) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }
              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}