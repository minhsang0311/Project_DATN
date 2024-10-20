import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './giohang.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 200000,
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 150000,
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
  ]);

  const navigate = useNavigate();  

  // Hàm điều hướng đến trang thanh toán và truyền cartItems
  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  // Hàm xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Hàm xử lý xóa sản phẩm
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="menu">
        {/* Danh mục sản phẩm */}
      </div>
      <div className="cart">
        <div className="title-cart">
          <h2>Giỏ hàng của bạn</h2>
        </div>
        <div className="box-cart">
          <div className="cart-header">
            <div></div>
            <div>Tên sản phẩm</div>
            <div>Giá</div>
            <div>Số lượng</div>
            <div>Tổng cộng</div>
          </div>

          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <button className="delete-btn" onClick={() => handleRemoveItem(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-name">{item.name}</div>
              <div className="product-price">{item.price.toLocaleString()} đ</div>
              <div className="product-quantity">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <div className="product-total">{(item.price * item.quantity).toLocaleString()} đ</div>
            </div>
          ))}
        </div>
        <div className="box-total">
          <div className="tamtinh">
            <h3>Tạm tính: <span>{totalPrice.toLocaleString()} đ</span></h3>
          </div>
          <div className="tong">
            <h3>Tổng cộng: <span>{totalPrice.toLocaleString()} đ</span></h3>
          </div>
          <button onClick={handleCheckout}>Thanh toán</button> {/* Gọi hàm khi nhấn nút */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
