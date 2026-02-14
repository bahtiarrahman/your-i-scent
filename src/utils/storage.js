// Storage utility for managing LocalStorage data
import { defaultPaymentSettings } from '../data/paymentSettings';

const STORAGE_KEYS = {
  PRODUCTS: 'perfume_products',
  CATEGORIES: 'perfume_categories',
  ORDERS: 'perfume_orders',
  CART: 'perfume_cart',
  USERS: 'perfume_users',
  CURRENT_USER: 'perfume_current_user',
  PAYMENT_SETTINGS: 'perfume_payment_settings'
};

// Initial data
const initialCategories = [
  { id: 1, name: 'Pria' },
  { id: 2, name: 'Wanita' },
  { id: 3, name: 'Unisex' }
];

const initialProducts = [
  // Decant Products
  {
    id: 1,
    name: 'Dior Sauvage',
    brand: 'Dior',
    categoryId: 1,
    description: 'Parfum iconic dengan aroma segar dan maskulin. Cocok untuk pria modern.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
    type: 'decant',
    prices: {
      "2": 35000,
      "5": 75000,
      "10": 140000
    },
    quantity: 10
  },
  {
    id: 2,
    name: 'Chanel Bleu de Chanel',
    brand: 'Chanel',
    categoryId: 1,
    description: 'Aroma woody dan aromatik yang elegan. Sangat cocok untuk acara formal.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    type: 'decant',
    prices: {
      "2": 45000,
      "5": 95000,
      "10": 180000
    },
    quantity: 8
  },
  {
    id: 3,
    name: 'Tom Ford Black Orchid',
    brand: 'Tom Ford',
    categoryId: 2,
    description: 'Parfum mewah dengan notes floral dan truffle hitam. Mysteriouse dan memukau.',
    image: 'https://images.unsplash.com/photo-1585232569525-f087bd9dae8e?w=400',
    type: 'decant',
    prices: {
      "2": 55000,
      "5": 115000,
      "10": 215000
    },
    quantity: 5
  },
  {
    id: 4,
    name: 'YSL Black Opium',
    brand: 'YSL',
    categoryId: 2,
    description: 'Aroma manis dengan coffee notes. Glamorous dan feminin.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    type: 'decant',
    prices: {
      "2": 40000,
      "5": 85000,
      "10": 160000
    },
    quantity: 12
  },
  {
    id: 5,
    name: 'Creed Aventus',
    brand: 'Creed',
    categoryId: 1,
    description: 'Legendary fragrance dengan notes fruity dan woody. Symbol of success.',
    image: 'https://images.unsplash.com/photo-1595425970339-27414395c085?w=400',
    type: 'decant',
    prices: {
      "2": 65000,
      "5": 135000,
      "10": 255000
    },
    quantity: 3
  },
  {
    id: 6,
    name: 'Jo Malone Wood Sage & Sea Salt',
    brand: 'Jo Malone',
    categoryId: 3,
    description: 'Fresh dan clean dengan notes sea salt dan sage. Sangat versatile.',
    image: 'https://images.unsplash.com/photo-1595425970339-27414395c085?w=400',
    type: 'decant',
    prices: {
      "2": 50000,
      "5": 105000,
      "10": 195000
    },
    quantity: 7
  },
  // Preloved Products
  {
    id: 7,
    name: 'Versace Dylan Blue',
    brand: 'Versace',
    categoryId: 1,
    description: 'Parfum preloved kondisi 90% masih penuh. Aroma fresh citrus yang cocok untuk daily use.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    type: 'preloved',
    price: 350000,
    quantity: 2
  },
  {
    id: 8,
    name: 'Gucci Bloom',
    brand: 'Gucci',
    categoryId: 2,
    description: 'Parfum preloved kondisi 85% masih penuh. Aroma floral yang elegant dan feminine.',
    image: 'https://images.unsplash.com/photo-1585232569525-f087bd9dae8e?w=400',
    type: 'preloved',
    price: 400000,
    quantity: 1
  },
  // BNIB Products
  {
    id: 9,
    name: 'Dior Fahrenheit',
    brand: 'Dior',
    categoryId: 1,
    description: 'BNIB - Brand New In Box. Parfum klasik pria dengan signature floral notes.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
    type: 'bnib',
    price: 1650000,
    quantity: 4
  },
  {
    id: 10,
    name: 'Chanel Coco Mademoiselle',
    brand: 'Chanel',
    categoryId: 2,
    description: 'BNIB - Brand New In Box. Eau de Parfum dengan notes orange, patchouli, dan rose.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    type: 'bnib',
    price: 2100000,
    quantity: 6
  }
];

// Initialize storage with default data
export const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CART)) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(null));
  }
  initPaymentSettings();
};

// Payment Settings
export const initPaymentSettings = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PAYMENT_SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_SETTINGS, JSON.stringify(defaultPaymentSettings));
  }
};

export const getPaymentSettings = () => {
  const settings = localStorage.getItem(STORAGE_KEYS.PAYMENT_SETTINGS);
  return settings ? JSON.parse(settings) : defaultPaymentSettings;
};

export const savePaymentSettings = (data) => {
  localStorage.setItem(STORAGE_KEYS.PAYMENT_SETTINGS, JSON.stringify(data));
};

// Bank Account CRUD
export const addBankAccount = (bankObj) => {
  const settings = getPaymentSettings();
  const newBank = {
    id: bankObj.id || `bank_${Date.now()}`,
    name: bankObj.name,
    accountNumber: bankObj.accountNumber,
    accountName: bankObj.accountName
  };
  settings.bank.push(newBank);
  savePaymentSettings(settings);
  return settings;
};

export const updateBankAccount = (id, updates) => {
  const settings = getPaymentSettings();
  const bankIndex = settings.bank.findIndex(b => b.id === id);
  if (bankIndex !== -1) {
    settings.bank[bankIndex] = { ...settings.bank[bankIndex], ...updates };
    savePaymentSettings(settings);
  }
  return settings;
};

export const deleteBankAccount = (id) => {
  const settings = getPaymentSettings();
  settings.bank = settings.bank.filter(b => b.id !== id);
  savePaymentSettings(settings);
  return settings;
};

// E-Wallet CRUD
export const addEwalletAccount = (ewalletObj) => {
  const settings = getPaymentSettings();
  const newEwallet = {
    id: ewalletObj.id || `ewallet_${Date.now()}`,
    name: ewalletObj.name,
    number: ewalletObj.number
  };
  settings.ewallet.push(newEwallet);
  savePaymentSettings(settings);
  return settings;
};

export const updateEwalletAccount = (id, updates) => {
  const settings = getPaymentSettings();
  const ewalletIndex = settings.ewallet.findIndex(e => e.id === id);
  if (ewalletIndex !== -1) {
    settings.ewallet[ewalletIndex] = { ...settings.ewallet[ewalletIndex], ...updates };
    savePaymentSettings(settings);
  }
  return settings;
};

export const deleteEwalletAccount = (id) => {
  const settings = getPaymentSettings();
  settings.ewallet = settings.ewallet.filter(e => e.id !== id);
  savePaymentSettings(settings);
  return settings;
};

// QRIS Settings
export const updateQrisSettings = (updates) => {
  const settings = getPaymentSettings();
  settings.qris = { ...settings.qris, ...updates };
  savePaymentSettings(settings);
  return settings;
};

export const updateWhatsAppAdmin = (number) => {
  const settings = getPaymentSettings();
  settings.whatsappAdmin = number;
  savePaymentSettings(settings);
  return settings;
};

// Products
export const getProducts = () => {
  const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (products) {
    const parsedProducts = JSON.parse(products);
    // Add notes and quantity fallback for existing products
    return parsedProducts.map(p => ({
      ...p,
      notes: p.notes || { top: '', middle: '', base: '' },
      quantity: p.quantity !== undefined ? p.quantity : 1
    }));
  }
  return initialProducts;
};

export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

// Categories
export const getCategories = () => {
  const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return categories ? JSON.parse(categories) : initialCategories;
};

// Orders
export const getOrders = () => {
  const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getOrdersByUser = (email) => {
  const orders = getOrders();
  if (!email) return [];
  
  return orders.filter(order => {
    // Support multiple email field formats
    const orderEmail = 
      order.customer?.email || 
      order.customerEmail || 
      order.userEmail || 
      order.email ||
      null;
    
    return orderEmail === email;
  }).reverse();
};

export const updateOrderStatus = (orderId, newStatus) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return orders[orderIndex];
  }
  return null;
};

export const deleteOrder = (orderId) => {
  const orders = getOrders();
  const filteredOrders = orders.filter(order => order.id !== orderId);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filteredOrders));
  return filteredOrders;
};

// Cart
export const getCart = () => {
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
};

// Users Management
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const registerUser = (userData) => {
  const users = getUsers();

  // Check if email already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    return { success: false, message: 'Email sudah terdaftar!' };
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Registrasi berhasil!', user: newUser };
};

export const loginUser = (identifier, password) => {
  // Check for admin login
  if (identifier === 'yori' && password === 'lemineral') {
    const adminUser = {
      id: 0,
      name: 'Administrator',
      email: 'admin@youriscent.com',
      role: 'admin'
    };
    setCurrentUser(adminUser);
    return { success: true, role: 'admin', user: adminUser };
  }

  // Check regular users
  const users = getUsers();
  const user = users.find(u => (u.email === identifier || u.name === identifier) && u.password === password);

  if (user) {
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: 'user'
    };
    setCurrentUser(sessionUser);
    return { success: true, role: 'user', user: sessionUser };
  }

  return { success: false, message: 'Email/Password salah!' };
};

// Current User Session
export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(null));
};

export const isLoggedIn = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) !== null : false;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};
