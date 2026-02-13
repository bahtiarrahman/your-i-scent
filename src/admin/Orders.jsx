import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getOrders, updateOrderStatus, deleteOrder, isAdmin as checkIsAdmin } from '../utils/storage';
import { formatRupiah } from '../components/ProductCard';
import { confirmAction, showSuccess, showError } from '../utils/alerts';
import Swal from 'sweetalert2';

const STATUS_OPTIONS = [
  { value: 'menunggu', label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'diproses', label: 'Diproses', color: 'bg-blue-100 text-blue-700' },
  { value: 'dikirim', label: 'Dikirim', color: 'bg-purple-100 text-purple-700' },
  { value: 'selesai', label: 'Selesai', color: 'bg-green-100 text-green-700' },
  { value: 'dibatalkan', label: 'Dibatalkan', color: 'bg-red-100 text-red-700' }
];

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    const adminData = checkIsAdmin();

    if (!adminData) {
      showError('Silakan login sebagai Admin terlebih dahulu.');
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);
    loadOrders();
  }, [navigate]);

  const loadOrders = () => {
    const allOrders = getOrders();
    setOrders(allOrders.reverse());
  };

  const getStatusInfo = (status) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentText = (payment) => {
    switch (payment) {
      case 'transfer':
        return 'Transfer Bank';
      case 'cod':
        return 'COD';
      default:
        return payment;
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const confirmed = await confirmAction({
      title: 'Ubah Status Pesanan',
      text: 'Apakah Anda yakin ingin mengubah status pesanan ini?',
      confirmText: 'Ya, Ubah'
    });

    if (confirmed) {
      updateOrderStatus(orderId, newStatus);
      await showSuccess('Status pesanan berhasil diubah!');
      loadOrders();
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Hapus Pesanan?',
      text: 'Pesanan yang dihapus tidak bisa dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      deleteOrder(orderId);
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Pesanan berhasil dihapus!'
      });
      loadOrders();
    }
  };

  const showOrderDetail = (order) => {
    let itemsHtml = '';
    order.items.forEach((item) => {
      itemsHtml += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
          <img src="${item.productImage}" alt="${item.productName}" class="w-12 h-12 object-cover rounded-lg" />
          <div class="flex-1">
            <p class="font-medium text-gray-800">${item.productName}</p>
            <p class="text-sm text-gray-500">${item.size}ml x ${item.quantity}</p>
          </div>
          <span class="font-medium text-gray-700">${formatRupiah(item.price * item.quantity)}</span>
        </div>
      `;
    });

    const statusInfo = getStatusInfo(order.status);

    Swal.fire({
      title: 'Detail Pesanan',
      html: `
        <div class="text-left">
          <div class="bg-primary-50 p-4 rounded-xl mb-4">
            <p class="font-mono text-sm text-primary-700 mb-2">${order.id}</p>
            <p class="text-sm text-gray-600">${formatDate(order.date)}</p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium text-gray-800 mb-2">Data Penerima</h4>
            <p class="text-sm text-gray-600">${order.customer?.name || '-'}</p>
            <p class="text-sm text-gray-600">${order.customer?.phone || '-'}</p>
            <p class="text-sm text-gray-600">${order.customer?.address || '-'}</p>
          </div>
          <h4 class="font-medium text-gray-800 mb-2">Rincian Pesanan</h4>
          ${itemsHtml}
          <div class="border-t border-gray-200 pt-3 mt-3">
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-800">Total Pembayaran</span>
              <span class="text-xl font-bold text-primary-600">${formatRupiah(order.total)}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-600">Metode</span>
              <span class="text-sm font-medium text-gray-700">${getPaymentText(order.payment)}</span>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm text-gray-600">Status</span>
              <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}">
                ${statusInfo.label}
              </span>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#facc15',
      width: '500px'
    });
  };

  const filteredOrders = filter === 'semua' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Pesanan</h1>
          <Link to="/admin" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('semua')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'semua'
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 hover:bg-primary-50'
          }`}
        >
          Semua ({orders.length})
        </button>
        {STATUS_OPTIONS.map(status => (
          <button
            key={status.value}
            onClick={() => setFilter(status.value)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              filter === status.value
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-primary-50'
            }`}
          >
            {status.label} ({orders.filter(o => o.status === status.value).length})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">ID Pesanan</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Pelanggan</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Pembayaran</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Tanggal</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map(order => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm text-gray-800">{order.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800">{order.customer?.name || '-'}</p>
                          <p className="text-sm text-gray-500">{order.customer?.phone || '-'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-800">{formatRupiah(order.total)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">{getPaymentText(order.payment)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 cursor-pointer ${statusInfo.color}`}
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => showOrderDetail(order)}
                            className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 text-sm font-medium"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500">
              {filter === 'semua' ? 'Belum ada pesanan' : `Tidak ada pesanan dengan status "${STATUS_OPTIONS.find(s => s.value === filter)?.label || filter}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
