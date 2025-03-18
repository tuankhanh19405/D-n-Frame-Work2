import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IProductForm } from '../../interface/products'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'
import api from '../../interface/api'

type Props = {
    onAdd:(data:FormData)=>void
}


type ICategory = {
  id:number|string,
  name:string
}

const AddDanhMuc = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IProductForm>()

  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    (async() => {
      try {
        const {data} = await api.get('categories')
        setCategories(data)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const onSubmit = async (data: IProductForm) => {
    try {
      await axios.post(`http://localhost:3000/categories`, data)
      alert(`Thêm mới thành công!`)
      navigate(`/dashboard`)
    } catch (error) {
      console.log(error);
    }
  }

    
  return (
    <div className='max-w-2xl mx-auto py-10'>
        <h1 className='font-bold text-[24px] text-center'>Thêm mới Danh Mục</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
            <input {...register("name",{required:true,minLength:5})} type='text' placeholder='Tên danh mục'/>
            {(errors.name)&&<span className='text-red-600 text-[12px]'>Tên không được để trống và ít nhất 5 kí tự</span>}
            <input {...register("image")} type='text' placeholder='Ảnh danh mục'/>
                        
            <div className='flex justify-end'>
            <button className='bg-green-900 text-white py-1 px-4 rounded' type='submit'>Thêm mới danh mục</button>
            </div>
        </form>
    </div>
  )
}

export default AddDanhMuc


