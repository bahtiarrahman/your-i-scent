# Dokumentasi Fitur Website Parfum Decant

## 1. Login
- **File**: `src/pages/Login.jsx`
- **Deskripsi**: Halaman untuk login pengguna dengan email/password menggunakan Firebase Authentication
- **Dependencies**: Firebase Auth

## 2. Daftar (Register)
- **File**: `src/pages/Register.jsx`
- **Deskripsi**: Halaman registrasi pengguna baru dengan email/password menggunakan Firebase Authentication
- **Dependencies**: Firebase Auth

## 3. Beranda (Home)
- **File**: `src/pages/Home.jsx`
- **Deskripsi**: Halaman utama/home yang menampilkan banner, produk featured, dan informasi toko

## 4. Katalog Produk (Catalog)
- **File**: `src/pages/Catalog.jsx`
- **Deskripsi**: Halaman menampilkan semua produk dengan fitur filter (brand, ukuran, harga)
- **Dependencies**: `src/hooks/useProducts.js`, `src/components/ProductCard.jsx`

## 5. Detail Produk
- **File**: `src/pages/ProductDetail.jsx`
- **Deskripsi**: Halaman detail produk lengkap dengan deskripsi, harga, ukuran, dan tombol tambah ke keranjang

## 6. Transaksi (Cart & Checkout)
- **File**: 
  - `src/pages/Cart.jsx` - Halaman keranjang belanja
  - `src/pages/Checkout.jsx` - Halaman checkout/penayaran
  - `src/context/CartContext.jsx` - State management keranjang (React Context API)
- **Deskripsi**: Mengelola data keranjang, quantity, dan proses checkout

## 7. Informasi Toko (Tentang/About)
- **File**: `src/pages/About.jsx`
- **Deskripsi**: Halaman tentang toko yang menampilkan sejarah, visi, misi, dan informasi umum

## 8. Informasi Toko (Contact)
- **File**: `src/pages/Contact.jsx`
- **Deskripsi**: Halaman kontak dengan form pesan dan informasi kontak toko

## 9. FAQ
- **File**: `src/pages/FAQ.jsx`
- **Deskripsi**: Halaman Frequently Asked Questions untuk pertanyaan umum pelanggan

## 10. Profil Pengguna (Account)
- **File**: `src/pages/Account.jsx`
- **Deskripsi**: Halaman profil pengguna yang menampilkan data user dan riwayat pesanan
- **Dependencies**: Firebase Auth, Firebase Firestore

---

# File Pendukung (Shared Components)

| File | Fungsi |
|------|--------|
| `src/components/Navbar.jsx` | Komponen navigasi utama |
| `src/components/Footer.jsx` | Komponen footer |
| `src/components/ProductCard.jsx` | Komponen kartu produk untuk display di katalog |
| `src/components/ui/button.jsx` | Komponen button reusable |
| `src/components/ui/card.jsx` | Komponen card reusable |

# File Utility & Konfigurasi

| File | Fungsi |
|------|--------|
| `src/context/CartContext.jsx` | React Context untuk state management keranjang belanja |
| `src/hooks/useProducts.js` | Custom hook untuk mengambil data produk dari Firebase |
| `src/lib/utils.js` | Fungsi utility (format mata uang, dll) |
| `src/utils/storage.js` | Fungsi penyimpanan ke localStorage |
| `src/utils/alerts.js` | Konfigurasi SweetAlert untuk popup |

# Teknologi yang Digunakan

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.20.0
- **Charts**: Recharts 3.8.1
- **Backend**: Firebase (Auth & Firestore)
- **Icons**: Lucide React 0.563.0
- **Alerts**: SweetAlert2 11.26.18