import { useState } from "react";
import { FaSearch, FaChevronDown, FaUser, FaShoppingCart } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const ClientHeader = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="bg-gradient-to-br from-green-800 to-gray-400 h-[175px] w-full">
      {/* Menu 1 */}
      <div className="flex justify-center items-center h-[79px]">
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
          <span className="flex items-center cursor-pointer">En <FaChevronDown className="ml-1" /></span>

          {/* Account Dropdown (Fix lỗi mất ngay khi hover) */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAccountOpen(true)}
            onMouseLeave={() => setIsAccountOpen(false)}
          >
            <span className="flex items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-200 transition-all text-white">
              <FaUser className="mr-1" />
              Account
            </span>

            {isAccountOpen && (
              <div 
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200"
                onMouseEnter={() => setIsAccountOpen(true)} // Giữ dropdown mở khi hover vào
                onMouseLeave={() => setIsAccountOpen(false)} // Đóng khi rời khỏi dropdown
              >
                <Link to="/client/dang-nhap" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Đăng nhập</Link>
                <Link to="/client/dang-ky" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Đăng ký</Link>
              </div>
            )}
          </div>

          <span className="flex items-center cursor-pointer"><FaShoppingCart className="mr-1" />Cart</span>
        </div>
      </div>
      <hr className="border-gray-300" />

      {/* Menu 2 */}
      <nav className="flex justify-center items-center h-[80px]">
        <ul className="flex gap-4 text-white">
          {[
            "Beleuchtung",
            "Growbox",
            "Dünger",
            "Töpfe & Behälter",
            "Bewässerung",
            "Pflanzen & Gärtnern",
            "Lüftung & Klimaanlage",
          ].map((item) => (
            <li key={item} className="px-4 py-2 cursor-pointer hover:bg-gray-300 hover:text-red-600">
              {item} <FaChevronDown className="inline ml-1" />
            </li>
          ))}
          <li
            className="relative px-4 py-2 cursor-pointer hover:bg-gray-300 hover:text-red-600"
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            Erde & Substrate <FaChevronDown className="inline ml-1" />
            {showSubmenu && (
              <ul className="absolute left-0 top-full bg-gray-700 text-white p-2 w-[200px] opacity-100 transition-opacity">
                {["Blumenerde", "Kokos Substrate", "Hydroponische Medien"].map((sub) => (
                  <li key={sub} className="px-4 py-2 hover:bg-gray-500">{sub}</li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ClientHeader;
