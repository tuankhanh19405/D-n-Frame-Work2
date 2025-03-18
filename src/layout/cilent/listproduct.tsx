import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interface/products';
import axios from 'axios';
import { Link } from 'react-router-dom';


type Props = {};
type ICategory = {
  id: number | string;
  name: string;
  image: string;
};

const List: React.FC<Props> = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(number | string)[]>([]);

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
    const get_Products = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_Products();
  }, []);

  const handleCategoryChange = (category_id: number | string) => {
    setSelectedCategories((prev) =>
      prev.includes(category_id) ? prev.filter((id) => id !== category_id) : [...prev, category_id]
    );
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product.category_id))
    : products;

  return (
    <div>
     
      <div className="relative h-[100px] bg-gradient-to-r  from-green-200 to-green-100">
        <div className="bottom-0 right-0 w-200 h-300 object-cover">
          <h2 className="font-bold pt-8 pl-[150px] text-2xl">Töpfe & Behälter</h2>
        </div>
      </div>
      <div className="p-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[90px]">
            <div className="bg-green-200 pl-6 pt-2 rounded-lg h-20 w-150 shadow-md text-center">
              <div className="flex items-center space-x-2">
                <img
                  // src={a}
                  alt="Sản phẩm 4"
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
                <span className="text-lg font-medium">Eckige Töpfe</span>
              </div>
            </div>
            <div className="bg-green-200 pl-6 pt-2 rounded-lg h-20 w-150 shadow-md text-center">
              <div className="flex items-center space-x-2">
                <img
                  // src={b}
                  alt="Sản phẩm 4"
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
                <span className="text-lg font-medium">Pflanzschalen</span>
              </div>
            </div>
            <div className="bg-green-200 pl-6 pt-2 rounded-lg h-20 w-150 shadow-md text-center">
              <div className="flex items-center space-x-2">
                <img
                  // src={c}
                  alt="Sản phẩm 4"
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
                <span className="text-lg font-medium">Runde Töpfe</span>
              </div>
            </div>
            <div className="bg-green-200 pl-6 pt-2 rounded-lg h-20 w-150 shadow-md text-center">
              <div className="flex items-center space-x-2">
                <img
                  // src={a}
                  alt="Sản phẩm 4"
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
                <span className="text-lg font-medium">Untersetzer</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="pl-[75px] pt-[80px] flex items-center space-x-4">
        <div className="pl-[100px] flex items-center space-x-2">
          <label htmlFor="sort-by" className="text-gray-700 font-medium text-xl">
            Sort By:
          </label>
          <select
            id="sort-by"
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="newest">Newest</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="show" className="text-gray-700 font-medium text-xl">
            Show:
          </label>
          <select
            id="show"
            className="border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="default">Default</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="min-h-screen bg-header">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3 grid grid-cols-3 gap-6 ">
              {filteredProducts.map((product, index) => (
                <div key={index} className="p-3 bg-white h-[330px] rounded-md shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[250px] mx-auto mt-2 h-[200px] object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2 text-center">{product.name}</h3>
                  <p className="text-gray-600 text-center">${product.price}</p>
                  <div className=" mt-2">
                    <Link
                      className="mx-auto bg-green-400 ml-10 text-white px-3 py-1 rounded text-l"
                      to={`/client/product-detail/${product.id}`}
                    >
                      Chi tiết sản phẩm
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1 p-6 rounded-md bg-white shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Kategorien</h2>
              <div>

                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex text-xl items-center space-x-2">
                      <input type="checkbox" className="form-checkbox text-green-600" checked={selectedCategories.includes(category.id)} onChange={() => handleCategoryChange(category.id)} />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-center my-6">
                <img
                  // src={abcImage}
                  alt="Lọc sản phẩm"
                  className="w-80 h-100 object-cover rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="font-medium text-2xl">Filter By Price</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full mt-2 accent-green-700"
                />
                <div className="flex justify-between text-m text-gray-600">
                  <span>From $0 to $8000</span>
                </div>
                <div className="pt-5">
                  <label className="font-medium text-2xl">Filter By Size:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full mt-2 accent-green-700"
                  />
                  <div className="flex justify-between text-m text-gray-600">
                    <span>2 mm by 50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default List;