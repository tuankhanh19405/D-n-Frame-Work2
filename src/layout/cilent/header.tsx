import { useState, useEffect, useRef } from "react";
import { FaSearch, FaChevronDown, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";

const ClientHeader = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; id: number } | null>(null);
  const categoryTimeoutRef = useRef<any>(null);
  const accountTimeoutRef = useRef<any>(null);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);
  useEffect(() => {
    // Lấy danh mục sản phẩm từ JSON Server
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/categories");
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();

    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const { setCart } = useCart(); // ✅ Lấy setCart từ CartContext

  const handleLogout = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}"); // 🔹 Lưu user trước khi xóa
      if (user.id) {
          localStorage.removeItem(`cart_${user.id}`); // ✅ Xóa giỏ hàng của user
          alert("đăng xuất thành công")
      }
  
      localStorage.removeItem("user"); // ✅ Sau đó mới xóa user
  
      setCart([]); // ✅ Xóa giỏ hàng khỏi state
  };
  



  return (
    <header className="bg-gradient-to-br from-gray-500 to-gray-700 w-full relative z-10">
      {/* Menu Tìm Kiếm */}
      <div className="flex justify-center items-center h-[79px] relative">
        <div className="bg-white rounded-md flex items-center px-3 w-[525px] h-[42px]">
          <input
            type="search"
            placeholder="Nhập nội dung..."
            className="w-full h-full border-none outline-none px-2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <FaSearch className="text-gray-600" />
        </div>

        <div className="ml-5 text-white flex items-center gap-6">
          <span className="flex items-center cursor-pointer">
            En <FaChevronDown className="ml-1" />
          </span>

          {/* Dropdown Tài Khoản */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(accountTimeoutRef.current);
              setIsAccountOpen(true);
            }}
            onMouseLeave={() => {
              accountTimeoutRef.current = setTimeout(() => setIsAccountOpen(false), 150);
            }}
          >
            <span className="flex items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-200 transition-all text-white">
              <FaUser className="mr-1" />
              {user ? user.name : "Account"}
            </span>

            {isAccountOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                {user ? (
                  <>
                    <span className="block px-4 py-2 text-gray-700">Xin chào, {user.name}</span>
                    <Link to={`/user-detail/${user.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Xem tài khoản
                    </Link>

                    {/* Hiển thị nút Dashboard nếu user là admin */}
                    {user.role === "admin" && (
                      <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Quản trị viên
                      </Link>
                    )}

                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/dang-nhap" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Đăng nhập
                    </Link>
                    <Link to="/dang-ky" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="relative flex items-center cursor-pointer">
            <FaShoppingCart className="mr-1" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Menu Chính */}
      <nav className="flex justify-center gap-10 py-3 bg-gradient-to-br text-white text-lg z-0 relative">
        <Link to="/" className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black">
          Trang chủ
        </Link>

        {/* Dropdown Danh Mục */}
        <div
          className="relative"
          onMouseEnter={() => {
            clearTimeout(categoryTimeoutRef.current);
            setIsCategoryOpen(true);
          }}
          onMouseLeave={() => {
            categoryTimeoutRef.current = setTimeout(() => setIsCategoryOpen(false), 150);
          }}
        >
          <span className="flex items-center px-4 py-2 cursor-pointer hover:bg-white hover:text-black">
            Danh Mục Sản Phẩm
          </span>

          {isCategoryOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md  border border-gray-200 z-50">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  to={`/list-product/${category.id}`}
                  
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {category.name}
                </Link>
              ))}
              
            </div>
          )}
        </div>

        <Link to="/gioi-thieu" className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black">
          Giới thiệu
        </Link>
        <Link to="/lien-he" className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black">
          Liên hệ
        </Link>
      </nav>
    </header>
  );
};

export default ClientHeader;
function setCart(arg0: never[]) {
  throw new Error("Function not implemented.");
}

