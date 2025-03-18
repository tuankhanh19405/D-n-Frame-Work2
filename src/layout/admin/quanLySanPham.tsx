import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get('http://localhost:3000/products'),
          axios.get('http://localhost:3000/categories')
        ]);
        setProducts(productRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchData();
  }, []);

  const delProduct = async (id: number | string) => {
    try {
      if (confirm('Bạn chắc chắn muốn xóa?')) {
        await axios.delete(`http://localhost:3000/products/${id}`);
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
        <h1 className="text-2xl font-extrabold text-center text-gray-800">DANH SÁCH SẢN PHẨM</h1>
        <Link to="/product-add" className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all">+ Thêm sản phẩm</Link>
      </div>
      <div className="overflow-x-auto bg-white text-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-base text-left text-gray-700">
          <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border-b">#</th>
              <th className="px-6 py-3 border-b">Ảnh</th>
              <th className="px-6 py-3 border-b">Tên sản phẩm</th>
              <th className="px-6 py-3 border-b">Giá tiền</th>
              <th className="px-6 py-3 border-b">Danh mục</th>
              <th className="px-6 py-3 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-100 transition-all text-center">
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                  <td className="px-6 py-4 border-b">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover mx-auto"/>
                  </td>
                  <td className="px-6 py-4 border-b font-medium text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 border-b text-red-600 font-semibold">{product.price?.toLocaleString()} đ</td>
                  <td className="px-6 py-4 border-b text-blue-500 font-semibold">
                    {categories.find((category) => category.id === product.category_id)?.name || 'Không có'}
                  </td>
                  <td className="px-6 py-4 border-b flex justify-center space-x-2">
                    <Link to={`/product-edit/${product.id}`} className="text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all">Sửa</Link>
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

export default Home;
