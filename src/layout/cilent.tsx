import ClientFooter from './cilent/footer';
import ClientHeader from './cilent/header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const ClientLayout = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Lưu từ khóa tìm kiếm

  // Hàm cập nhật từ khóa tìm kiếm
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <main className="bg-[#f6f9ff] min-h-screen flex flex-col">
      {/* Truyền handleSearch vào ClientHeader */}
      <ClientHeader onSearch={handleSearch} />

      {/* Truyền searchTerm xuống Outlet để các trang con có thể sử dụng */}
      <div className="flex-grow w-full">
        <Outlet context={{ searchTerm }} />
      </div>

      <ClientFooter />
    </main>
  );
};

export default ClientLayout;
