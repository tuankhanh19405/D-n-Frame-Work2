import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProductForm } from "../../interface/products";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../interface/api";

type Props = {
  onAdd: (data: FormData) => void;
};

type ICategory = {
  id: number | string;
  name: string;
};

const AddDanhMuc = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IProductForm>();

  const [categories, setCategories] = useState<ICategory[]>([]);
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSubmit = async (data: IProductForm) => {
    try {
      await axios.post(`http://localhost:3000/categories`, data);
      alert(`Thêm mới thành công!`);
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto py-12 px-6">
      <h1 className="text-center text-2xl font-bold mb-6">Thêm mới danh mục</h1>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white shadow-md rounded-md p-6 space-y-4"
      >
        {/* Tên danh mục */}
        <div>
          <label className="block font-medium mb-1">Tên danh mục</label>
          <input
            {...register("name", { required: true, minLength: 5 })}
            type="text"
            placeholder="Nhập tên danh mục"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Tên không được để trống và ít nhất 5 ký tự</span>
          )}
        </div>

        {/* Ảnh danh mục */}
        <div>
          <label className="block font-medium mb-1">Ảnh danh mục</label>
          <input
            {...register("image")}
            type="text"
            placeholder="Nhập đường dẫn ảnh"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        {/* Nút thêm mới */}
        <div className="flex justify-end">
          <button 
            className="w-full border border-black text-black py-2 rounded-md font-medium transition 
            hover:bg-black hover:text-white active:scale-95"
            type="submit"
          >
            Thêm danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDanhMuc;
