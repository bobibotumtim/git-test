import { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === dish.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== dishId)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalValue = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const value = {
    cartItems,
    totalItems,
    totalValue,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
