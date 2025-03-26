import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IRegisterForm } from '../../interface/user'

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IRegisterForm>()
    const navigate = useNavigate()

    const onSubmit = async (user: IRegisterForm) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/register`, user)
            alert('Đăng ký thành công')
            navigate('/dang-nhap')
        } catch (error: any) {
            alert(error.response?.data || error.message)
            console.log(error);
        }
    }

    return (
        <div className="max-w-lg mx-auto py-12">
            <h1 className="text-center text-2xl font-bold mb-6">ĐĂNG KÝ TÀI KHOẢN</h1>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-white shadow-md rounded-md p-6 space-y-4"
            >
                <div>
                    <label className="block font-medium mb-1">Họ tên</label>
                    <input 
                        type="text" 
                        {...register("name", { required: true })}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
                    />
                    {errors.name && <span className="text-red-500 text-sm">Tên không được để trống</span>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input 
                        type="email" 
                        {...register("email", { pattern: /^\S+@\S+\.\S+$/, required: true })}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
                    />
                    {errors.email && <span className="text-red-500 text-sm">Email không hợp lệ</span>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Số điện thoại</label>
                    <input 
                        type="text" 
                        {...register("phone", { pattern: /^0[0-9]{9}$/ })}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">Số điện thoại không hợp lệ</span>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Mật khẩu</label>
                    <input 
                        type="password" 
                        {...register("password", { required: true })}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
                    />
                    {errors.password && <span className="text-red-500 text-sm">Mật khẩu không được để trống</span>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Nhập lại mật khẩu</label>
                    <input 
                        type="password" 
                        {...register("repassword", { validate: value => watch("password") === value })}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
                    />
                    {errors.repassword && <span className="text-red-500 text-sm">Mật khẩu không khớp</span>}
                </div>

                <button 
                    type="submit"
                    className="w-full border border-black text-black py-2 rounded-md font-medium transition hover:bg-black hover:text-white"
                >
                    Đăng ký
                </button>
            </form>
        </div>
    )
}

export default Register;
