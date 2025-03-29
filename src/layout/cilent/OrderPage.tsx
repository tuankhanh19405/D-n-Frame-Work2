import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  date: string;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/orders/${user.id}`).then((res) => {
        setOrders(res.data || []);
      }).catch(err => console.error("Lỗi tải đơn hàng:", err));
    }
  }, [user]);

  return (
    <div>
      <h2>Đơn hàng của bạn</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Mã đơn: {order.id}</strong> - Ngày: {new Date(order.date).toLocaleString()} - Tổng: {order.total} đ
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>{item.name} x {item.quantity} - {item.price} đ</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
