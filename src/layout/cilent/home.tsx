import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interface/products';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bgImage from './img/Group 1000002255.png';


type Props = {};
type ICategory = {
  id: number | string;
  name: string;
  image: string;
};

const Home: React.FC<Props> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/categories');
        setCategories(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="bg-[#f8f6f2] w-full">
      {/* 🌟 Banner */}
      <div className="relative w-full h-[800px] bg-gradient-to-r from-green-200 to-green-100 flex items-center px-10"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
>
        
      </div>

      {/* 🌟 Best Sellers */}
      <div className="w-full px-6 mt-10">
        <h2 className="text-3xl text-lime-900 font-bold">List Product</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <Link to={`/client/product-detail/${product.id}`} className="block text-center mt-2 text-blue-500 hover:underline">
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 Featured Products */}
      {/* 🌟 Featured Products */}
<div className="w-full px-6 mt-10 text-center">
  <h2 className="text-3xl font-bold text-lime-900">Kategorien</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-w-5xl mx-auto">
    {categories.map((category) => (
      <div key={category.id} className="relative rounded-lg overflow-hidden">
        <img src={category.image} alt={category.name} className="w-full h-[250px] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <h3 className="text-white font-semibold">
            <Link to="/detail" className="hover:underline">{category.name}</Link>
          </h3>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* 🌟 Newsletter Section */}
      <div className="w-full flex justify-center px-6 mt-16">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-[#3b4a38]">Etwas abonnieren <span className="text-3xl">*</span></h2>
    <h2 className="text-4xl font-bold text-[#3b4a38]">
      <span className="text-3xl">_</span> Unser Newsletter
    </h2>
    <p className="text-gray-600 mt-4">
      Get weekly updates about our product on your email, no spam guaranteed we promise ✌️
    </p>
    <div className="mt-6 flex justify-center items-center">
      <div className="flex items-center bg-white shadow-md rounded-md overflow-hidden w-full max-w-xl">
        <input type="email" placeholder="youremail123@gmail.com" className="flex-1 py-3 px-4 text-gray-700 outline-none" />
      </div>
      <button className="ml-4 bg-[#3b4a38] text-white py-3 px-6 font-semibold rounded-md shadow-md hover:bg-[#2f3a2b]">
        ABONNIEREN
      </button>
    </div>
  </div>
</div>


      {/* 🌟 Footer Placeholder */}
      <div className="h-32"></div>
    </div>
  );
};

export default Home;
