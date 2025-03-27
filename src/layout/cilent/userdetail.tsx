import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IOrder {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  date: string;
}

const DetailUser = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(data);
      } catch (error) {
        console.error('Lỗi khi tải thông tin tài khoản:', error);
      }
    })();
  }, [id]);

  useEffect(() => {
    setOrders([]); // Hiện không có đơn hàng nào
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">THÔNG TIN TÀI KHOẢN</h1>
      <p className="text-lg font-semibold">Xin chào, {user?.name || 'Người dùng'}</p>

      <div className="mt-6 flex justify-between p-4 bg-gray-100 rounded">
        <div>
          <h2 className="text-lg font-bold">Tài khoản của tôi</h2>
          <p className="text-gray-700">Tên tài khoản: <span className="font-semibold">{user?.name}</span></p>
          <p className="text-gray-700">Email: <span className="font-semibold">{user?.email}</span></p>
          <p className="text-gray-700">Số điện thoại <span className="font-semibold">{user?.phone}</span></p>
        </div>
        <button 
      onClick={() => navigate(`/user-edit/${user.id}`)} 
      className="border border-black text-black py-2 px-6 rounded-sm hover:bg-black hover:text-white transition-colors duration-300 h:50"
      >
      Chỉnh sửa tài khoản
    </button>
      </div>

      <div className="mt-6 p-4">
        <h2 className="text-lg font-bold mb-2">Đơn hàng gần nhất</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Đơn hàng</th>
              <th className="p-2">Ngày</th>
              <th className="p-2">Chuyển đến</th>
              <th className="p-2">Địa chỉ</th>
              <th className="p-2">Giá trị đơn hàng</th>
              <th className="p-2">Tình trạng thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.id}>
                  <td className="p-2">{order.orderNumber}</td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">---</td>
                  <td className="p-2">---</td>
                  <td className="p-2">{order.total.toLocaleString()}đ</td>
                  <td className="p-2">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-2 text-center">Không có đơn hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailUser;
