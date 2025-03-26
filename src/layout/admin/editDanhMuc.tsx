import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { IProductForm } from '../../interface/products'

type Props = {}

const EditDanhMuc = (props: Props) => {
    const {register,handleSubmit,reset} = useForm<IProductForm>()
    // Lấy id danh mục
    const params:any = useParams()
    const id = params.id
    useEffect(()=>{
        const get_product_by_id = async()=>{
            try {                
                const {data} = await axios.get(`http://localhost:3000/categories/${id}`)
                reset(data)
            } catch (error) {
                console.log(error);
                
            }
        }
        get_product_by_id()
    },[])
    const navigate = useNavigate()
    const onSubmit = async (product:IProductForm)=>{
        try {
            const {data} = await axios.put(`http://localhost:3000/categories/${id}`,product)
            alert('Cập nhật thành công')
            navigate('/dashboard/danhmuc')
        } catch (error) {
            console.log(error);            
        }
    }
  return (
    <div className='max-w-2xl mx-auto py-10'>
        <h1 className='font-bold text-[24px] text-center'>Cập nhật danh mục</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
            <input {...register("name")} type='text' placeholder='Tên danh mục'/>
            <input {...register("image")} type='text' placeholder='Ảnh danh mục'/>
            <div className='flex justify-end'>
            <button className='bg-green-900 text-white py-1 px-4 rounded'>Cập nhật danh mục</button>
            </div>
        </form>
    </div>
  )
}

export default EditDanhMuc