import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProductForm } from "../../interface/products";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../interface/api";

type ICategory = {
  id: number;
  name: string;
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IProductForm>();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    })();
  }, []);

  const onSubmit = async (data: IProductForm) => {
    try {
      const formattedData = {
        ...data,
        price: Number(data.price),
        category_id: Number(data.category_id),
      };

      console.log("Dữ liệu gửi lên:", formattedData);

      await axios.post(`http://localhost:3000/products`, formattedData);
      alert(`Thêm mới sản phẩm thành công!`);
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto py-12 px-6">
      <h1 className="text-center text-2xl font-bold mb-6">Thêm mới sản phẩm</h1>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white shadow-md rounded-md p-6 space-y-4"
      >
        {/* Tên sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Tên sản phẩm</label>
          <input 
            {...register("name", { required: true, minLength: 5 })} 
            type="text" 
            placeholder="Nhập tên sản phẩm" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
          {errors.name && <span className="text-red-500 text-sm">Tên sản phẩm phải có ít nhất 5 kí tự</span>}
        </div>

        {/* Ảnh sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Ảnh chính</label>
          <input 
            {...register("image", { required: true })} 
            type="text" 
            placeholder="Nhập URL ảnh chính" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
          {errors.image && <span className="text-red-500 text-sm">Vui lòng nhập ảnh chính</span>}
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh phụ 1</label>
          <input 
            {...register("image2")} 
            type="text" 
            placeholder="Nhập URL ảnh phụ (không bắt buộc)" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh phụ 2</label>
          <input 
            {...register("image3")} 
            type="text" 
            placeholder="Nhập URL ảnh phụ (không bắt buộc)" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        {/* Giá sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Giá sản phẩm</label>
          <input 
            {...register("price", { required: true, validate: value => !isNaN(Number(value)) })} 
            type="text" 
            placeholder="Nhập giá sản phẩm" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
          {errors.price && <span className="text-red-500 text-sm">Giá phải là số</span>}
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Mô tả ngắn</label>
          <textarea 
            {...register("description",)} 
            placeholder="Nhập mô tả ngắn" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
          {/* {errors.description && <span className="text-red-500 text-sm">Vui lòng nhập mô tả ngắn</span>} */}
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả chi tiết</label>
          <textarea 
            {...register("descriptionLong",)} 
            placeholder="Nhập mô tả chi tiết" 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
          {/* {errors.descriptionLong && <span className="text-red-500 text-sm">Vui lòng nhập mô tả chi tiết</span>} */}
        </div>

        {/* Select Box chọn danh mục */}
        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select 
            {...register("category_id", { required: true })} 
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <span className="text-red-500 text-sm">Vui lòng chọn danh mục</span>}
        </div>

        {/* Nút thêm mới */}
        <div className="flex justify-end">
          <button 
            className="w-full border border-black text-black py-2 rounded-md font-medium transition 
            hover:bg-black hover:text-white active:scale-95"
            type="submit"
          >
            Thêm sản phẩm
          </button> 
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
