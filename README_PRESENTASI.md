# Dokumentasi Project: your.i scent - Toko Parfum Decant

## A. Ringkasan Project

### Nama Project
**your.i scent** - Toko online parfum decant berbasis React Vite

### Tujuan Aplikasi
Aplikasi e-commerce sederhana untuk menjual parfum decant (parfum ukuran kecil dari botol asli). User bisa:
- Menjelajahi katalog parfum
- Memilih ukuran decant (2ml, 5ml, 10ml)
- Checkout dan buat pesanan
- Admin bisa kelola produk dan pesanan

### Teknologi yang Dipakai
- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Notifications**: SweetAlert2
- **Data Storage**: LocalStorage (tanpa backend)
- **Build Tool**: Vite

---

## B. Fitur Utama (Customer)

### 1. Beranda (/)
**Fungsi**: Halaman utama yang menampilkan keunggulan dan produk unggulan

**Yang bisa dilakukan user**:
- Melihat hero section dengan Call-to-Action ke katalog
- Melihat 3 keunggulan toko (Original, Packing Aman, Pengiriman Cepat)
- Melihat 4 produk unggulan (featured products)
- Langsung ke katalog atau cari parfum

**Komponen penting**:
- Hero Section dengan gradient dan tombol navigasi
- Benefits Cards (keunggulan toko)
- ProductCard (produk unggulan)
- CTA Section (ajak belanja)

---

### 2. Katalog (/catalog)
**Fungsi**: Menampilkan semua parfum yang tersedia dengan filter kategori

**Yang bisa dilakukan user**:
- Melihat semua produk dalam grid card
- Filter berdasarkan kategori (Pria, Wanita, Unisex)
- Klik produk untuk lihat detail

**Komponen penting**:
- Category Filter Buttons
- ProductCard (gambar, nama, brand, harga per ukuran)

**Data produk** (dari LocalStorage):
- Nama, brand, deskripsi, gambar
- 3 opsi ukuran: 2ml, 5ml, 10ml dengan harga berbeda

---

### 3. Detail Produk (/product/:id)
**Fungsi**: Halaman detail satu produk dengan pilihan ukuran

**Yang bisa dilakukan user**:
- Melihat detail lengkap produk (nama, brand, deskripsi, gambar)
- Memilih ukuran decant (2ml/5ml/10ml)
- Menambahkan ke keranjang dengan jumlah (quantity)
- Lihat ukuran lain atau lanjut ke keranjang

**Komponen penting**:
- Product Image Gallery
- Size Selector (radio buttons)
- Quantity Adjuster (+/-)
- Add to Cart Button

---

### 4. Keranjang (/cart)
**Fungsi**: Mengelola item yang akan dibeli

**Yang bisa dilakukan user**:
- Melihat semua item di keranjang
- Mengubah jumlah (quantity) per item
- Menghapus item dari keranjang
- Melihat total harga
- Lanjut ke checkout atau lanjut belanja

**Komponen penting**:
- Cart Item Card (gambar, nama, ukuran, jumlah, harga)
- Quantity Controls (+/-)
- Remove Button
- Cart Summary dengan total

**Data tersimpan**: Array of cart items di LocalStorage

---

### 5. Checkout (/checkout)
**Fungsi**: Form data pengiriman dan konfirmasi pesanan

**Yang bisa dilakukan user**:
- Melihat ringkasan pesanan (item + total harga)
- Mengisi data: nama, email, WhatsApp, alamat
- Submit untuk buat pesanan
- Setelah submit: keranjang dikosongkan, pesanan disimpan

**Komponen penting**:
- Order Summary (readonly)
- Shipping Form (nama, email, phone, address)
- Submit Button

**Alur setelah submit**:
1. Pesanan disimpan ke LocalStorage
2. Cart dikosongkan
3. SweetAlert2 success muncul
4. Redirect ke halaman utama

---

### 6. Tentang (/tentang)
**Fungsi**: Halaman informasi tentang toko

**Yang bisa dilakukan user**:
- Membaca tentang your.i scent
- Melihat deskripsi singkat toko

---

### 7. Kontak (/kontak)
**Fungsi**: Hubungi toko via WhatsApp, Instagram, Email, atau Maps

**Yang bisa dilakukan user**:
- Melihat info toko (nama, lokasi, email, WhatsApp, Instagram)
- Klik tombol untuk:
  - **Chat WhatsApp**: Buka WA dengan pesan otomatis
  - **Kunjungi Instagram**: Buka profil @your.i_scent
  - **Kirim Email**: Buka email client
  - **Lihat Lokasi di Maps**: Buka Google Maps Yogyakarta
- Isi form kontak (nama, email, pesan)
- Submit form → muncul SweetAlert2 success

**Link WhatsApp Format**:
```
https://wa.me/{nomor}?text={encoded message}
```
Pesan default: "Halo your.i scent 👋 saya ingin bertanya tentang parfum decant."

---

### 8. FAQ (/faq)
**Fungsi**: Halaman pertanyaan yang sering diajukan

**Yang bisa dilakukan user**:
- Melihat daftar FAQ tentang decant, pembayaran, pengiriman

---

### 9. Akun (/akun)
**Fungsi**: Halaman profil user dan riwayat pesanan

**Yang bisa dilakukan user**:
- Melihat info profil (nama, email, role)
- Melihat riwayat pesanan
- Klik "Lihat Detail" untuk detail pesanan lengkap
- Logout dari akun

**Yang ditampilkan**:
- Profile Card dengan avatar
- Badge role (Customer / Admin)
- Daftar pesanan dengan status warna
- Tombol ke Admin Panel (jika role admin)

**Status Pesanan**:
- ⏳ Menunggu (default)
- 🔄 Diproses
- 🚚 Dikirim
- ✅ Selesai
- ❌ Dibatalkan

---

### 10. Login (/login)
**Fungsi**: Masuk ke akun

**Yang bisa dilakukan user**:
- Login dengan email/nama dan password (untuk customer)
- Login khusus admin: username `admin`, password `admin123`
- Redirect ke halaman sebelumnya jika berhasil

**Route Protection**:
- Jika bukan admin → redirect ke login dengan warning

---

### 11. Register (/register)
**Fungsi**: Buat akun baru

**Yang bisa dilakukan user**:
- Isi form: nama, email, password, konfirmasi password
- Validasi: email belum terdaftar, password cocok
- Setelah register → langsung login dan redirect

---

## C. Fitur Admin Panel

### 1. Dashboard Admin (/admin)
**Fungsi**: Overview sistem dan navigasi ke fitur admin lain

**Yang bisa dilakukan admin**:
- Melihat ringkasan statistik
- Navigasi ke: Kelola Produk, Kelola Pesanan, Pengaturan Pembayaran
- Link ke halaman admin (memerlukan role admin)

**Akses**: Hanya untuk user dengan role `admin`

---

### 2. Kelola Produk (/admin/products)
**Fungsi**: Tambah, edit, hapus produk

**Yang bisa dilakukan admin**:
- Melihat semua produk dalam tabel
- Tambah produk baru (nama, brand, kategori, deskripsi, gambar, harga dasar)
- Edit produk yang ada
- Hapus produk

**Dampak ke user**:
- Produk baru langsung muncul di katalog
- Perubahan produk langsung terlihat
- Produk dihapus tidak muncul di katalog

---

### 3. Kelola Pesanan (/admin/orders)
**Fungsi**: Lihat dan ubah status pesanan customer

**Yang bisa dilakukan admin**:
- Melihat semua pesanan dalam tabel
- Filter pesanan berdasarkan status
- Ubah status pesanan (dropdown)
- Lihat detail pesanan lengkap (SweetAlert2 modal)

**Status yang bisa dipilih**:
- Menunggu → Diproses → Dikirim → Selesai / Dibatalkan

**Dampak ke user**:
- User melihat status baru di halaman Akun → Riwayat Pesanan
- Status berubah warna sesuai state

---

### 4. Pengaturan Pembayaran (/admin/payment)
**Fungsi**: Konfigurasi metode pembayaran

**Yang bisa dilakukan admin**:
- Atur nomor WhatsApp admin (untuk notifikasi)
- Atur rekening bank (BCA, Mandiri)
- Atur e-wallet (DANA, OVO, GoPay)

**Dampak ke user**:
- Nomor WhatsApp di halaman Kontak dan Footer otomatis update
- Informasi pembayaran checkout tergantung konfigurasi

---

## D. Sistem Login dan Role

### User Register & Login
**Register**:
1. User isi form (nama, email, password)
2. Sistem cek: email sudah terdaftar?
3. Jika belum → buat user baru di LocalStorage
4. Langsung auto-login

**Login**:
1. User isi identifier (email/nama) + password
2. Sistem cari di database user
3. Jika ketemu → set session, redirect

**Data user tersimpan**:
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string,
  role: 'user',
  createdAt: string
}
```

### Admin Login
**Credentials**: `admin` / `admin123`

**Proses**:
1. Sistem cek khusus: identifier === 'admin' && password === 'admin123'
2. Jika benar → set session dengan role: 'admin'

### Role Admin vs Customer
| Aspek | Admin | Customer |
|-------|-------|----------|
| Akses Admin Panel | ✅ | ❌ |
| Kelola Produk | ✅ | ❌ |
| Kelola Pesanan | ✅ | ❌ |
| Pengaturan Pembayaran | ✅ | ❌ |
| Belanja | ✅ | ✅ |
| Lihat Riwayat Pesanan | ✅ (semua) | ✅ (milik sendiri) |

### Proteksi Route
**AdminRoute**:
```javascript
useEffect(() => {
  if (!isAdmin()) {
    showWarning('Anda tidak punya akses ke halaman admin!');
    navigate('/login');
  }
}, [navigate]);
```

**UserRoute** (halaman akun):
```javascript
useEffect(() => {
  if (!isLoggedIn()) {
    showWarning('Kamu harus login dulu untuk membuka halaman akun.');
    navigate('/login');
  }
}, [navigate]);
```

---

## E. Sistem LocalStorage

### Data yang Disimpan

| Key | Isi | Fungsi |
|-----|-----|--------|
| `perfume_products` | Array produk | Data katalog |
| `perfume_categories` | Array kategori | Filter di katalog |
| `perfume_cart` | Array cart items | Keranjang user |
| `perfume_orders` | Array pesanan | Riwayat pesanan |
| `perfume_users` | Array user | Database user |
| `perfume_current_user` | Object user | Session aktif |
| `perfume_payment_settings` | Object settings | Konfigurasi pembayaran |

### Mengapa LocalStorage?
1. **Tanpa backend**: Project ini frontend-only
2. **Persistence**: Data bertahan setelah refresh
3. **Session management**: Login tetap aktif
4. **Simple**: Tidak perlu setup database

### Keterbatasan
- Data hanya di browser user tersebut
- Tidak bisa share data antar device
- Data hilang jika cache browser dihapus
- Tidak ada multi-user real-time

---

## F. Flow Checkout dan WhatsApp

### Step-by-Step Checkout

```
1. USER DI KERANJANG
   ↓ Klik "Checkout"
   
2. HALAMAN CHECKOUT
   - Lihat ringkasan pesanan (item + total)
   - Isi form: nama, email, WhatsApp, alamat
   - Klik "Buat Pesanan"
   
3. PROSES PESANAN
   - Buat object pesanan dengan ID unik
   - Simpan ke LocalStorage (orders)
   - Kosongkan cart
   
4. KONFIRMASI
   - SweetAlert2: "Pesanan berhasil dibuat!"
   - Redirect ke homepage
```

### Format Pesanan
```javascript
{
  id: 'ORD-1700000000',        // ID unik
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '6281234567890',
    address: 'Jakarta'
  },
  items: [
    {
      id: 1,
      productName: 'Dior Sauvage',
      productImage: 'https://...',
      size: 5,
      quantity: 2,
      price: 75000
    }
  ],
  total: 150000,
  status: 'menunggu',           // Default
  payment: 'transfer',          // atau 'cod'
  createdAt: '2024-01-01T10:00:00.000Z'
}
```

### Tombol Konfirmasi WhatsApp

**Di Halaman Checkout/Cart**:
```
https://wa.me/6281234567890?text=
Halo%20your.i%20scent%20%F0%9F%91%8B%20saya%20ingin%20checkout%20pesanan...

Format pesan:
- ID Pesanan
- Total harga
- Metode pembayaran
```

### Status Pesanan Default
- **Menunggu** (default) → Kuning
- **Diproses** → Biru
- **Dikirim** → Ungu
- **Selesai** → Hijau
- **Dibatalkan** → Merah

---

## G. Struktur Folder Project

```
src/
├── main.jsx              # Entry point (ReactDOM.createRoot)
├── App.jsx               # Main app dengan Routes
├── index.css             # Tailwind directives
├── components/
│   ├── Navbar.jsx        # Navigation bar
│   ├── Footer.jsx        # Footer dengan social links
│   └── ProductCard.jsx   # Card untuk display produk
├── pages/
│   ├── Home.jsx          # Beranda
│   ├── Catalog.jsx       # Katalog produk
│   ├── ProductDetail.jsx # Detail produk + add to cart
│   ├── Cart.jsx          # Keranjang
│   ├── Checkout.jsx      # Form checkout
│   ├── About.jsx         # Tentang kami
│   ├── Contact.jsx       # Kontak + form
│   ├── FAQ.jsx           # FAQ
│   ├── Account.jsx       # Profil + riwayat pesanan
│   ├── Login.jsx         # Login form
│   └── Register.jsx     # Register form
├── admin/
│   ├── Dashboard.jsx     # Dashboard admin
│   ├── Products.jsx      # Kelola produk
│   ├── Orders.jsx        # Kelola pesanan
│   └── PaymentSettings.jsx # Pengaturan pembayaran
├── hooks/
│   └── useProducts.js   # Hook untuk ambil produk
├── context/
│   └── CartContext.jsx   # Cart state management
├── utils/
│   ├── storage.js        # LocalStorage helpers
│   └── alerts.js         # SweetAlert2 config
└── data/
    └── paymentSettings.js # Default payment config
```

### Penjelasan Tiap Folder

| Folder | Isi | Fungsi |
|--------|-----|--------|
| `components/` | UI reusable | Navbar, Footer, ProductCard |
| `pages/` | Halaman route | Setiap file = 1 halaman |
| `admin/` | Halaman admin | Hanya untuk role admin |
| `hooks/` | Custom hooks | useProducts() |
| `context/` | Global state | CartContext |
| `utils/` | Helper functions | storage, alerts |
| `data/` | Static data | Default payment settings |

---

## H. Cara Menjalankan Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```

### 3. Akses Aplikasi
| Halaman | URL |
|---------|-----|
| Customer | http://localhost:5173/ |
| Admin Panel | http://localhost:5173/admin |
| Login | http://localhost:5173/login |

### 4. Build untuk Production
```bash
npm run build
```
Output ada di folder `dist/`

---

## I. Checklist Demo Presentasi

### Persiapan
- [ ] Buka browser di http://localhost:5173
- [ ] Buka tab baru untuk admin di http://localhost:5173/admin

### Demo Customer Flow
- [ ] **Navigasi Beranda**: Tunjukkan hero keunggulan,, produk unggulan
- [ ] **Buka Katalog**: Klik "Lihat Katalog" dari beranda
- [ ] **Filter Kategori**: Coba filter Pria/Wanita/Unisex
- [ ] **Pilih Produk**: Klik produk pertama (Dior Sauvage)
- [ ] **Tambah ke Cart**: Pilih ukuran 5ml, quantity 2, klik "Tambah ke Keranjang"
- [ ] **Tambah Lagi**: Balik ke katalog, tambah 1 produk lain
- [ ] **Cek Keranjang**: Buka cart, lihat item, ubah quantity jika perlu
- [ ] **Checkout**: Klik "Checkout", isi form (nama, email, WhatsApp, alamat)
- [ ] **Submit**: Klik "Buat Pesanan", lihat konfirmasi SweetAlert2
- [ ] **Cek Riwayat**: Buka "Akun", lihat pesanan baru dengan status "Menunggu"

### Demo Admin Flow
- [ ] **Login Admin**: Buka /login, isi admin/admin123
- [ ] **Buka Dashboard**: Klik "Admin Panel" di halaman akun
- [ ] **Cek Pesanan**: Buka "Kelola Pesanan"
- [ ] **Ubah Status**: Ganti status pesanan customer dari "Menunggu" → "Diproses"
- [ ] **Kembali ke Customer**: Refresh tab customer, buka "Akun"
- [ ] **Verifikasi**: Pastikan status pesanan sudah berubah
- [ ] **Kelola Produk**: Buka "Kelola Produk", tambah produk baru
- [ ] **Verifikasi Produk**: Cek di katalog, produk baru muncul

### Demo Fitur Kontak
- [ ] Buka /kontak
- [ ] Klik "Chat WhatsApp" → Pastikan terbuka di WA dengan pesan otomatis
- [ ] Klik "Kunjungi Instagram" → Buka profil @your.i_scent
- [ ] Klik "Kirim Email" → Buka email client
- [ ] Klik "Lihat Lokasi di Maps" → Buka Google Maps Yogyakarta
- [ ] Isi form kontak (nama, email, pesan), submit → Lihat SweetAlert