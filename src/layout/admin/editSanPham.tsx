import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IProductForm } from "../../interface/products";

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
        const { data } = await axios.get("http://localhost:3000/categories");
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
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
          category_id: String(data.category_id),
        });
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    })();
  }, [id, reset]);

  // Gửi dữ liệu cập nhật
  const onSubmit = async (product: IProductForm) => {
    try {
      const formattedData = {
        ...product,
        price: Number(product.price),
        category_id: Number(product.category_id),
      };

      console.log("Dữ liệu gửi lên:", formattedData);

      await axios.put(`http://localhost:3000/products/${id}`, formattedData);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto py-12 px-6">
      <h1 className="text-center text-2xl font-bold mb-6">Cập nhật sản phẩm</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-md p-6 space-y-4"
      >
        {/* Tên sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Tên sản phẩm</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Nhập tên sản phẩm"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        {/* Ảnh sản phẩm */}
        {["image", "image2", "image3"].map((field, index) => (
          <div key={index}>
            <label className="block font-medium mb-1">{`Ảnh sản phẩm ${index === 0 ? "" : index}`}</label>
            <input
              {...register(field as keyof IProductForm)}
              type="text"
              placeholder="Nhập URL ảnh"
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
            />
            {watch(field as keyof IProductForm) && (
              <img
                src={watch(field as keyof IProductForm)}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 border rounded-md"
              />
            )}
          </div>
        ))}

        {/* Giá sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Giá sản phẩm</label>
          <input
            {...register("price", { required: true, valueAsNumber: true })}
            type="number"
            placeholder="Nhập giá"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          />
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <label className="block font-medium mb-1">Mô tả ngắn</label>
          <textarea
            {...register("description")}
            placeholder="Nhập mô tả"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả chi tiết</label>
          <textarea
            {...register("descriptionLong")}
            placeholder="Nhập mô tả chi tiết"
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
          ></textarea>
        </div>

        {/* Chọn danh mục */}
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
        </div>

        {/* Nút cập nhật */}
        <div className="flex justify-end">
          <button
            className="w-full border border-black text-black py-2 rounded-md font-medium transition 
            hover:bg-black hover:text-white active:scale-95"
            type="submit"
          >
            Cập nhật sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
