# DOKUMENTASI SKRIPSI: your.i scent
# Aplikasi E-Commerce Parfum Decant

---

## BAB I: PENDAHULUAN

### 1.1 Latar Belakang

**your.i scent** adalah aplikasi e-commerce untuk penjualan parfum decant dengan 3 kategori:
- **DECANT** (2ml, 5ml, 10ml)
- **PRELOVED** (second original)
- **BNIB** (Brand New In Box)

### 1.2 Permasalahan
1. Keterbatasan akses parfum premium
2. Risiko pembelian blind bottle
3. Kurangnya informasi fragrance notes
4. Sistem checkout yang rumit

### 1.3 Tujuan
1. Platform belanja parfum decant yang mudah
2. Informasi lengkap termasuk fragrance notes
3. Sistem manajemen untuk admin
4. Checkout sederhana dengan WhatsApp

### 1.4 Manfaat
| Untuk Customer | Untuk Admin |
|----------------|-------------|
| Aksesibilitas online | CRUD produk |
| Harga terjangkau | Update status pesanan |
| Informasi lengkap | Kelola pembayaran |
| Checkout cepat | Statistik dashboard |

### 1.5 Batasan Sistem
- Database: LocalStorage browser
- Auth: Tanpa verifikasi email
- Pembayaran: Konfirmasi via WhatsApp

---

## BAB II: TEKNOLOGI

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 18.2.0 | UI Library |
| Vite | 5.0.0 | Build Tool |
| React Router | 6.20.0 | Routing |
| Tailwind CSS | 3.4.1 | Styling |
| SweetAlert2 | 11.26.18 | Alerts |
| Lucide React | 0.563.0 | Icons |
| LocalStorage | - | Database |

---

## BAB III: DESIGN

### 3.1 Color Palette

| Warna | HEX | Penggunaan |
|-------|-----|------------|
| Primary-500 | #facc15 | Tombol utama |
| Primary-600 | #eab308 | Hover |
| Gray-50 | #fafafa | Background |
| Gray-800 | #1f2937 | Text utama |

### 3.2 Typography

| Elemen | Size | Font |
|--------|------|------|
| Page Title | 36px (text-4xl) | Poppins |
| Section Title | 30px (text-3xl) | Poppins |
| Card Title | 20px (text-xl) | Inter |
| Body | 16px (text-base) | Inter |
| Caption | 14px (text-sm) | Inter |

---

## BAB IV: STRUKTUR FILE

```
src/
├── components/
│   ├── Navbar.jsx      # Navigasi utama
│   ├── Footer.jsx      # Footer situs
│   └── ProductCard.jsx  # Card produk
├── pages/
│   ├── Home.jsx        # Beranda
│   ├── Catalog.jsx     # Katalog
│   ├── ProductDetail.jsx # Detail produk
│   ├── Cart.jsx        # Keranjang
│   ├── Checkout.jsx    # Checkout
│   ├── Account.jsx     # Akun user
│   ├── Login.jsx       # Login
│   ├── Register.jsx    # Register
│   ├── About.jsx       # Tentang
│   ├── Contact.jsx     # Kontak
│   └── FAQ.jsx         # FAQ
├── admin/
│   ├── Dashboard.jsx   # Dashboard admin
│   ├── Products.jsx    # CRUD produk
│   ├── Orders.jsx      # Kelola pesanan
│   └── PaymentSettings.jsx # Kelola pembayaran
├── utils/
│   ├── storage.js      # LocalStorage operations
│   └── alerts.js       # SweetAlert2 wrapper
├── context/
│   └── CartContext.jsx # Cart state
├── hooks/
│   └── useProducts.js  # Products hook
└── data/
    └── paymentSettings.js # Default payment
```

---

## BAB V: FITUR CUSTOMER

### 5.1 Home
- Hero section dengan CTA
- Produk unggulan
- Jenis produk (Decant/Preloved/BNIB)
- Why choose us

### 5.2 Catalog
- Search produk
- Filter tipe & kategori
- Sort harga/nama
- Pagination

### 5.3 Product Detail
- Gambar produk
- Brand, nama, deskripsi
- Size selector (2ml/5ml/10ml)
- **Fragrance Notes (Top/Middle/Base)**
- Add to cart

### 5.4 Cart
- List item
- Update quantity
- Hapus item
- Total harga

### 5.5 Checkout
- Form data penerima
- Pilihan pembayaran:
  - Bank Transfer (BCA, Mandiri)
  - E-Wallet (DANA, OVO, GoPay)
  - COD
  - QRIS
- Konfirmasi WhatsApp

### 5.6 Account
- Profil user
- Riwayat pesanan
- Detail pesanan dengan status

### 5.7 Info Pages
- About: Info toko
- Contact: WhatsApp, Instagram, Email, Lokasi
- FAQ: Pertanyaan umum

---

## BAB VI: SISTEM AUTHENTIKASI

### 6.1 Login

**User Biasa:**
```
Email: user@email.com
Password: (disimpan sebagai hash)
```

**Admin Khusus:**
```
Username: admin
Password: admin123
```

### 6.2 Register

1. User isi form (nama, email, password, telepon, alamat)
2. Validasi email unik
3. Simpan ke LocalStorage
4. Auto login

### 6.3 Logout

1. Hapus currentUser dari LocalStorage
2. Redirect ke beranda
3. Tampilkan notifikasi sukses

### 6.4 Flow Auth

```
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Register│───►│  Login  │───►│ Account │
└─────────┘    └─────────┘    └─────────┘
     │              │              │
     ▼              ▼              ▼
LocalStorage  LocalStorage     Logout ──► Home
```

---

## BAB VII: FITUR ADMIN

### 7.1 Dashboard

| Metric | Info |
|--------|------|
| Total Produk | Jumlah semua produk |
| Total Pesanan | Jumlah semua pesanan |
| Total Pendapatan | Akumulasi pesanan selesai |

### 7.2 Products CRUD

**Tambah Produk:**
1. Klik "Tambah Produk"
2. Isi form:
   - Nama, Brand, Kategori
   - Deskripsi
   - Gambar (URL)
   - **Tipe:** Decant/Preloved/BNIB
   - **Harga:** Multiple (Decant) atau Single
   - **Fragrance Notes:** Top/Middle/Base
3. Simpan

**Edit Produk:**
1. Klik tombol edit
2. Form auto-fill dengan data produk
3. Ubah data
4. Simpan

**Hapus Produk:**
1. Klik tombol hapus
2. Konfirmasi dengan SweetAlert2
3. Hapus dari LocalStorage

### 7.3 Orders Management

**View Pesanan:**
- Tabel dengan kolom: ID, Customer, Total, Pembayaran, Status, Tanggal, Aksi

**Update Status:**
```
Menunggu ─► Diproses ─► Dikirim ─► Selesai
                      └─► Dibatalkan
```

**Hapus Pesanan:**
1. Klik "Hapus"
2. Konfirmasi
3. Hapus dari LocalStorage

### 7.4 Payment Settings

**Kelola Bank:**
- Tambah rekening BCA/Mandiri
- Edit nomor rekening
- Hapus rekening

**Kelola E-Wallet:**
- Tambah DANA/OVO/GoPay
- Edit nomor

**QRIS:**
- Enable/disable
- Merchant name

**WhatsApp Admin:**
- Set nomor WhatsApp untuk konfirmasi

---

## BAB VIII: SISTEM PEMBAYARAN

### 8.1 Metode Pembayaran

| Metode | Detail |
|--------|--------|
| Bank Transfer | BCA, Mandiri |
| E-Wallet | DANA, OVO, GoPay |
| COD | Bayar saat terima |
| QRIS | Scan QR code |

### 8.2 Alur Pembayaran

```
1. User pilih metode pembayaran
2. Tampilkan detail rekening/nomor
3. User transfer/ambil
4. Klik "Konfirmasi WhatsApp"
5. Kirim pesan dengan format:
   - ID Pesanan
   - Total Bayar
   - Metode
   - Bukti Transfer
```

### 8.3 Format Pesan WhatsApp

```
Halo admin your.i scent,

Saya ingin konfirmasi pembayaran pesanan:

ID Pesanan: [ORDER_ID]
Total Bayar: [TOTAL]
Metode Pembayaran: [METHOD]

[Bukti Transfer]
```

---

## BAB IX: STRUKTUR DATA

### 9.1 LocalStorage Keys

| Key | Fungsi |
|-----|--------|
| perfume_products | Data produk |
| perfume_categories | Kategori (Pria/Wanita/Unisex) |
| perfume_cart | Keranjang user |
| perfume_orders | Semua pesanan |
| perfume_users | Data user terdaftar |
| perfume_current_user | User yang sedang login |
| perfume_payment_settings | Setting pembayaran |

### 9.2 Format Produk

```json
{
  "id": 1,
  "name": "Dior Sauvage",
  "brand": "Dior",
  "categoryId": 1,
  "description": "Parfum iconic...",
  "image": "https://...",
  "type": "decant",
  "prices": {
    "2": 35000,
    "5": 75000,
    "10": 140000
  },
  "notes": {
    "top": "Bergamot",
    "middle": "Lavender, Pepper",
    "base": "Ambroxan, Cedarwood"
  }
}
```

### 9.3 Format Order

```json
{
  "id": "1234567890",
  "customer": {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "081234567890",
    "address": "Jl. Sudirman No. 1"
  },
  "items": [
    {
      "productId": 1,
      "productName": "Dior Sauvage",
      "productImage": "https://...",
      "brand": "Dior",
      "type": "decant",
      "size": 5,
      "price": 75000,
      "quantity": 2
    }
  ],
  "payment": "bank",
  "status": "menunggu",
  "date": "2026-02-13T10:30:00.000Z",
  "total": 150000
}
```

### 9.4 Format Payment Settings

```json
{
  "bank": [
    {
      "id": "bca",
      "name": "BCA",
      "accountNumber": "1234567890",
      "accountName": "Your.i Scent Official"
    }
  ],
  "ewallet": [
    { "id": "dana", "name": "DANA", "number": "081234567890" }
  ],
  "qris": {
    "enabled": true,
    "merchantName": "Your.i Scent"
  },
  "whatsappAdmin": "6281234567890"
}
```

---

## BAB X: SISTEM PEMESANAN

### 10.1 Alur Pemesanan

```
User Browse Products
        │
        ▼
   Add to Cart
        │
        ▼
   View Cart
        │
        ▼
   Update Quantity
        │
        ▼
   Checkout
        │
        ▼
   Fill Form Data
        │
        ▼
   Select Payment Method
        │
        ▼
   Create Order
        │
        ▼
   Order Saved (Menunggu)
        │
        ▼
   Admin Update Status
        │
        ▼
   Customer View Status
```

### 10.2 Status Pesanan

| Status | Keterangan |
|--------|------------|
| Menunggu | Menunggu konfirmasi pembayaran |
| Diproses | Pembayaran dikonfirmasi, sedang disiapkan |
| Dikirim | Sedang dalam pengiriman |
| Selesai | Pesanan selesai |
| Dibatalkan | Pesanan dibatalkan |

---

## BAB XI: PANDUAN MENJALANKAN

### 11.1 Instalasi

```bash
# Clone/repo
cd perfume-decant-simple

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

### 11.2 Akses Aplikasi

```
Development: http://localhost:5173
Production:  folder /dist
```

### 11.3 Login Admin

```
Username: admin
Password: admin123
```

---

## BAB XII: FLOW DIAGRAM

### 12.1 Customer Flow

```
┌─────────────────────────────────────────────────────────┐
│                     HOME PAGE                            │
│              /catalog /product/:id                       │
└────────────────────┬────────────────────────────────────┘
                     │
          ┌─────────┴─────────┐
          ▼                   ▼
    ┌─────────┐        ┌─────────────┐
    │ Catalog │───────►│ ProductDetail│
    └─────────┘        └──────┬──────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              ┌─────────┐         ┌──────────┐
              │   Cart  │◄────────│Add to Cart│
              └────┬────┘         └───────────┘
                   │
                   ▼
            ┌──────────────┐
            │   Checkout   │
            └──────┬───────┘
                   │
                   ▼
         ┌─────────────────────┐
         │  Create Order       │
         │  (Menunggu)         │
         └─────────┬───────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │   WhatsApp Confirm  │
         └─────────┬───────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │      ACCOUNT        │
         │  (View Order Status)│
         └─────────────────────┘
```

### 12.2 Admin Flow

```
                    ┌──────────────┐
                    │   DASHBOARD  │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  ┌────────────┐   ┌─────────────┐   ┌──────────────────┐
  │  PRODUCTS   │   │   ORDERS   │   │  PAYMENT SETTINGS│
  │  (CRUD)    │   │  (Manage)  │   │  (Edit)          │
  └────────────┘   └─────────────┘   └──────────────────┘
```

---

## BAB XIII: KESIMPULAN

### 13.1 Kelebihan Sistem

1. **User Interface yang Clean** - Desain minimalis dengan tema soft yellow
2. **Mudah Digunakan** - Navigasi intuitif
3. **Responsif** - Mobile-friendly
4. **Tanpa Backend** - Tidak perlu server/database
5. **Integrasi WhatsApp** - Konfirmasi pembayaran praktis

### 13.2 Kekurangan

1. **Data Per Device** - LocalStorage tidak sync antar device
2. **Single Admin** - Tidak support multi-admin
3. **Tanpa Payment Gateway** - Konfirmasi manual via WhatsApp
4. **Limitasi Storage** - LocalStorage max 5MB

### 13.3 Saran Pengembangan

1. **Backend Integration** - Node.js/Python dengan database (PostgreSQL/MongoDB)
2. **Payment Gateway** - Midtrans/Xendit
3. **Multi-user Admin** - Role-based access
4. **Image Upload** - Cloudinary/AWS S3
5. **Real-time Sync** - WebSocket untuk update status
6. **Analytics** - Google Analytics

---

## LAMPIRAN: INFORMASI TOKO

### Lokasi
**Toko:** Tambak Boyo, Sleman, DIY

**Alamat Pickup:**
```
6CW6+783, Gg. Parikesit, Dero, Condongcatur,
Kec. Depok, Kabupaten Sleman,
Daerah Istimewa Yogyakarta 55281
```

### Jam Operasional

| Hari | Jam |
|------|-----|
| Senin - Jumat | 16.30 - 18.00 |
| Sabtu - Minggu | 06.30 - 09.00 & 16.30 - 18.00 |

### Kontak

| Media | Info |
|-------|------|
| WhatsApp | 081234567890 |
| Email | youriscent@gmail.com |
| Instagram | @your.i_scent |

---

*Dokumen ini dibuat untuk keperluan skripsi Sistem Informasi*
*Februari 2026*
