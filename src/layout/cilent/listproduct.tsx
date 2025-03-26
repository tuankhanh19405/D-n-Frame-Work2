import React, { useEffect, useState } from "react";
import { IProduct } from "../../interface/products";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

type Props = {};

const List: React.FC<Props> = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const {id} = useParams();


  useEffect(() => {
    // console.log("Category ID:", id); // Debug xem id có bị undefined không

  if (!id) return; // Nếu id không tồn tại, không gọi API
    const get_Products = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products?category_id=${id}`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_Products();
  }, [id]);

  return (
    <div>
      <div className="relative h-[100px] bg-gradient-to-r  from-grey-200 to-grey-100">
        <div className="bottom-0 right-0 w-200 h-300 object-cover">
          <h2 className="font-bold pt-8 pl-[150px] text-2xl">
            Töpfe & Behälter
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="min-h-screen bg-header">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3 grid grid-cols-3 gap-6 ">
              {products.map((product) => (
                <div key={product.id  } className="relative group overflow-hidden w-[250px] h-[400px]">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                               bg-blue-500 text-white px-4 py-2 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))}
            </div>
            <div className="col-span-1 p-6 rounded-md bg-white shadow-md flex justify-center">
              <img
                src="/path-to-your-perfume-image.jpg"
                alt="Hình ảnh nước hoa"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 🌟 Newsletter Section */}
      <div className="w-full flex justify-center px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#3b4a38]">
            Etwas abonnieren <span className="text-3xl">*</span>
          </h2>
          <h2 className="text-4xl font-bold text-[#3b4a38]">
            <span className="text-3xl">_</span> Unser Newsletter
          </h2>
          <p className="text-gray-600 mt-4">
            Get weekly updates about our product on your email, no spam
            guaranteed we promise ✌️
          </p>
          <div className="mt-6 flex justify-center items-center">
            <div className="flex items-center bg-white shadow-md rounded-md overflow-hidden w-full max-w-xl">
              <input
                type="email"
                placeholder="youremail123@gmail.com"
                className="flex-1 py-3 px-4 text-gray-700 outline-none"
              />
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
