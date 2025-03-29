import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../../interface/products";
import { useNavigate } from "react-router-dom";

interface CartItem extends IProduct {
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string; // Thêm trạng thái đơn hàng
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkout: () => void;
  orders: Order[];
  updateOrderStatus: (orderId: string, status: string) => void;
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
  const navigate = useNavigate(); // Di chuyển vào trong component
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      const fetchCartFromServer = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/cart/${user.id}`);
          setCart(response.data || []);
          localStorage.setItem("cart", JSON.stringify(response.data || []));
        } catch (error) {
          console.error("Lỗi khi tải giỏ hàng từ server:", error);
        }
      };

      const fetchOrdersFromServer = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/orders?userId=${user.id}`);
          setOrders(response.data || []);
        } catch (error) {
          console.error("Lỗi khi tải đơn hàng từ server:", error);
        }
      };

      fetchCartFromServer();
      fetchOrdersFromServer();
    }
  }, [user]);

  const updateCartOnServer = async (cart: CartItem[]) => {
    if (user) {
      try {
        await axios.put(`http://localhost:3000/cart/${user.id}`, cart);
      } catch (error) {
        console.error("Lỗi cập nhật giỏ hàng trên server:", error);
      }
    }
  };

  const setCartAndSave = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCartOnServer(newCart);
  };

  const addToCart = (product: IProduct, quantity: number) => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      setCartAndSave(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      setCartAndSave(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    updateCartOnServer([]);
  };

  const checkout = async () => {
    if (!user || cart.length === 0) {
      alert("Bạn cần đăng nhập và có sản phẩm trong giỏ hàng để thanh toán.");
      return;
    }

    const order: Order = {
      id: `${Date.now()}`,
      userId: user.id,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await axios.post(`http://localhost:3000/orders`, order);
      setOrders((prevOrders) => [...prevOrders, order]);
      clearCart();
      alert("Thanh toán thành công! Đơn hàng của bạn đã được lưu.");
      navigate("/orders"); // Chuyển hướng đến trang quản lý đơn hàng
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
      alert("Đã xảy ra lỗi khi xử lý thanh toán.");
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, checkout, orders, updateOrderStatus }}
    >
      {children}
    </CartContext.Provider>
  );
};
