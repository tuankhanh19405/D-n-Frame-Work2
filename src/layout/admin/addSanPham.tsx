import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProductForm } from '../../interface/products';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../interface/api';

type ICategory = {
  id: number; // Đảm bảo id là number thay vì string
  name: string;
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IProductForm>();

  const [categories, setCategories] = useState<ICategory[]>([]);

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    })();
  }, []);

  const onSubmit = async (data: IProductForm) => {
    try {
      const formattedData = {
        ...data,
        price: Number(data.price), // Ép kiểu giá thành số
        category_id: Number(data.category_id), // Ép kiểu danh mục thành số
      };

      console.log("Dữ liệu gửi lên:", formattedData);

      await axios.post(`http://localhost:3000/products`, formattedData);
      alert(`Thêm mới sản phẩm thành công!`);
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="font-bold text-2xl text-center">Thêm mới sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        {/* Nhập tên sản phẩm */}
        <input {...register('name', { required: true, minLength: 5 })} type="text" placeholder="Tên sản phẩm" className="border py-1 px-3" />
        {errors.name && <span className="text-red-600 text-sm">Tên sản phẩm phải có ít nhất 5 kí tự</span>}

        {/* Nhập ảnh sản phẩm */}
        <input {...register('image', { required: true })} type="text" placeholder="Ảnh chính" className="border py-1 px-3" />
        <input {...register('image2')} type="text" placeholder="Ảnh phụ 1 (không bắt buộc)" className="border py-1 px-3" />
        <input {...register('image3')} type="text" placeholder="Ảnh phụ 2 (không bắt buộc)" className="border py-1 px-3" />
        {errors.image && <span className="text-red-600 text-sm">Vui lòng nhập ảnh chính</span>}

        {/* Nhập giá sản phẩm */}
        <input {...register('price', { required: true, validate: (value) => !isNaN(Number(value)) })} type="text" placeholder="Giá sản phẩm" className="border py-1 px-3" />
        {errors.price && <span className="text-red-600 text-sm">Giá phải là số</span>}

        {/* Mô tả sản phẩm */}
        <textarea {...register('description', { required: true })} placeholder="Mô tả ngắn" className="border py-1 px-3"></textarea>
        {errors.description && <span className="text-red-600 text-sm">Vui lòng nhập mô tả ngắn</span>}

        <textarea {...register('descriptionLong', { required: true })} placeholder="Mô tả chi tiết" className="border py-1 px-3"></textarea>
        {errors.descriptionLong && <span className="text-red-600 text-sm">Vui lòng nhập mô tả chi tiết</span>}

        {/* Select Box chọn danh mục */}
        <select {...register('category_id', { required: true })} className="border py-1 px-3">
          <option value="">-- Chọn danh mục --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}> {/* Chuyển thành string để React không cảnh báo */}
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && <span className="text-red-600 text-sm">Vui lòng chọn danh mục</span>}

        {/* Nút submit */}
        <div className="flex justify-end">
          <button className="bg-green-900 text-white py-1 px-4 rounded" type="submit">
            Thêm mới sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
