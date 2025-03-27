import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IProductForm } from "../../interface/products";

const EditDanhMuc = () => {
  const { register, handleSubmit, reset } = useForm<IProductForm>();
  const params: any = useParams();
  const id = params.id;

  useEffect(() => {
    const get_product_by_id = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categories/${id}`);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_product_by_id();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (product: IProductForm) => {
    try {
      await axios.put(`http://localhost:3000/categories/${id}`, product);
      alert("Cập nhật danh mục thành công!");
      navigate("/dashboard/danhmuc");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto py-12 px-6">
      <h1 className="text-center text-2xl font-bold mb-6">Cập nhật danh mục</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-md p-6 space-y-4"
      >
        {/* Nhập tên danh mục */}
        <div>
          <label className="block font-medium mb-1">Tên danh mục</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Nhập tên danh mục"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        {/* Nhập ảnh danh mục */}
        <div>
          <label className="block font-medium mb-1">Ảnh danh mục</label>
          <input
            {...register("image")}
            type="text"
            placeholder="Nhập URL ảnh danh mục"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        {/* Nút cập nhật */}
        <div className="flex justify-end">
          <button
            className="w-full border border-black text-black py-2 rounded-md font-medium transition 
            hover:bg-black hover:text-white active:scale-95"
            type="submit"
          >
            Cập nhật danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDanhMuc;
