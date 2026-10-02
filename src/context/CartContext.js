'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'lucky_sushi_cart_v1';
const MIN_DELIVERY_TL = 399;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart, isLoaded]);

  // Add item or increment
  const addToCart = useCallback((item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...prev, { item, quantity }];
    });
  }, []);

  // Decrease quantity or remove if reaches 0
  const removeFromCart = useCallback((itemId) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === itemId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((entry) => entry.item.id !== itemId);
      }
      return prev.map((entry) =>
        entry.item.id === itemId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      );
    });
  }, []);

  // Set exact quantity
  const updateQuantity = useCallback((itemId, qty) => {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((entry) => entry.item.id !== itemId);
      }
      return prev.map((entry) =>
        entry.item.id === itemId ? { ...entry, quantity: qty } : entry
      );
    });
  }, []);

  // Delete item completely from cart
  const deleteItem = useCallback((itemId) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== itemId));
  }, []);

  // Clear all
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Get single item quantity
  const getItemQuantity = useCallback(
    (itemId) => {
      const found = cart.find((entry) => entry.item.id === itemId);
      return found ? found.quantity : 0;
    },
    [cart]
  );

  // Total items count
  const cartCount = useMemo(() => {
    return cart.reduce((total, entry) => total + entry.quantity, 0);
  }, [cart]);

  // Subtotal in TL
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, entry) => sum + (entry.item.price || 0) * entry.quantity, 0);
  }, [cart]);

  const isMinDeliveryReached = cartSubtotal >= MIN_DELIVERY_TL;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        deleteItem,
        clearCart,
        getItemQuantity,
        cartCount,
        cartSubtotal,
        isMinDeliveryReached,
        minDeliveryTl: MIN_DELIVERY_TL,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
