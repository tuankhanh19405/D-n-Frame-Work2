import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load giỏ hàng từ localStorage khi trang load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const storedCart = localStorage.getItem("cart");

    if (user) {
        axios.get(`http://localhost:3000/cart/${user.id}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    localStorage.setItem('cart', JSON.stringify(res.data));
                    setCart(res.data);
                } else if (storedCart) {
                    setCart(JSON.parse(storedCart));
                } else {
                    setCart([]);
                }
            })
            .catch(err => {
                console.error("Lỗi lấy giỏ hàng:", err);
                if (storedCart) {
                    setCart(JSON.parse(storedCart));
                }
            });
    } else {
        setCart(storedCart ? JSON.parse(storedCart) : []);
    }
}, []);



  // Hàm cập nhật giỏ hàng và lưu vào localStorage
  const setCartAndSave = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCartAndSave(updatedCart);
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      alert("Số lượng phải lớn hơn 0!");
      return;
    }
    setCartAndSave(
      cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h2>

      {cart.length === 0 ? (
        <p>
          Giỏ hàng trống.{" "}
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
                        if (value >= 1) {
                          updateQuantity(item.id, value);
                        } else {
                          alert("Số lượng phải lớn hơn 0!");
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

          {cart.length > 0 && (
            <h3 className="text-xl font-semibold mt-6">
              Tổng tiền:{" "}
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h3>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={() => window.location.href = "/"}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Tiếp tục mua sắm
            </button>

            <button
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
