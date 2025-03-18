import React from 'react'
import { ILoginForm } from '../../interface/user'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>()
    const navigate = useNavigate()

    const onSubmit = async (user: ILoginForm) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/login`, user)
            alert('Đăng nhập thành công')
            navigate('/client')
        } catch (error: any) {
            alert(error.response.data ?? error.message)
            console.log(error)
        }
    }

    return (
        <div className='max-w-md mx-auto py-10 bg-green-50 shadow-lg rounded-md p-6'>
            <h1 className='font-bold text-[24px] text-center text-green-700'>Đăng nhập tài khoản</h1>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className='flex flex-col gap-4 mt-4'
            >
                <input 
                    type='text' 
                    placeholder='Email' 
                    {...register("email", { pattern: /^\S+@\S+\.\S+$/, required: true })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.email && <span className='text-red-600 text-sm'>Email không đúng định dạng</span>}

                <input 
                    type='password' 
                    placeholder='Mật khẩu' 
                    {...register("password", { required: true })}
                    className='border py-2 px-3 rounded-md focus:ring focus:ring-green-300 outline-none'
                />
                {errors.password && <span className='text-red-600 text-sm'>Mật khẩu không được để trống</span>}

                <button 
                    className='bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition disabled:bg-gray-300'
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    )
}

export default Login
