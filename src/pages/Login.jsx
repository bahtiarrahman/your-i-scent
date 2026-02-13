import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/storage';
import { showSuccess, showError } from '../utils/alerts';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.identifier.trim() || !form.password) {
      await showError('Email/Password wajib diisi!');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = loginUser(form.identifier.trim(), form.password);

    if (result.success) {
      if (result.role === 'admin') {
        await showSuccess('Login Admin berhasil!');
        navigate('/admin');
      } else {
        await showSuccess(`Login berhasil! Selamat datang, ${result.user.name}`);
        navigate('/');
      }
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
          <p className="text-gray-500">Masuk ke akun Anda</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email / Username
            </label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
              placeholder="Email atau username"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Masukkan password"
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
                Login
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
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
