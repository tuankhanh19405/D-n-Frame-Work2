import React from 'react';

const AdminHeader = () => {
  return (
    <header className='bg-gray-900 text-white w-full shadow-md flex p-4 relative z-50'>
        <div className='logo w-1/5 text-xl font-bold'>khanhptph49306@</div>
        <div className='right-header w-4/5 flex justify-between items-center'>
            <form>
                <input className='border rounded-md w-[350px] px-2 py-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600' type='text' placeholder='Tìm kiếm'/>
            </form>
            <ul className='flex items-center space-x-4'>
                <li className='text-sm font-medium'>Xin chào admin</li>
            </ul>
        </div>
    </header>
  );
}

export default AdminHeader;
