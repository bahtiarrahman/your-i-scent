import { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Clock, Home, Store, Map } from 'lucide-react';
import { getPaymentSettings } from '../utils/storage';
import { showSuccess } from '../utils/alerts';

// Store constants
const STORE_NAME = 'your.i scent';
const STORE_LOCATION = 'Tambak Boyo, Sleman, DIY';
const STORE_EMAIL = 'youriscent@gmail.com';
const STORE_INSTAGRAM = 'https://instagram.com/your.i_scent';
const TAMBAK_BOYO_MAPS = 'https://www.google.com/maps/search/?api=1&query=Tambak+Boyo+Yogyakarta';
const PICKUP_MAPS = 'https://www.google.com/maps/place/Kontrakan+KTT+NIH+BOS/@-7.7543298,110.4005404,15z/data=!3m1!4b1!4m6!3m5!1s0x2e7a590009090a73:0x3f2cf440aed2c6a9!8m2!3d-7.7543512!4d110.4108401!16s%2Fg%2F11wx0p25nr?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D';

const PICKUP_ADDRESS = '6CW6+783, Gg. Parikesit, Dero, Condongcatur, Kec. Depok, Kabupaten Sleman, DI Yogyakarta 55281';

const OPERATING_HOURS = {
  weekdays: 'Senin - Jumat: 16.30 - 18.00',
  weekend: 'Sabtu - Minggu: 06.30 - 09.00 & 16.30 - 18.00'
};

export default function Contact() {
  const [whatsappAdmin, setWhatsappAdmin] = useState('6281349675235');
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    try {
      const settings = getPaymentSettings();
      if (settings.whatsappAdmin) {
        setWhatsappAdmin(settings.whatsappAdmin);
      }
    } catch (e) {
      console.log('Using default WhatsApp number');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await showSuccess('Pesan berhasil dikirim! Admin akan membalas lewat WhatsApp.');
    setForm({ name: '', email: '', message: '' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Halo your.i scent, saya ingin bertanya tentang parfum decant.');
    const waUrl = `https://wa.me/${whatsappAdmin}?text=${message}`;
    window.open(waUrl, '_blank');
  };

  const openInstagram = () => {
    window.open(STORE_INSTAGRAM, '_blank');
  };

  const openEmail = () => {
    const subject = encodeURIComponent('Tanya Produk Parfum');
    window.location.href = `mailto:${STORE_EMAIL}?subject=${subject}`;
  };

  const openMapsTambakBoyo = () => {
    window.open(TAMBAK_BOYO_MAPS, '_blank');
  };

  const openMapsPickup = () => {
    window.open(PICKUP_MAPS, '_blank');
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header Section */}
      <section className="bg-white py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Hubungi Kami
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan tentang parfum? Kami siap membantu Anda
          </p>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Store className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Lokasi Jualan</h3>
                  <p className="text-gray-600 text-sm mb-3">{STORE_LOCATION}</p>
                  <button
                    onClick={openMapsTambakBoyo}
                    className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium hover:text-primary-700"
                  >
                    <Map className="w-4 h-4" />
                    Buka Lokasi
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Jam Operasional</h3>
                  <p className="text-gray-600 text-sm mb-1">{OPERATING_HOURS.weekdays}</p>
                  <p className="text-gray-600 text-sm">{OPERATING_HOURS.weekend}</p>
                </div>
              </div>
            </div>

            {/* Pickup Address Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Alamat Pickup</h3>
                  <p className="text-gray-600 text-sm mb-3">{PICKUP_ADDRESS}</p>
                  <button
                    onClick={openMapsPickup}
                    className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium hover:text-primary-700"
                  >
                    <Map className="w-4 h-4" />
                    Buka Lokasi
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Social Media</h3>
                  <p className="text-gray-600 text-sm mb-3">@your.i_scent</p>
                  <button
                    onClick={openInstagram}
                    className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium hover:text-primary-700"
                  >
                    <Instagram className="w-4 h-4" />
                    Buka Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={openWhatsApp}
              className="flex flex-col items-center gap-2 p-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">WhatsApp</span>
            </button>

            <button
              onClick={openInstagram}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
              <span className="text-sm">Instagram</span>
            </button>

            <button
              onClick={openMapsTambakBoyo}
              className="flex flex-col items-center gap-2 p-4 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
            >
              <Map className="w-6 h-6" />
              <span className="text-sm text-center">Tambak Boyo</span>
            </button>

            <button
              onClick={openMapsPickup}
              className="flex flex-col items-center gap-2 p-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              <Home className="w-6 h-6" />
              <span className="text-sm text-center">Pickup Rumah</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Kirim Pesan
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Tuliskan pertanyaan atau pesan Anda di bawah ini
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nama Anda"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="email@anda.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-gray-50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-yellow-400 text-gray-800 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
