import { useState } from 'react';
import { Link } from 'react-router-dom';

// Admin WhatsApp number
const ADMIN_WHATSAPP = '6281349675235';

const faqData = [
  {
    question: 'Apa itu parfum decant?',
    answer: 'Parfum decant adalah parfum asli yang ditransfer ke ukuran lebih kecil (misal 2ml, 5ml, 10ml) agar pelanggan bisa mencoba sebelum membeli full bottle.'
  },
  {
    question: 'Apakah parfumnya original?',
    answer: 'Ya, kami menjamin 100% produk original. Kami hanya membeli dari distributor terpercaya.'
  },
  {
    question: 'Ukuran decant tersedia apa saja?',
    answer: 'Kami menyediakan ukuran 2ml, 5ml, 10ml, dan 30ml. Anda bisa pilih sesuai kebutuhan.'
  },
  {
    question: 'Berapa lama proses pengiriman?',
    answer: 'Pengiriman memakan waktu 1-5 hari kerja tergantung lokasi. Kami akan kirim resi setelah pesanan dikonfirmasi.'
  },
  {
    question: 'Apakah bisa COD?',
    answer: 'Ya, kami menyediakan opsi Cash on Delivery untuk area tertentu. Konfirmasi ketersediaan COD saat chat WhatsApp.'
  },
  {
    question: 'Bagaimana cara menyimpan parfum agar awet?',
    answer: 'Simpan di tempat sejuk dan kering, hindari sinar matahari langsung, dan tutup botol dengan rapat setelah digunakan.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openWhatsApp = () => {
    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header Section */}
      <section className="bg-white py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            FAQ
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Pertanyaan yang sering diajukan tentang layanan kami
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-3">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 pr-4">
                    {item.question}
                  </span>
                  <span className={`text-xl text-primary-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>

                {/* Answer Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Masih bingung? Chat admin via WhatsApp
          </p>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
          >
            <span>💬</span>
            Chat WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
