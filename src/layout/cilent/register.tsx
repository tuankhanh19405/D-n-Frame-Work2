import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IRegisterForm } from '../../interface/user'

type Props = {}

const Register = (props: Props) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IRegisterForm>()
    const navigate = useNavigate()

    const onSubmit = async (user: IRegisterForm) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/register`, user)
            alert('Đăng ký thành công')
            navigate('/client/dang-nhap')
        } catch (error: any) {
            alert(error.response.data ?? error.message)
            console.log(error);
        }
    }

    return (
        <div className='max-w-md mx-auto py-10 bg-green-50 shadow-lg rounded-md p-6'>
            <h1 className='font-bold text-[24px] text-center text-green-700'>Đăng ký tài khoản</h1>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className='flex flex-col gap-4 mt-4'
            >
                <input 
                    type='text' 
                    placeholder='Họ tên' 
                    {...register("name", { required: true })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.name && <span className='text-red-600 text-sm'>Tên không được để trống</span>}

                <input 
                    type='text' 
                    placeholder='Email' 
                    {...register("email", { 
                        pattern: /^\S+@\S+\.\S+$/, 
                        required: true 
                    })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.email && <span className='text-red-600 text-sm'>Email không đúng định dạng</span>}

                <input 
                    type='text' 
                    placeholder='Số điện thoại' 
                    {...register("phone", { pattern: /^0[0-9]{9}$/ })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.phone && <span className='text-red-600 text-sm'>Số điện thoại không đúng định dạng</span>}

                <input 
                    type='password' 
                    placeholder='Mật khẩu' 
                    {...register("password", { required: true })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.password && <span className='text-red-600 text-sm'>Mật khẩu không được để trống</span>}

                <input 
                    type='password' 
                    placeholder='Nhập lại mật khẩu' 
                    {...register("repassword", { 
                        validate: (value: any) => watch("password") === value 
                    })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.repassword && <span className='text-red-600 text-sm'>Mật khẩu không khớp</span>}

                <button 
                    className='bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition disabled:bg-gray-300'
                >
                    Đăng ký
                </button>
            </form>
        </div>
    )
}

export default Register;
