# Dokumentasi Alur Website your.i scent

## 1. Arsitektur Aplikasi

### 1.1 Teknologi yang Digunakan
- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context (CartContext) + localStorage
- **Routing**: React Router DOM v6
- **Notifications**: SweetAlert2
- **Storage**: localStorage (Browser)

### 1.2 Struktur Folder
```
src/
├── admin/              # Halaman Admin
│   ├── Dashboard.jsx
│   ├── Orders.jsx
│   ├── PaymentSettings.jsx
│   └── Products.jsx
├── components/          # Komponen Reusable
├── context/            # React Context
│   └── CartContext.jsx
├── data/               # Data Default
├── hooks/              # Custom Hooks
├── pages/              # Halaman Customer
├── utils/              # Utility Functions
│   ├── alerts.js       # SweetAlert2 wrappers
│   └── storage.js      # localStorage handlers
├── App.jsx
└── main.jsx
```

---

## 2. Alur Pengguna (User Flow)

### 2.1 Landing Page → Beli Produk

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE (/)                            │
│                         your.i scent                                │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              ┌──────────┐   ┌──────────┐   ┌──────────┐
              │ KATALOG  │   │  TENTANG  │   │  KONTAK  │
              │ /catalog │   │ /tentang  │   │ /kontak  │
              └────┬─────┘   └──────────┘   └──────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  FILTER & SEARCH     │
        │  - Jenis Produk      │
        │  - Kategori          │
        │  - Brand             │
        │  - Sort (A-Z/Harga)  │
        └──────────┬───────────┘
                   │
                   ▼
         ┌────────────────────┐
         │  DETAIL PRODUK     │
         │  /product/:id      │
         └──────────┬─────────┘
                    │
                    ▼
         ┌────────────────────┐
         │  Tambah ke         │
         │  KERANJANG         │
         │  (CartContext)     │
         └──────────┬─────────┘
                    │
                    ▼
         ┌────────────────────┐
         │     KERANJANG      │
         │     /cart          │
         └──────────┬─────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    ┌──────────┐        ┌──────────┐
    │ LIHAT     │        │ CHECKOUT │
    │ KATALOG   │        │ /checkout│
    └──────────┘        └────┬─────┘
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
             ┌───────────┐     ┌───────────┐
             │ SUDAH     │     │ BELUM     │
             │ LOGIN     │     │ LOGIN     │
             └─────┬─────┘     └─────┬─────┘
                   │                  │
                   ▼                  ▼
            ┌──────────────────────────┐
            │     CHECKOUT FORM        │
            │  - Pilih Metode Bayar    │
            │  - Input Data Pengiriman │
            │  - Buat Pesanan          │
            └────────────┬─────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   PESANAN TERSIMPAN    │
            │   (localStorage)       │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  KONFIRMASI WHATSAPP  │
            │  (Buka wa.me)         │
            └────────────────────────┘
```

### 2.2 Alur Checkout Detail

```
┌─────────────────────────────────────────────────────────────────┐
│                         CHECKOUT (/checkout)                    │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LANGKAH 1: PILIH PEMBAYARAN                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   BANK      │  │  E-WALLET   │  │     COD     │            │
│  │ Transfer    │  │  (OVO/DANA) │  │ Bayar di    │            │
│  │             │  │             │  │ Tempat      │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                  │
│  → Tampilkan nomor rekening / e-wallet yang sudah disetel admin │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LANGKAH 2: INPUT DATA PENGIRIMAN              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  □ Nama Lengkap                                                 │
│  □ Email                                                         │
│  □ No. WhatsApp                                                 │
│  □ Alamat Lengkap                                               │
│                                                                  │
│  [    BUAT PESANAN    ]                                          │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LANGKAH 3: KONFIRMASI                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✓ Pesanan berhasil dibuat!                                     │
│  ✓ ID Pesanan: ORD-xxxxxxxx                                     │
│  ✓ Total: Rp xxx.xxx                                            │
│  ✓ Metode: Transfer Bank/E-Wallet/COD                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              NOMOR REKENING / E-WALLET                       │ │
│  │                                                             │ │
│  │  Bank BCA 123456789 (John Doe)                             │ │
│  │  DANA 081234567890 (John Doe)                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [   💬 KONFIRMASI PEMBAYARAN VIA WHATSAPP   ]                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    KONFIRMASI WHATSAPP                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Membuka wa.me/628xxxxx dengan pesan:                          │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  Halo Admin your.i scent,                                       │
│                                                                  │
│  Saya sudah melakukan pemesanan.                               │
│                                                                  │
│  ID Pesanan: ORD-xxxxxxxx                                      │
│  Nama: John Doe                                                 │
│  No HP: 08xxxxxxxxxx                                            │
│  Alamat: Jl. xxx No.xx, Kota                                   │
│  Metode Pembayaran: Transfer Bank                              │
│  Total: Rp xxx.xxx                                              │
│                                                                  │
│  Saya akan kirim bukti transfer ya. Terima kasih               │
│  ─────────────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Alur Admin

### 3.1 Login Admin

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOGIN (/login)                          │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │   INPUT CREDENTIALS      │
                    │   Username: yori         │
                    │   Password: lemineral    │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   VALIDASI (storage.js)  │
                    │   loginUser()           │
                    └───────────┬─────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              ▼                                   ▼
    ┌─────────────────┐                 ┌─────────────────┐
    │   ROLE: ADMIN   │                 │   ROLE: USER    │
    └────────┬────────┘                 └────────┬────────┘
             │                                   │
             ▼                                   ▼
    ┌─────────────────┐                 ┌─────────────────┐
    │ Redirect ke     │                 │ Redirect ke     │
    │ /admin          │                 │ /               │
    └─────────────────┘                 └─────────────────┘
```

### 3.2 Dashboard Admin

```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD ADMIN (/admin)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │  PRODUK     │ │  MENUNGGU    │ │  SELESAI     │           │
│  │    10       │ │      5       │ │      12      │           │
│  │   produk    │ │   pesanan    │ │   pesanan    │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  [📦 KELOLA PRODUK]  [📋 KELOLA PESANAN]  [💳 PENGATURAN BAYAR]│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Kelola Produk (/admin/produk)

```
┌─────────────────────────────────────────────────────────────────┐
│              KELOLA PRODUK (/admin/produk)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [+ TAMBAH PRODUK]                    [🔍 Cari produk...]        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Gambar │ Nama      │ Jenis  │ Brand │ Harga  │ Stok │Edit│  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  img   │ Sauvage   │DECANT  │ Dior  │35.000  │ 10   │ ✏️│  │
│  │  img   │ Aventus   │DECANT  │ Creed │65.000  │  3   │ ✏️│  │
│  │  img   │ Dylan Blue│PRELOV  │ Versa │350.000 │  2   │ ✏️│  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  MODAL TAMBAH/EDIT PRODUK:                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 📷 Upload Foto / URL Gambar                              │  │
│  │                                                            │  │
│  │ Nama Produk    : [________________]                       │  │
│  │ Brand          : [________________]                       │  │
│  │ Jenis          : [Decant ▼]                               │  │
│  │ Kategori       : [Pria ▼]                                 │  │
│  │ Deskripsi      : [________________]                       │  │
│  │                                                            │  │
│  │ FRAGRANCE NOTES:                                          │  │
│  │ Top Notes     : [________________]                        │  │
│  │ Middle Notes  : [________________]                        │  │
│  │ Base Notes    : [________________]                         │  │
│  │                                                            │  │
│  │ HARGA PER UKURAN: (jika Decant)                           │  │
│  │ 2ml: [35000]  5ml: [75000]  10ml: [140000]               │  │
│  │                                                            │  │
│  │ STOK: [10]                                                 │  │
│  │                                                            │  │
│  │ [BATAL]          [SIMPAN]                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Kelola Pesanan (/admin/pesanan)

```
┌─────────────────────────────────────────────────────────────────┐
│              KELOLA PESANAN (/admin/pesanan)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Filter: [Semua ▼]  [Menunggu]  [Diproses]  [Selesai]          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ ID         │ Pelanggan   │ Total    │ Status   │ Aksi    │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ ORD-xxx1   │ John Doe    │ Rp 140rb │ 🟡Menung│ [▼] [🗑]│  │
│  │ ORD-xxx2   │ Jane Smith  │ Rp 350rb │ 🔵Dipros│ [▼] [🗑]│  │
│  │ ORD-xxx3   │ Bob Wilson  │ Rp 75rb  │ 🟢Seles │ [▼] [🗑]│  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  UPDATE STATUS:                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ ORD-xxx1 - John Doe                                     │    │
│  │                                                          │    │
│  │ Status: [Menunggu ▼]                                    │    │
│  │          ○ Menunggu                                      │    │
│  │          ● Diproses                                      │    │
│  │          ○ Selesai                                       │    │
│  │                                                          │    │
│  │  [UPDATE STATUS]  [HAPUS PESANAN]                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 3.5 Pengaturan Pembayaran (/admin/pembayaran)

```
┌─────────────────────────────────────────────────────────────────┐
│         PENGATURAN PEMBAYARAN (/admin/pembayaran)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🏦 REKENING BANK                                    [+Tambah]│
│  │ ┌────────────────────────────────────────────────────────┐ │  │
│  │ │ BCA - 1234567890 - John Doe              [✏️] [🗑️]  │ │  │
│  │ │ Mandiri - 9876543210 - John Doe            [✏️] [🗑️]  │ │  │
│  │ └────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 📱 E-WALLET                                        [+Tambah]│
│  │ ┌────────────────────────────────────────────────────────┐ │  │
│  │ │ DANA - 081234567890                          [✏️] [🗑️] │ │  │
│  │ │ OVO - 089876543210                          [✏️] [🗑️]  │ │  │
│  │ └────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 📲 WHATSAPP ADMIN                                          │  │
│  │                                                            │  │
│  │ Nomor WA: [6281234567890]  [SIMPAN]                        │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Struktur Data (localStorage)

### 4.1 Produk
```javascript
{
  id: 1,
  name: "Dior Sauvage",
  brand: "Dior",
  categoryId: 1,           // 1=Pria, 2=Wanita, 3=Unisex
  description: "Parfum iconic...",
  image: "https://...",
  type: "decant",          // decant | preloved | bnib
  prices: {                // untuk type "decant"
    "2": 35000,
    "5": 75000,
    "10": 140000
  },
  price: 0,                // untuk type "preloved" & "bnib"
  quantity: 10,
  notes: {
    top: "Bergamot",
    middle: "Lavender",
    base: "Ambroxan"
  }
}
```

### 4.2 Pesanan
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
      id: 1234567890,
      productId: 1,
      productName: "Dior Sauvage",
      brand: "Dior",
      type: "decant",
      size: 10,
      price: 140000,
      quantity: 1
    }
  ],
  total: 140000,
  payment: "bank",         // bank | ewallet | cod
  status: "menunggu",      // menunggu | diproses | selesai
  date: "2024-01-01T00:00:00.000Z"
}
```

### 4.3 User
```javascript
{
  id: 1704067200000,
  name: "John Doe",
  email: "john@email.com",
  password: "encrypted_password",
  role: "user"            // user | admin
}
```

---

## 5. Route Protection

| Route | Kondisi | Redirect |
|-------|---------|----------|
| `/admin/*` | Belum login admin | `/login` |
| `/akun` | Belum login | `/login` |
| `/checkout` | Belum login | `/login` |
| `/cart` | - | - |

---

## 6. Ringkasan Fitur

### 6.1 Fitur Customer
- [x] Lihat katalog produk
- [x] Filter produk (jenis, kategori, brand)
- [x] Sortir produk (A-Z, harga)
- [x] Pencarian produk
- [x] Lihat detail produk + fragrance notes
- [x] Tambah ke keranjang
- [x] Edit quantity keranjang
- [x] Hapus item keranjang
- [x] Checkout dengan 3 metode bayar
- [x] Konfirmasi via WhatsApp
- [x] Register & Login