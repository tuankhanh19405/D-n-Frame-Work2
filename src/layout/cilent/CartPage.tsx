
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart) {
    return <p className="text-center text-red-500">Lỗi: Giỏ hàng chưa được tải!</p>;
  }
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng trống!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-2 border border-gray-200 hover:bg-gray-50 transition"
            >
              <div>
                <span className="font-semibold">{item.name}</span> (x{item.quantity})  
                <p className="text-sm text-gray-500">
                  Giá: {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 font-medium transition px-3 py-1 border border-red-500 rounded-md hover:bg-red-100"
                onClick={() => removeFromCart(item.id)}
              >
                Xóa
              </button>
            </div>
          ))}

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">Tổng số sản phẩm: {totalItems}</p>
            <p className="text-lg font-semibold">
              Tổng tiền: {totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
