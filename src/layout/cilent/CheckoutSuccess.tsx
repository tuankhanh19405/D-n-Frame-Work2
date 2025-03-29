import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div>
      <h2>Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận.</p>
      <Link to="/orders">Xem đơn hàng của bạn</Link>
    </div>
  );
};

export default CheckoutSuccess;
