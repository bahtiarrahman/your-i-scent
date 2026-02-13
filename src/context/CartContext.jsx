import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, saveCart } from '../utils/storage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCart(cart);
    }
  }, [cart, isLoaded]);

  const addToCart = (product, size, quantity = 1, price = null) => {
    setCart(prevCart => {
      // For non-decant products, size is null, so we match by productId only
      const existingItem = size 
        ? prevCart.find(item => item.productId === product.id && item.size === size)
        : prevCart.find(item => item.productId === product.id);

      if (existingItem) {
        return prevCart.map(item => {
          if (size) {
            return item.productId === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item;
          } else {
            return item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item;
          }
        });
      }

      // Calculate price for decant or non-decant
      let itemPrice;
      if (price !== null) {
        itemPrice = price;
      } else if (size) {
        // Support both new (prices object) and old (sizes array) formats
        const prices = product.prices || {};
        const sizesArray = product.sizes || [];
        itemPrice = prices[String(size)] || sizesArray.find(s => s.size === size)?.price || 0;
      } else {
        itemPrice = product.price || 0;
      }

      return [...prevCart, {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        brand: product.brand,
        type: product.type,
        size,
        price: itemPrice,
        quantity
      }];
    });
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === cartId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
