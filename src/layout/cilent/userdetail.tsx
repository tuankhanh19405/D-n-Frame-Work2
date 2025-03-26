import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IRegisterForm } from '../../interface/user';

interface IOrder {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  date: string;
}

const DetailUser = () => {
  const { register, handleSubmit, reset } = useForm<IRegisterForm>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<IOrder[]>([]); // State lưu danh sách đơn hàng

  // Lấy dữ liệu người dùng
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`);
        reset(data);
      } catch (error) {
        console.error('Lỗi khi tải thông tin tài khoản:', error);
      }
    })();
  }, [id, reset]);

  // Lấy danh sách đơn hàng (giả lập)
  useEffect(() => {
    // Giả sử đây là API, bạn đổi lại sau
    const fetchOrders = async () => {
      try {
        const fakeOrders = [
          {
            id: 1,
            orderNumber: '#1234',
            status: 'Đã giao',
            total: 500000,
            date: '2025-03-01',
          },
          {
            id: 2,
            orderNumber: '#1235',
            status: 'Đang xử lý',
            total: 300000,
            date: '2025-03-10',
          },
        ];
        setOrders(fakeOrders);
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
      }
    };
    fetchOrders();
  }, []);

  // Cập nhật thông tin người dùng
  const onSubmit = async (user: IRegisterForm) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
      alert('Cập nhật thông tin thành công');
      navigate('/');
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Tài khoản của bạn</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Menu */}
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4">Tài khoản</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="hover:text-green-700">Thông tin tài khoản</a></li>
              <li><a href="#" className="hover:text-green-700">Danh sách địa chỉ</a></li>
              <li><a href="#" className="hover:text-green-700">Đăng xuất</a></li>
            </ul>
          </div>
        </div>

        {/* Thông tin tài khoản */}
        <div className="md:col-span-2 space-y-10">
          <div className="border border-gray-300 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-6">Thông tin tài khoản</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-1">Họ và tên</label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Số điện thoại</label>
                <input
                  {...register('phone')}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Mật khẩu</label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                />
              </div>

              <div className="flex justify-end">
                <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
                  Cập nhật thông tin
                </button>
              </div>
            </form>
          </div>

          {/* Đơn hàng */}
          <div className="border border-gray-300 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-6">Đơn hàng của bạn</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <span>Mã đơn: {order.orderNumber}</span>
                      <span className="text-sm text-gray-600">{order.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trạng thái: {order.status}</span>
                      <span className="font-semibold">{order.total.toLocaleString()}đ</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Bạn chưa đặt mua sản phẩm.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
