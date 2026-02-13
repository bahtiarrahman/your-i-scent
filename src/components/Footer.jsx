import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Mail, Clock } from 'lucide-react';
import { getPaymentSettings } from '../utils/storage';

const STORE_INSTAGRAM = 'https://instagram.com/your.i_scent';
const STORE_EMAIL = 'youriscent@gmail.com';
const STORE_LOCATION = 'Tambak Boyo, Sleman, DIY';
const STORE_ADDRESS_PICKUP = '6CW6+783, Gg. Parikesit, Dero, Condongcatur, Kec. Depok, Kabupaten Sleman, DI Yogyakarta 55281';

export default function Footer() {
  const [whatsappAdmin, setWhatsappAdmin] = useState('6281349675235');
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Brand Section */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-xl font-bold mb-3">
            your.i <span className="text-yellow-400">scent</span>
          </Link>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Toko parfum decant dan parfum original terpercaya
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 text-yellow-400">
              Kontak
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{STORE_LOCATION}</p>
              <p>
                <a href={`mailto:${STORE_EMAIL}`} className="hover:text-yellow-400 transition-colors">
                  {STORE_EMAIL}
                </a>
              </p>
              <p>+{whatsappAdmin}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <h3 className="font-semibold mb-4 text-yellow-400">
              Jam Operasional
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Senin - Jumat: 16.30 - 18.00</p>
              <p>Sabtu - Minggu: 06.30 - 09.00 & 16.30 - 18.00</p>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-4 text-yellow-400">Tautan Cepat</h3>
            <div className="space-y-2 text-sm mb-4">
              <Link to="/catalog" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                Katalog Parfum
              </Link>
              <Link to="/cart" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                Keranjang
              </Link>
            </div>
            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-end gap-3">
              <a
                href={`https://wa.me/${whatsappAdmin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={STORE_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${STORE_EMAIL}`}
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {currentYear} your.i scent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
