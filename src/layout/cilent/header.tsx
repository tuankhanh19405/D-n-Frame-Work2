import { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ClientHeader = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleAccountMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsAccountOpen(true);
  };

  const handleAccountMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsAccountOpen(false);
    }, 150);
  };

  return (
    <header className="bg-gradient-to-br from-gray-500 to-gray-700 w-full relative z-10">
      {/* Menu 1 */}
      <div className="flex justify-center items-center h-[79px] relative">
        <div className="bg-white rounded-md flex items-center px-3 w-[525px] h-[42px]">
          <input
            type="search"
            placeholder="Nhập nội dung..."
            className="w-full h-full border-none outline-none px-2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="text-gray-600" />
        </div>

        <div className="ml-5 text-white flex items-center gap-6">
          <span className="flex items-center cursor-pointer">
            En <FaChevronDown className="ml-1" />
          </span>

          {/* Account Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleAccountMouseEnter}
            onMouseLeave={handleAccountMouseLeave}
          >
            <span className="flex items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-200 transition-all text-white">
              <FaUser className="mr-1" />
              {user ? user.name : "Account"}
            </span>

            {isAccountOpen && (
              <div
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
                onMouseEnter={handleAccountMouseEnter}
                onMouseLeave={handleAccountMouseLeave}
              >
                {user ? (
                  <>
                    <span className="block px-4 py-2 text-gray-700">
                      Xin chào, {user.name}
                    </span>

                    <Link
                      to={`/user-detail/${user.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Xem tài khoản
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dang-nhap"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/dang-ky"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <span className="flex items-center cursor-pointer">
            <FaShoppingCart className="mr-1" />
            Cart
          </span>
        </div>
      </div>

      {/* Menu 2 */}
      <nav className="flex justify-center gap-10 py-3 bg-gradient-to-br  text-white text-lg z-0 relative">
        <Link
          to="/"
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black"
        >
          Trang chủ
        </Link>
        <Link
          to="/gioi-thieu"
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black"
        >
          Giới thiệu
        </Link>
        <Link
          to="/lien-he"
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black"
        >
          Liên hệ
        </Link>
        
        <Link
          to="/lien-he"
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-white hover:text-black"
        >
          Danh Mục Sản Phẩm
        </Link>
      </nav>
    </header>
  );
};

export default ClientHeader;
