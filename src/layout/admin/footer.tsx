import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Hasa. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AdminFooter;
