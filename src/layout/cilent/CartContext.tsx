import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IProduct } from "../../interface/products";

interface CartItem extends IProduct {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void; // ✅ Thêm setCart
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng từ localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IProduct, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
  
};
