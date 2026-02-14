import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/storage';
import { showSuccess, showError, showWarning } from '../utils/alerts';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      await showWarning('Semua field wajib diisi!');
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      await showWarning('Password minimal 6 karakter!');
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      await showWarning('Konfirmasi password tidak cocok!');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = registerUser({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password
    });

    if (result.success) {
      await showSuccess('Akun berhasil dibuat! Silakan login.');
      navigate('/login');
    } else {
      await showError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-yellow-400 px-4 py-8">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full hidden sm:block"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full hidden sm:block"></div>

      <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-2">
            <span>
              your.i <span className="text-primary-600">scent</span>
            </span>
          </Link>
          <p className="text-gray-500">Buat akun baru</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Nama Anda"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="email@anda.com"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Minimal 6 karakter"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Ulangi password"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Memuat...
              </>
            ) : (
              <>
                Daftar
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Login di sini
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
