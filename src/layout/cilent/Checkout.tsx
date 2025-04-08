import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const provinces = [
  { name: "Hà Nội", districts: ["Ba Đình", "Hoàn Kiếm", "Sơn Tây"] },
  { name: "Hồ Chí Minh", districts: ["Quận 1", "Quận 2", "Quận 3"] },
];

const SHIPPING_FEE = 30000;
const DISCOUNT_AMOUNT = 100000;

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [note, setNote] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          console.warn("Dữ liệu cart không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi phân tích dữ liệu cart:", error);
      }
    }
  }, []);

  const subtotal = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  const total = subtotal + SHIPPING_FEE - (discountApplied ? DISCOUNT_AMOUNT : 0);

  const validateForm = () => {
    if (!email || !fullName || !phone || !address || !province || !district) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return false;
    }
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    const orderData = {
      user: { email, fullName, phone, address, province, district, note },
      cartItems: cart,
      totalAmount: total,
    };
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/orders", orderData);
      alert("Đặt hàng thành công!");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (err) {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const applyDiscount = () => {
    if (discountCode === "GIAM100") {
      setDiscountApplied(true);
    } else {
      alert("Mã không hợp lệ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/49/Sephora_logo.svg"
            alt="Logo"
            className="h-10 mb-6"
          />
          <h2 className="text-xl font-bold mb-4">Thông tin nhận hàng</h2>
          <div className="space-y-4">
            <input className={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={input} placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input className={input} placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className={input} placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
            <select className={input} value={province} onChange={(e) => setProvince(e.target.value)}>
              <option value="">Tỉnh thành</option>
              {provinces.map(p => <option key={p.name}>{p.name}</option>)}
            </select>
            <select className={input} value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!province}>
              <option value="">Quận huyện</option>
              {provinces.find(p => p.name === province)?.districts.map(d => <option key={d}>{d}</option>)}
            </select>
            <textarea className={input} placeholder="Ghi chú (tùy chọn)" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Thanh toán</h3>
            <label className="flex items-center space-x-2">
              <input type="radio" checked readOnly className="accent-blue-500" />
              <span>Thanh toán khi giao hàng (COD)</span>
            </label>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Đơn hàng ({cart.length} sản phẩm)</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">x{item.quantity}</p>
              </div>
              <span>{((item.price || 0) * (item.quantity || 0)).toLocaleString("vi-VN")}₫</span>
            </div>
          ))}

          <div className="flex mt-4 space-x-2">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={applyDiscount} className="bg-blue-500 text-white px-4 rounded">
              Áp dụng
            </button>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString("vi-VN")}₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>{SHIPPING_FEE.toLocaleString("vi-VN")}₫</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá</span>
                <span>-{DISCOUNT_AMOUNT.toLocaleString("vi-VN")}₫</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span className="text-red-600">{total.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Link to="/cart" className="text-blue-600 text-sm hover:underline">
              Quay về giỏ hàng
            </Link>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              {loading ? "Đang xử lý..." : "ĐẶT HÀNG"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

// Tailwind helper class
const input = "border border-gray-300 bg-white px-4 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
