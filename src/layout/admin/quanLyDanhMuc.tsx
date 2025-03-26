import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../interface/products";

const DanhMucDB = () => {
    const [products, setProduct] = useState<IProduct[]>([]);

    useEffect(() => {
      const get_products = async () => {
        const {data} = await axios.get('http://localhost:3000/categories');
        setProduct(data);
      };
      get_products();
    }, []);
  
    const removeProduct = async (id: number | string) => {
      try {
        if (confirm('Bạn chắc chứ?')) {
          await axios.delete(`http://localhost:3000/categories/${id}`);
          const newProduct = products.filter(item => item.id !== id);
          setProduct(newProduct);
          alert('Xoá thành công!');
        }
      } catch (error) {
        alert('Xoá thất bại!');
      }
    };
    
    return (
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-extrabold text-center text-gray-800">DANH SÁCH DANH MỤC</h1>
            <Link to="/dashboard/danhmuc-add" className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all">Thêm</Link>
          </div>
          <div className="overflow-x-auto bg-white text-gray-800 shadow-lg rounded-lg">
            <table className="min-w-full table-auto text-base text-left text-gray-700">
              <thead className="bg-gray-800 text-white text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 border-b">#</th>
                  <th className="px-6 py-3 border-b">Tên danh mục</th>
                  <th className="px-6 py-3 border-b">Hình ảnh</th>
                  <th className="px-6 py-3 border-b">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100 transition-all">
                    <td className="px-6 py-4 border-b">{index + 1}</td>
                    <td className="px-6 py-4 border-b font-medium text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/>
                    </td>
                    <td className="px-6 py-4 border-b">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => removeProduct(item.id)} 
                          className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all">Xoá
                        </button>
                        <Link to={`/dashboard/danhmuc-edit/${item.id}`} className="text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all">Sửa</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
}
  
export default DanhMucDB