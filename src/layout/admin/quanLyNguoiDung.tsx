import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const User: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/users');
        const nonAdminUsers = data.filter((user: any) => user.role !== 'admin'); // Lọc bỏ admin
        setProducts(nonAdminUsers);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchData();
  }, []);
  

  const delProduct = async (id: number | string) => {
    try {
      if (confirm('Bạn chắc chắn muốn xóa?')) {
        await axios.delete(`http://localhost:3000/users/${id}`);
        alert('Xóa thành công');
        setProducts(prev => prev.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-center text-gray-800">DANH SÁCH NGƯỜI DÙNG</h1>
      </div>
      <div className="overflow-x-auto bg-white text-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-base text-left text-gray-700">
          <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border-b">#</th>
              <th className="px-6 py-3 border-b">Tên</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Số Điện Thoại</th>
              <th className="px-6 py-3 border-b">Action</th>
             
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
              
                <tr key={product.id} className="hover:bg-gray-100 transition-all text-center">
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                 
                  <td className="px-6 py-4 border-b font-medium text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 border-b font-medium text-gray-800">{product.email}</td>
                  <td className="px-6 py-4 border-b font-medium text-gray-800">{product.phone}</td>
                 
                  <td className="px-6 py-4 border-b flex justify-center space-x-2">
                    <button onClick={() => delProduct(product.id)} className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all">Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User; 