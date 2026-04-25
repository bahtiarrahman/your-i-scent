# Dokumentasi Penjelasan Tiap File

Dokumen ini menjelaskan **setiap file** di project ini, buat apa, dan isinya apa.

---

## 📁 STRUKTUR FOLDER UTAMA

```
perfume-decant-simple/
├── src/
│   ├── admin/          # Halaman Admin (CRUD produk, brand, pesanan, pembayaran)
│   ├── components/     # Komponen UI yang bisa dipole banyak halaman
│   ├── context/       # React Context (state manajemen)
│   ├── data/         # Data default/awal
│   ├── hooks/        # Custom React Hooks
│   ├── pages/        # Halaman customer (katalog, keranjang, checkout, dll)
│   ├── utils/        # Fungsi helper/utility
│   ├── App.jsx       # Konfigurasi Router
│   └── main.jsx      # Entry point React
├── index.html        # HTML utama
└── package.json     # Daftar dependencies
```

---

## 🔧 FILE UTILS (src/utils/)

### 1. storage.js
**Untuk apa:** Mengelola semua data di localStorage (database di browser)

**Isi fungsi:**
| Fungsi | Buat Apa |
|--------|---------|
| `initStorage()` | Inisialisasi data awal saat pertama kali buka website |
| `getProducts()` / `saveProducts()` | Ambil/simpan data produk |
| `getBrands()` / `saveBrands()` | Ambil/simpan data brand |
| `getOrders()` / `saveOrder()` | Ambil/simpan pesanan |
| `getUsers()` / `registerUser()` | Data user & registration |
| `loginUser(identifier, password)` | Login (cek username/password) |
| `getCurrentUser()` | Cek siapa yang login |
| `logoutUser()` | Logout |
| `isAdmin()` | Cek apakah admin |
| `getPaymentSettings()` | Ambil data rekening/e-wallet |
| `addBankAccount()` / `deleteBankAccount()` | Tambah/hapus rekening bank |
| `addEwalletAccount()` / `deleteEwalletAccount()` | Tambah/hapus e-wallet |
| `getCart()` / `saveCart()` | Data keranjang |
| `clearCart()` | Kosongkan keranjang |

**Data yang disimpan di localStorage:**
```javascript
{
  perfume_products: [...],      // Array produk
  perfume_brands: [...],       // Array brand
  perfume_orders: [...],       // Array pesanan
  perfume_users: [...],        // Array user terdaftar
  perfume_current_user: {...}, // User yang sedang login
  perfume_payment_settings: {...} // Rekening银行 & e-wallet
  perfume_cart: [...]           // Isi keranjang
}
```

**Akun default:**
| Role | Username | Password |
|------|----------|----------|
| Admin | `yori` | `lemineral` |
| User (demo) | `demo` | `demo123` |

---

### 2. alerts.js
**Untuk apa:** Popup notifikasi (SweetAlert2 wrapper)

**Fungsi yang tersedia:**
| Fungsi | Buat Apa |
|--------|---------|
| `confirmAction({title, text})` | Popup konfirmasi (Ya/Batal) |
| `showSuccess(message)` | Popup berhasil (hijau) |
| `showError(message)` | Popup erro (merah) |
| `showWarning(message)` | Popup peringatan (kuning) |
| `showInfo(message)` | Popup info (biru) |
| `showLoading(message)` | Popup loading |
| `closeAlert()` | Tutup popup |

---

## 📦 FILE DATA (src/data/)

### 3. paymentSettings.js
**Untuk apa:** Data default rekening bank & e-wallet

**Isi:**
```javascript
{
  bank: [           // Rekening bank
    { id: 'bca', name: 'BCA', accountNumber: '1234567890', accountName: 'Your.i Scent Official' },
    { id: 'mandiri', name: 'Mandiri', accountNumber: '9876543210', accountName: 'Your.i Scent Official' }
  ],
  ewallet: [        // E-wallet
    { id: 'dana', name: 'DANA', number: '081234567890' },
    { id: 'ovo', name: 'OVO', number: '081234567890' },
    { id: 'gopay', name: 'GoPay', number: '081234567890' }
  ],
  qris: { enabled: true, merchantName: 'Your.i Scent', image: null },
  whatsappAdmin: '6281234567890',
  ongkir: 0
}
```

---

## 🖼️ FILE COMPONENTS (src/components/)

### 4. Navbar.jsx
**Untuk apa:** Menu navigasi atas (logo, menu, login/cart)

**Isi:**
- Logo "your.i scent"
- Menu: Home, Katalog, Tentang, Kontak
- Jika belum login: button Login
- Jika sudah login: nama user + Logout

### 5. Footer.jsx
**Untuk apa:** Footer website (copyright, link sosial)

### 6. ProductCard.jsx
**Untuk apa:** Komponen kotak produk di katalog

**Props yang diterima:**
- `product` = object produk
- `onAddToCart` = fungsi tambah ke keranjang

**Isi dalam komponen:**
- Gambar produk
- Nama + Brand
- Harga (untuk 2ml/5ml/10ml jika decant)
- Tombol "+ Tambah"

---

## 📚 FILE CONTEXT (src/context/)

### 7. CartContext.jsx
**Untuk apa:** Mengelola state keranjang secara global

**Menyediakan:**
| Fungsi/State | Buat Apa |
|-------------|----------|
| `cart` | Array item di keranjang |
| `addToCart(product, size, qty)` | Tambah produk ke keranjang |
| `removeFromCart(productId)` | Hapus item dari keranjang |
| `updateQuantity(productId, qty)` | Ubah quantity |
| `clearCart()` | Kosongkan keranjang |
| `cartTotal` | Total harga |
| `cartCount` | Jumlah item |

---

## 🪝 FILE HOOKS (src/hooks/)

### 8. useProducts.js
**Untuk apa:** Custom hook untuk mengambil data produk

**Isi:**
```javascript
{
  products,      // Array semua produk
  loading,       // Apakah sedang loading
  categories,    // Array kategori (Pria, Wanita, Unisex)
  brands,        // Array brand
  refreshProducts() // Refresh data dari localStorage
}
```

---

## 👤 FILE PAGES CUSTOMER (src/pages/)

### 9. Home.jsx
**Untuk apa:** Halaman utama (landing page)

### 10. Catalog.jsx
**Untuk apa:** Halaman katalog produk

**Fitur:**
- Tampilkan semua produk
- Filter: Jenis (Decant/Preloved/BNIB)
- Filter: Kategori (Pria/Wanita/Unisex)
- Filter: Brand
- Search/Cari nama
- Sort: A-Z, Z-A, Harga Terendah, Harga Tertinggi

### 11. ProductDetail.jsx
**Untuk apa:** Halaman detail 1 produk

**Isi:**
- Gambar besar
- Nama, Brand, Deskripsi
- Fragrance Notes (Top, Middle, Base)
- Pilih ukuran (2ml/5ml/10ml) jika decant
- Pilih quantity
- Tombol "Tambah ke Keranjang"

### 12. Cart.jsx
**Untuk apa:** Halaman keranjang belanja

**Isi:**
- List item di keranjang
- Ubah quantity per item
- Hapus item
- Total harga
- Button "Checkout"

### 13. Checkout.jsx
**Untuk apa:** Halaman checkout & buat pesanan

**Langkah:**
1. Pilih metode pembayaran (Bank/E-Wallet/COD)
2. Input data pengiriman (nama, HP, alamat)
3. Klik "Buat Pesanan"
4. Tampilkan konfirmasi + link WhatsApp

### 14. Login.jsx
**Untuk apa:** Halaman login

**Isi:**
- Input Username/Email
- Input Password
- Button Login
- Link ke Register

### 15. Register.jsx
**Untuk apa:** Halaman daftar user baru

**Isi:**
- Input Nama Lengkap
- Input Email
- Input Password
- Konfirmasi Password
- Button Daftar

### 16. Account.jsx
**Untuk apa:** Halaman akun user (lihat pesanan)

**Isi:**
- Data diri user
- Riwayat pesanan user

### 17. About.jsx
**Untuk apa:** Halaman "Tentang Kami"

### 18. Contact.jsx
**Untuk apa:** Halaman kontak

### 19. FAQ.jsx
**Untuk apa:** Halaman Frequently Asked Questions

### 20. PaymentSettings.jsx (Customer)
**Untuk apa:** Halaman info pembayaran untuk customer

---

## 👑 FILE ADMIN (src/admin/)

### 21. Dashboard.jsx
**Untuk apa:** Dashboard admin dengan sidebar

**Isi:**
- Stats Cards: Total Produk, Total Brand, Total Pesanan, Total Pendapatan
- Tabel Pesanan Terbaru (5 pesanan terakhir)

**Catatan:** Menggunakan `AdminLayout`, jadi ada sidebar di kiri.

### 22. AdminLayout.jsx - BARU
**Untuk apa:** Layout utama halaman admin (sidebar + content area)

**Isi:**
- Sidebar FIXED di kiri dengan menu:
  - Dashboard
  - Produk
  - Brand
  - Pesanan
  - Pembayaran
  - Lihat Website (link ke homepage)
  - Logout
- Main content area di kanan (ml-64)

**Semua halaman admin wajib pake AdminLayout**

### 23. Products.jsx
**Untuk apa:** Kelola produk (CRUD)

**Isi:**
- Tabel daftar produk
- Tombol Tambah Produk
- Filter: Semua/Decant/Preloved/BNIB
- Search
- Pagination (10 per halaman)
- Modal tambah/edit produk

**Child Components:**
- `ProductTable.jsx` - Komponen tabel
- `ProductForm.jsx` - Komponen form

### 23. ProductTable.jsx
**Untuk apa:** Menampilkan tabel produk (komponen terpisah)

**Isi:**
- Header tabel: Gambar, Nama, Jenis, Brand, Harga, Stok, Aksi
- Row per produk
- Tombol Edit & Hapus

### 24. ProductForm.jsx
**Untuk apa:** Form tambah/edit produk (komponen terpisah)

**Isi:**
- Input gambar (URL)
- Input nama produk (otomatis tambah brand depan)
- Dropdown brand
- Dropdown jenis (Decant/Preloved/BNIB)
- Dropdown kategori (Pria/Wanita/Unisex)
- Input deskripsi
- Input fragrance notes
- Input harga per ukuran (jika Decant)
- Input harga tetap (jika Preloved/BNIB)
- Input stok

**Validasi:**
- Tidak boleh ada produk dengan nama+brand+jenis yang sama

### 25. Brands.jsx
**Untuk apa:** Kelola brand (CRUD)

**Isi:**
- Tabel daftar brand
- Tombol Tambah Brand
- Edit Brand
- Hapus Brand
- Pagination (10 per halaman)

### 26. Orders.jsx
**Untuk apa:** Kelola pesanan

**Isi:**
- Tabel pesanan
- Filter status: Semua, Menunggu, Diproses, Dikirim, Selesai
- Update status pesanan
- Hapus pesanan
- Pagination (10 per halaman)

### 27. PaymentSettings.jsx (Admin)
**Untuk apa:** Pengaturan pembayaran

**Isi:**
- Kelola rekening bank (tambah, edit, hapus)
- Kelola e-wallet (tambah, edit, hapus)
- Setting WhatsApp admin
- QRIS Settings

---

## ⚙️ FILE KONFIGURASI

### 28. App.jsx
**Untuk apa:** Konfigurasi Router (url & halaman)

**Isi:**
```javascript
// Routes:
/                    → Home
/catalog              → Catalog
/product/:id          → ProductDetail
/cart                 → Cart
/checkout             → Checkout
/login                → Login
/register             → Register
/akun                 → Account
/tentang              → About
/kontak               → Contact
/faq                  → FAQ

// Routes Admin (/admin/*):
/admin                → Dashboard
/admin/produk         → Products
/admin/brand          → Brands
/admin/pesanan        → Orders
/admin/pembayaran    → PaymentSettings (Admin)
```

### 29. main.jsx
**Untuk apa:** Entry point React

**Isi:**
- Import React DOM
- Mount ke root element
- Panggil `initStorage()` untuk inisialisasi data awal

---

## 📊 CONTOH DATA

### Produk
```javascript
{
  id: 1,
  name: "Dior Sauvage",       //Nama produk
  brand: "Dior",           //Brand
  categoryId: 1,            //1=Pria, 2=Wanita, 3=Unisex
  description: "Parfum...",
  image: "https://...",
  type: "decant",          //decant | preloved | bnib
  prices: {                //Jika type="decant"
    "2": 35000,          //Harga 2ml
    "5": 75000,          //Harga 5ml
    "10": 140000         //Harga 10ml
  },
  price: 0,                //Jika type="preloved"/"bnib"
  quantity: 10,            //Stok
  notes: {                 //Fragrance notes
    top: "Bergamot",
    middle: "Lavender",
    base: "Ambroxan"
  }
}
```

### Pesanan
```javascript
{
  id: "ORD-1704067200000",
  customer: {
    name: "John Doe",
    email: "john@email.com",
    phone: "081234567890",
    address: "Jl. Merdeka No.1, Jakarta"
  },
  items: [
    {
      productId: 1,
      productName: "Dior Sauvage",
      productImage: "https://...",
      brand: "Dior",
      type: "decant",
      size: 10,
      price: 140000,
      quantity: 1
    }
  ],
  total: 140000,
  payment: "bank",       //bank | ewallet | cod
  status: "menunggu",   //menunggu | diproses | dikirim | selesai | dibatalkan
  date: "2024-01-01T00:00:00.000Z"
}
```

---

## 🔗 RELASI ANTAR FILE

```
App.jsx (Router)
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── Catalog.jsx
    │   │       └���─ ProductCard.jsx (component)
    │   ├── ProductDetail.jsx
    │   ├── Cart.jsx
    │   │       └── CartContext.jsx (context)
    │   ├── Checkout.jsx
    │   │       └── storage.js (saveOrder)
    │   ├── Login.jsx / Register.jsx
    │   │       └── storage.js (loginUser/registerUser)
    │   └── Account.jsx
    │           └── storage.js (getOrdersByUser)
    │
    └── admin/
        ├── Dashboard.jsx
        │       └── storage.js (getProducts/getOrders/getBrands)
        ├── Products.jsx
        │       ├── ProductTable.jsx
        │       └── ProductForm.jsx
        ├── Brands.jsx
        ├── Orders.jsx
        │       └── storage.js (updateOrderStatus/deleteOrder)
        └── PaymentSettings.jsx
                └── storage.js (addBankAccount/deleteEwalletAccount/etc)

storage.js  ←→  localStorage (Browser)
alerts.js  ←→  SweetAlert2 (Popup)
```

---

## 📝 RINGKASAN

| Folder | Buat Apa |
|--------|---------|
| `utils/` | Semua fungsi helper (storage, alerts) |
| `data/` | Data default |
| `components/` | Komponen UI reuseable |
| `context/` | Global state (keranjang) |
| `hooks/` | Custom hooks |
| `pages/` | Halaman customer |
| `admin/` | Halaman admin |

**Logika aplikasi:**
1. User browse katalog → tambah ke keranjang → checkout
2. Datadisimpan di `localStorage` via `storage.js`
3. Notifikasi pake `alerts.js` (SweetAlert2)
4. Admin login → kelola produk/brand/pesanan/pembayaran