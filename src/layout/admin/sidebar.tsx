import React from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaBox } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className='w-64 h-screen bg-gray-900 text-white p-5 flex flex-col space-y-4'>
      <h2 className='text-2xl font-bold text-center border-b pb-3'>Admin Panel</h2>
      <nav className='flex flex-col space-y-2'>
        
        <Link to='/dashboard' className='flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700'>
          <FaBox />
          <span>Quản lý sản phẩm</span>
        </Link>
        <Link to='/dashboard/danhmuc' className='flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700'>
          <FaList />
          <span>Quản lý danh mục</span>
        </Link>
        <Link to='/dashboard/user' className='flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700'>
          <FaList />
          <span>Quản lý người dùng</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
