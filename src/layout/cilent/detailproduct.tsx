import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../../interface/products";
import { useCart } from "./CartContext";
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(data);
        setSelectedImage(data.image); // Ảnh mặc định là ảnh chính
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  interface RatingProps {
    rating: number;
    count: number;
  }
  
  const ratings: RatingProps[] = [
    { rating: 1, count: 38 },
    { rating: 2, count: 25 },
    { rating: 3, count: 50 },
    { rating: 4, count: 75 },
    { rating: 5, count: 200 },
  ];
  
  const totalReviews = ratings.reduce((sum, r) => sum + r.count, 0);

  if (loading) return <p className="text-center text-lg font-semibold">Đang tải...</p>;
  if (!product) return <p className="text-center text-red-500">Không tìm thấy sản phẩm!</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img
            src={selectedImage || product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          {/* Ảnh thu nhỏ */}
          <div className="flex gap-2 mt-4">
            {[product.image,product.image2, product.image3 ] 
            // product.image2, product.image3
              .filter((img) => img) // Loại bỏ ảnh null
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`w-20 h-20 rounded-md cursor-pointer hover:ring-2 ${
                    selectedImage === img ? "ring-gray-600" : "ring-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          {/* Giá sản phẩm */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-green-600">${product.price}</span>
            {product.oldPrice && (
              <span className="text-red-500 text-xl line-through">${product.oldPrice}</span>
            )}
            {product.discount && (
              <span className="bg-red-200 text-red-700 px-2 py-1 rounded-md text-sm">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Chọn số lượng */}
         
          <div className="flex items-center gap-4">
  <button 
    className="px-3 py-2 bg-gray-200 rounded"
    onClick={() => setQuantity(Math.max(1, quantity - 1))}
  >
    -
  </button>
  <span className="text-lg font-semibold">{quantity}</span>
  <button 
    className="px-3 py-2 bg-gray-200 rounded"
    onClick={() => setQuantity(quantity + 1)}
  >
    +
  </button>
</div>

<button 
  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
  onClick={() => {
    const user = localStorage.getItem("user"); 
if (!user) {
  alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
  window.location.href = "/dang-nhap"; 
  return;
}

    if (product) {
      console.log("🛍 Đang thêm vào giỏ hàng:", product, quantity);

      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity || 1, 
      });

      alert("Sản phẩm đã được thêm vào giỏ hàng! 🛒");
    }
  }}
>
  Thêm vào giỏ hàng
</button>


        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Mô tả sản phẩm</h2>
        <p className="text-gray-600 mt-2">{product.descriptionLong || "Không có mô tả chi tiết."}</p>
      </div>

      {/* Đánh giá sản phẩm */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Đánh giá</h2>
        <div className="mt-4 flex items-center">
          <span className="text-yellow-400 text-2xl">★★★★★</span>
          {/* <span className="ml-2 text-gray-700">{product.rating || "5.0"} (386 đánh giá)</span> */}
        </div>
      </div>


       <div className="w-full max-w-md mx-auto p-4 ">
      <div className="flex items-center space-x-2">
        <div className="flex text-yellow-500 text-2xl">
          {Array(5).fill("★").map((star, i) => (
            <span key={i}>{star}</span>
          ))}
        </div>
        <span className="text-green-600 text-2xl font-bold">5.0</span>
        <span className="text-gray-500">({totalReviews})</span>
      </div>
      <div className="mt-4 space-y-2">
        {ratings.map(({ rating, count }) => (
          <div key={rating} className="flex items-center">
            <span className="w-6 text-right">{rating}★</span>
            <div className="flex-1 bg-gray-200 h-2 mx-2 rounded-full">
              <div
                className="bg-gray-500 h-2 rounded-full"
                style={{ width: `${(count / totalReviews) * 100}%` }}
              ></div>
            </div>
            <span className="w-12 text-right">({count})</span>
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

export default ProductDetail;
