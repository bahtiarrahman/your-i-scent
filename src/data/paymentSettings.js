// Default payment settings
export const defaultPaymentSettings = {
  bank: [
    {
      id: 'bca',
      name: 'BCA',
      accountNumber: '1234567890',
      accountName: 'Your.i Scent Official'
    },
    {
      id: 'mandiri',
      name: 'Mandiri',
      accountNumber: '9876543210',
      accountName: 'Your.i Scent Official'
    }
  ],
  ewallet: [
    { id: 'dana', name: 'DANA', number: '081234567890' },
    { id: 'ovo', name: 'OVO', number: '081234567890' },
    { id: 'gopay', name: 'GoPay', number: '081234567890' }
  ],
  qris: {
    enabled: true,
    merchantName: 'Your.i Scent',
    image: null
  },
  whatsappAdmin: '6281234567890'
};
