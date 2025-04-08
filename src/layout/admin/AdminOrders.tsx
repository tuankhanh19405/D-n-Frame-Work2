import React, { useState, useEffect } from "react";
import axios from "axios";

interface Order {
  id: string;
  user?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    province: string;
    district: string;
    note: string;
  };
  cartItems: {
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status });
      alert("Cập nhật trạng thái thành công!");
      
      const updatedOrders = await axios.get("http://localhost:3000/orders");
      setOrders(updatedOrders.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      alert("Cập nhật trạng thái thất bại!");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quản lý Đơn Hàng</h2>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : orders.length === 0 ? (
          <p>Không có đơn hàng nào.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    {order.user?.fullName || "Không có thông tin"}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : order.status === "Processed"
                        ? "bg-blue-500 text-white"
                        : order.status === "Shipped"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.user && (
                  <div className="mb-4">
                    <strong>Email:</strong> {order.user.email}
                    <br />
                    <strong>Số điện thoại:</strong> {order.user.phone}
                    <br />
                    <strong>Địa chỉ:</strong> {order.user.address}, {order.user.district}, {order.user.province}
                    <br />
                    <strong>Ghi chú:</strong> {order.user.note}
                  </div>
                )}

                {order.cartItems && order.cartItems.length > 0 && (
                  <div className="mb-4">
                    <strong>Chi tiết đơn hàng:</strong>
                    <ul className="space-y-2 mt-2">
                      {order.cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>{item.price.toLocaleString("vi-VN")} VND</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-red-500">
                    Tổng cộng: {order.totalAmount?.toLocaleString("vi-VN") || "0"} VND
                  </span>

                  <div className="space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handleUpdateOrderStatus(order.id, "Đã xử lý")}
                    >
                      Xử lý
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => handleUpdateOrderStatus(order.id, "Đã giao thành công")}
                    >
                      Đã giao
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleUpdateOrderStatus(order.id, "Hủy đơn hàng")}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
