import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IRegisterForm } from '../../interface/user';



const EditUser = () => {
  const { register, handleSubmit, reset } = useForm<IRegisterForm>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


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

 
  // Cập nhật thông tin người dùng
  const onSubmit = async (user: IRegisterForm) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
      alert('Cập nhật thông tin thành công');
      navigate(`/user-detail/${id}`);
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Tài khoản của bạn</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      

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

         
        </div>
      </div>
    </div>
  );
};

export default EditUser;