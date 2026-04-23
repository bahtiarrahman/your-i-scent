# 📋 Catatan Menjalankan Project your.i scent

## 1. Menjalankan Development Server

```bash
cd /Users/mac/Documents/skripsi/perfume-decant-simple

npm run dev
```

Akan muncul:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

Buka browser → `http://localhost:5173`

---

## 2. Build untuk Production

```bash
cd /Users/mac/Documents/skripsi/perfume-decant-simple

npm run build
```

Output ada di folder `dist/`

---

## 3. Preview Build Production (Local)

```bash
cd /Users/mac/Documents/skripsi/perfume-decant-simple

npm run preview
```

---

## 4. Credential Login

### Admin
```
Username: yori
Password: lemineral
URL: http://localhost:5173/admin
```

### User
```
Register manual di halaman /register
```

---

## 5. Struktur Route Penting

| Halaman | URL |
|---------|-----|
| Beranda | `/` |
| Katalog | `/catalog` |
| Detail Produk | `/product/:id` |
| Keranjang | `/cart` |
| Checkout | `/checkout` |
| Login | `/login` |
| Register | `/register` |
| Akun Saya | `/akun` |

### Admin Routes
| Halaman | URL |
|---------|-----|
| Dashboard Admin | `/admin` |
| Kelola Produk | `/admin/produk` |
| Kelola Pesanan | `/admin/pesanan` |
| Pengaturan Bayar | `/admin/pembayaran` |

---

## 6. Deploy ke Vercel

```bash
# 1. Push ke GitHub
git add .
git commit -m "update project"
git push

# 2. Di Vercel Dashboard:
#    - Import project dari GitHub
#    - Framework: Vite
#    - Build Command: npm run build
#    - Output Directory: dist

# 3. Setelah push ulang ke GitHub, Vercel auto-deploy
```

File `vercel.json` sudah ditambahkan untuk handle SPA routing.

---

## 7. Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Check for updates (optional)
npm outdated
```

---

## 8. Teknologi yang Dipakai

| Teknologi | Version |
|----------|--------|
| React | 18.2.0 |
| Vite | 5.0.0 |
| React Router DOM | 6.20.0 |
| Tailwind CSS | 3.4.1 |
| SweetAlert2 | 11.26.18 |
| Lucide React (Icons) | 0.563.0 |

---

## 9. Struktur Folder Penting

```
perfume-decant-simple/
├── src/
│   ├── admin/           # Halaman Admin
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── PaymentSettings.jsx
│   │   └── Products.jsx
│   ├── pages/           # Halaman Customer
│   │   ├── Catalog.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── components/      # Komponen Reusable
│   ├── context/         # CartContext.jsx
│   ├── hooks/           # useProducts.js
│   ├── utils/           # storage.js, alerts.js
│   ├── App.jsx
│   └── main.jsx
├── vercel.json         # Config Vercel
├── vite.config.js      # Config Vite
└── package.json
```

---

## 10. Reset Data (Optional)

Jika ingin reset ke data default, buka browser console:

```javascript
localStorage.clear()
```

Atau hapus manual di DevTools:
1. Press `F12` → Application → Local Storage
2. Klik kanan → Clear

---

## 11. Troubleshooting

### Error: Port 5173 already in use
```bash
# Kill process di port tersebut
lsof -ti:5173 | xargs kill -9

# Atau jalankan di port lain
npm run dev -- --port 3000
```

### Error: Module not found
```bash
npm install
```

### Build failed
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 12. Preview Link Vercel (Contoh)

```
https://your-i-scent.vercel.app
```

*(Sesuaikan dengan URL project kamu di Vercel Dashboard)*

---

**Catatan:** Data tersimpan di localStorage browser. Setiap browser/device punya data sendiri-sendiri.
