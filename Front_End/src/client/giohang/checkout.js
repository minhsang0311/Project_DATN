import React from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation

const Checkout = () => {
  const location = useLocation();  // Sử dụng useLocation để nhận dữ liệu
  const { cartItems } = location.state || { cartItems: [] };  // Nhận dữ liệu cartItems từ state

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Trang thanh toán</h1>
      <h3>Sản phẩm trong giỏ hàng:</h3>
      <div>
        {cartItems.map(item => (
          <div key={item.id}>
            <p>{item.name} - {item.price.toLocaleString()} đ - Số lượng: {item.quantity}</p>
          </div>
        ))}
      </div>
      <h3>Tổng cộng: {totalPrice.toLocaleString()} đ</h3>
    </div>
  );
};

export default Checkout;
