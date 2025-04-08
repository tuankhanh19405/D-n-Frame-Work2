import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Kiểm tra nếu người dùng đã đăng nhập
    const userId = localStorage.getItem("userId"); // Giả sử userId lưu trữ trong localStorage
    if (userId) {
      // Gọi API để lấy giỏ hàng từ server
      fetch(`/api/cart/${userId}`)
        .then((response) => response.json())
        .then((data) => setCart(data))
        .catch((error) => console.error("Error loading cart:", error));
    } else {
      // Nếu chưa đăng nhập, lấy giỏ hàng từ localStorage
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && cart.length > 0) {
      // Gọi API để lưu giỏ hàng lên server khi có sự thay đổi
      fetch(`/api/cart/${userId}`, {
        method: "PUT", // Cập nhật giỏ hàng
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      })
        .then((response) => response.json())
        .catch((error) => console.error("Error saving cart:", error));
    } else if (cart.length > 0) {
      // Nếu chưa đăng nhập, lưu giỏ hàng vào localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }
    navigate("/checkout"); // Chuyển hướng đến trang thanh toán
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      alert("Số lượng phải lớn hơn 0!");
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h2>

      {cart.length === 0 ? (
        <p>
          Giỏ hàng trống.{' '}
          <Link to="/list-product" className="text-blue-600">
            Mua sắm ngay!
          </Link>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-4 bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="bg-gray-300 px-2 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-12 text-center border mx-2"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                          updateQuantity(item.id, value);
                        }
                      }}
                    />
                    <button
                      className="bg-gray-300 px-2 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 mt-2 hover:underline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6">
            Tổng tiền:{" "}
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </h3>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => window.location.href = "/"}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Tiếp tục mua sắm
            </button>

            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg ml-auto"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
