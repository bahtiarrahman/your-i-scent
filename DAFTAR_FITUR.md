# 📋 Daftar Fitur your.i scent

---

## 🛒 FITUR CUSTOMER (Pengguna)

### 1. Landing Page (Beranda)
- [x] Hero section dengan gradient
- [x] Tampilkan kategori (Pria/Wanita/Unisex)
- [x] Tampilkan produk terbaru (4 produk)
- [x] Navigasi ke katalog

### 2. Katalog Produk
- [x] Tampilkan semua produk
- [x] Filter berdasarkan jenis (Semua/Decant/Preloved/BNIB)
- [x] Filter berdasarkan kategori (Pria/Wanita/Unisex)
- [x] Filter berdasarkan brand
- [x] Sorting (A-Z, Termurah, Termahal)
- [x] Pencarian produk (nama/brand)
- [x] Pagination (8 produk per halaman)
- [x] Reset filter

### 3. Detail Produk
- [x] Tampilkan gambar produk (besar)
- [x] Tampilkan nama, brand, kategori
- [x] Tampilkan deskripsi produk
- [x] Tampilkan fragrance notes (Top/Middle/Base)
- [x] Tampilkan harga per ukuran (untuk Decant)
- [x] Tampilkan harga tunggal (untuk Preloved/BNIB)
- [x] Tampilkan ketersediaan stok
- [x] Pilih ukuran (2ml/5ml/10ml)
- [x] Tambah ke keranjang

### 4. Keranjang
- [x] Tampilkan semua item di keranjang
- [x] Tampilkan gambar, nama, brand, ukuran, harga
- [x] Tampilkan jenis produk (badge)
- [x] Edit quantity (+/-)
- [x] Hapus item satu per satu
- [x] Kosongkan keranjang
- [x] Tampilkan subtotal per item
- [x] Tampilkan total pesanan
- [x] Tampilkan ongkos kirim (Gratis)
- [x] Navigasi ke checkout
- [x] Navigasi lanjut belanja

### 5. Checkout
- [x] Wajib login untuk checkout
- [x] Pilih metode pembayaran:
  - [x] Transfer Bank
  - [x] E-Wallet
  - [x] COD (Bayar di Tempat)
- [x] Tampilkan nomor rekening/e-wallet (dari settings admin)
- [x] Tampilkan langkah-langkah pembayaran
- [x] Input data pengiriman:
  - [x] Nama lengkap
  - [x] Email
  - [x] No. WhatsApp
  - [x] Alamat lengkap
- [x] Buat pesanan
- [x] Simpan pesanan ke localStorage
- [x] Tampilkan detail pesanan setelah checkout
- [x] Konfirmasi via WhatsApp (otomatis buka wa.me)

### 6. Autentikasi
- [x] Halaman Login
- [x] Halaman Register
- [x] Login dengan email/username
- [x] Register user baru
- [x] Simpan data user ke localStorage
- [x] Logout
- [x] Redirect jika belum login

### 7. Akun Pengguna
- [x] Tampilkan profil user (nama, email)
- [x] Tampilkan riwayat pesanan
- [x] Logout

### 8. Halaman Info
- [x] Halaman Tentang (/tentang)
- [x] Halaman Kontak (/kontak)
- [x] Halaman FAQ (/faq)

---

## ⚙️ FITUR ADMIN

### 1. Dashboard Admin
- [x] Tampilkan jumlah total produk
- [x] Tampilkan jumlah pesanan menunggu
- [x] Tampilkan jumlah pesanan selesai
- [x] Navigasi ke menu admin

### 2. Kelola Produk
- [x] Tampilkan semua produk dalam tabel
- [x] Pencarian produk
- [x] Pagination
- [x] Tambah produk baru:
  - [x] Upload gambar (base64)
  - [x] Input URL gambar
  - [x] Input nama produk
  - [x] Input brand
  - [x] Pilih jenis produk (Decant/Preloved/BNIB)
  - [x] Pilih kategori
  - [x] Input deskripsi
  - [x] Input fragrance notes (Top/Middle/Base)
  - [x] Input harga per ukuran (untuk Decant)
  - [x] Input harga tunggal (untuk Preloved/BNIB)
  - [x] Input stok
- [x] Edit produk
- [x] Hapus produk (dengan konfirmasi)
- [x] Tampilkan badge jenis produk

### 3. Kelola Pesanan
- [x] Tampilkan semua pesanan dalam tabel
- [x] Filter pesanan berdasarkan status:
  - [x] Semua
  - [x] Menunggu
  - [x] Diproses
  - [x] Selesai
- [x] Update status pesanan
- [x] Hapus pesanan
- [x] Tampilkan detail pesanan (customer, items, total)

### 4. Pengaturan Pembayaran
- [x] Kelola rekening bank:
  - [x] Tambah bank
  - [x] Edit bank
  - [x] Hapus bank
- [x] Kelola E-Wallet:
  - [x] Tambah e-wallet
  - [x] Edit e-wallet
  - [x] Hapus e-wallet
- [x] Pengaturan QRIS
- [x] Input nomor WhatsApp Admin
- [x] Simpan pengaturan ke localStorage

---

## 🔧 FITUR TEKNIS

### 1. Routing
- [x] React Router DOM v6
- [x] Route protection (admin, akun, checkout)
- [x] Dynamic routes (/product/:id)
- [x] SPA routing (historyApiFallback)

### 2. State Management
- [x] React Context (CartContext)
- [x] localStorage untuk persistent data

### 3. UI/UX
- [x] Responsive design (mobile/tablet/desktop)
- [x] Mobile navigation (hamburger menu)
- [x] Loading states
- [x] Toast notifications (SweetAlert2)
- [x] Confirmation dialogs
- [x] Form validation
- [x] Image preview

### 4. Data
- [x] Default produk (10 produk)
- [x] Default kategori (Pria/Wanita/Unisex)
- [x] Default payment settings

### 5. Deployment
- [x] Vite build configuration
- [x] Vercel configuration (vercel.json)
- [x] Production build

---

## 📊 RINGKASAN JUMLAH FITUR

| Kategori | Jumlah Fitur |
|----------|-------------|
| Customer | 26 |
| Admin | 18 |
| Teknis | 6 |
| **Total** | **50** |

---

## 🚀 JENIS PRODUK YANG DIDUKUNG

| Jenis | Keterangan |
|-------|------------|
| **Decant** | Parfum ukuran kecil (2ml/5ml/10ml) dengan harga per ml |
| **Preloved** | Parfum bekas dengan harga tunggal |
| **BNIB** | Brand New In Box (barang baru segel) |

---

## 💾 DATA YANG DISIMPAN (localStorage)

| Key | Fungsi |
|-----|--------|
| `perfume_products` | Data semua produk |
| `perfume_categories` | Kategori produk |
| `perfume_orders` | Semua pesanan |
| `perfume_cart` | Isi keranjang |
| `perfume_users` | Data user terdaftar |
| `perfume_current_user` | User yang sedang login |
| `perfume_payment_settings` | Rekening bank, e-wallet, WA admin |

---

## 🔐 AKUN LOGIN

| Role | Username | Password |
|------|----------|----------|
| Admin | `yori` | `lemineral` |
| User | Register manual | Sesuai input |

---

## 📝 CATATAN

- Semua data disimpan di localStorage browser
- Setiap browser/device memiliki data sendiri-sendiri
- Untuk sinkronisasi antar device diperlukan backend (Firebase/Supabase)
