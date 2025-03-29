import { ILoginForm } from '../../interface/user';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const fetchCartFromServer = async (userId: number) => {
    try {
        const response = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
        return response.data.length ? response.data[0].items : [];
    } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        return [];
    }
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Khi component mount, kiểm tra nếu đã có giỏ hàng trong localStorage thì set lại
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const fetchCartFromServer = async (userId: number) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/cart/${userId}`);
            return data || [];
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            return []; // Trả về mảng rỗng nếu có lỗi
        }
    };
    
    const onSubmit = async (user: ILoginForm) => {
        try {
            // 🔹 Gửi yêu cầu đăng nhập
            const { data } = await axios.post(`http://localhost:3000/login`, user);
    
            // 🔹 Lưu thông tin user vào localStorage
            const userInfo = data.user || data; // Dự phòng nếu API trả khác format
            localStorage.setItem('user', JSON.stringify(userInfo));
    
            // 🔥 Lấy giỏ hàng từ server
            const cartItems = await fetchCartFromServer(userInfo.id);
            
            // 🔹 Nếu server không có giỏ hàng, dùng giỏ hàng local (nếu có)
            const storedCart = JSON.parse(localStorage.getItem('cart') || "[]");
            const finalCart = cartItems.length ? cartItems : storedCart;
    
            // 🔹 Lưu lại giỏ hàng
            localStorage.setItem('cart', JSON.stringify(finalCart));
    
            alert('Đăng nhập thành công');
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data || error.message);
            console.error(error);
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
    );
};

export default Login;
