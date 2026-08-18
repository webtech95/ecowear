import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  // ------- cart state (localStorage backed) -------
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ------- derived state -------
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // ------- drawer state (for slide‑out cart) -------
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // ------- notification state -------
  const [notification, setNotification] = useState(null);
  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // ------- cart actions (all memoized with useCallback) -------
  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
        );

        let updatedCart;
        if (existingIndex !== -1) {
          updatedCart = [...prev];
          updatedCart[existingIndex].quantity += 1;
        } else {
          updatedCart = [...prev, { ...product, quantity: 1 }];
        }
        return updatedCart;
      });
      showNotification(`${product.name} added to cart`);
    },
    [showNotification]
  );

  const updateQuantity = useCallback(
    (id, size, color, quantity) => {
      if (quantity < 1) return;
      setCart((prev) =>
        prev.map((item) =>
          item.id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const removeFromCart = useCallback(
    (id, size, color, productName) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedSize === size &&
              item.selectedColor === color
            )
        )
      );
      if (productName) showNotification(`${productName} removed`);
    },
    [showNotification]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    showNotification("Cart cleared");
  }, [showNotification]);

  // ------- provider value -------
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
      // drawer controls
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      // notification
      notification,
      setNotification,
    }),
    [
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      notification,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;