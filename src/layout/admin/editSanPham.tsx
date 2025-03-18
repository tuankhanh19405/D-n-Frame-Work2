import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IProductForm } from '../../interface/products';

type ICategory = {
  id: number;
  name: string;
};

const EditProduct = () => {
  const { register, handleSubmit, reset, watch } = useForm<IProductForm>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Lấy danh sách danh mục
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/categories');
        setCategories(data);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    })();
  }, []);

  // Lấy dữ liệu sản phẩm theo ID
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        reset({
          ...data,
          category_id: String(data.category_id), // Đảm bảo giá trị phù hợp với React Select
        });
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    })();
  }, [id, reset]);

  // Gửi dữ liệu cập nhật
  const onSubmit = async (product: IProductForm) => {
    try {
      const formattedData = {
        ...product,
        price: Number(product.price), // Ép kiểu giá thành số
        category_id: Number(product.category_id), // Ép kiểu danh mục thành số
      };

      console.log("Dữ liệu gửi lên:", formattedData);

      await axios.put(`http://localhost:3000/products/${id}`, formattedData);
      alert('Cập nhật thành công');
      navigate('/dashboard');
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="font-bold text-2xl text-center">Cập nhật sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        {/* Tên sản phẩm */}
        <input {...register('name', { required: true })} type="text" placeholder="Tên sản phẩm" className="border py-1 px-3" />

        {/* Ảnh sản phẩm */}
        <input {...register('image')} type="text" placeholder="Ảnh sản phẩm" className="border py-1 px-3" />
        {watch('image') && <img src={watch('image')} alt="Preview" className="w-32 h-32 object-cover mt-2" />}

        <input {...register('image2')} type="text" placeholder="Ảnh phụ 1" className="border py-1 px-3" />
        {watch('image2') && <img src={watch('image2')} alt="Preview" className="w-32 h-32 object-cover mt-2" />}

        <input {...register('image3')} type="text" placeholder="Ảnh phụ 2" className="border py-1 px-3" />
        {watch('image3') && <img src={watch('image3')} alt="Preview" className="w-32 h-32 object-cover mt-2" />}

        {/* Giá sản phẩm */}
        <input {...register('price', { required: true, valueAsNumber: true })} type="number" placeholder="Giá sản phẩm" className="border py-1 px-3" />

        {/* Mô tả ngắn */}
        <textarea {...register('description')} placeholder="Mô tả ngắn" className="border py-1 px-3"></textarea>

        {/* Mô tả dài */}
        <textarea {...register('descriptionLong')} placeholder="Mô tả chi tiết" className="border py-1 px-3"></textarea>

        {/* Chọn danh mục */}
        <select {...register('category_id', { required: true })} className="border py-1 px-3">
          <option value="">-- Chọn danh mục --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Nút cập nhật */}
        <div className="flex justify-end">
          <button className="bg-green-900 text-white py-1 px-4 rounded">Cập nhật sản phẩm</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
