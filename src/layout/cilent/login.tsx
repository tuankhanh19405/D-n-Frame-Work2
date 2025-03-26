import React from 'react'
import { ILoginForm } from '../../interface/user'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>()
    const navigate = useNavigate()

    const onSubmit = async (user: ILoginForm) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/login`, user);
            console.log('DATA:', data);

            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                localStorage.setItem('user', JSON.stringify(data)); // fallback
            }

            alert('Đăng nhập thành công');
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data || error.message);
            console.log(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto py-12">
            <h1 className="text-center text-2xl font-bold mb-6">ĐĂNG NHẬP TÀI KHOẢN</h1>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-white shadow-md rounded-md p-6 space-y-4"
            >
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
                    <label className="block font-medium mb-1">Mật khẩu</label>
                    <input 
                        type="password" 
                        {...register("password", { required: true })}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-black"
                    />
                    {errors.password && <span className="text-red-500 text-sm">Mật khẩu không được để trống</span>}
                </div>

                <button 
                    type="submit"
                    className="w-full border border-black text-black py-2 rounded-md font-medium transition hover:bg-black hover:text-white"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    )
}

export default Login;
