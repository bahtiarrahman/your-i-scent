import Swal from 'sweetalert2';

// Base SweetAlert2 configuration with soft yellow theme
const swalConfig = {
  background: '#fffef8',
  confirmButtonColor: '#facc15',
  cancelButtonColor: '#e5e7eb',
  showClass: {
    popup: 'swal2-show',
    backdrop: 'swal2-backdrop-show',
    icon: 'swal2-icon-show'
  },
  hideClass: {
    popup: 'swal2-hide',
    backdrop: 'swal2-backdrop-hide',
    icon: 'swal2-icon-hide'
  },
  customClass: {
    popup: 'rounded-xl shadow-lg',
    confirmButton: 'rounded-lg px-4 py-2 font-semibold text-gray-800 hover:bg-yellow-500 transition-colors',
    cancelButton: 'rounded-lg px-4 py-2 font-semibold text-gray-600 hover:bg-gray-200 transition-colors',
    title: 'text-gray-800',
    htmlContainer: 'text-gray-600',
    closeButton: 'text-gray-400 hover:text-gray-600'
  },
  buttonsStyling: true,
  reverseButtons: true
};

// Confirmation dialog - returns true/false
export const confirmAction = async ({ title, text, confirmText = 'Ya', cancelText = 'Batal' }) => {
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...swalConfig
  });

  return result.isConfirmed;
};

// Success notification
export const showSuccess = async (message, title = 'Berhasil!') => {
  await Swal.fire({
    icon: 'success',
    title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    ...swalConfig
  });
};

// Success with HTML content
export const showSuccessHtml = async (title, html, confirmText = 'Oke') => {
  await Swal.fire({
    icon: 'success',
    title,
    html,
    confirmButtonText: confirmText,
    ...swalConfig
  });
};

// Error notification
export const showError = async (message, title = 'Gagal!') => {
  await Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#ef4444',
    ...swalConfig
  });
};

// Warning notification
export const showWarning = async (message, title = 'Peringatan!') => {
  await Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonColor: '#f59e0b',
    ...swalConfig
  });
};

// Info notification (for cancel feedback)
export const showInfo = async (message, title = 'Info') => {
  await Swal.fire({
    icon: 'info',
    title,
    text: message,
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    ...swalConfig
  });
};

// Loading overlay
export const showLoading = async (message = 'Memproses...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
    ...swalConfig
  });
};

// Close all alerts
export const closeAlert = () => {
  Swal.close();
};

export default {
  confirmAction,
  showSuccess,
  showSuccessHtml,
  showError,
  showWarning,
  showInfo,
  showLoading,
  closeAlert
};
