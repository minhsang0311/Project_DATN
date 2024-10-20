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

    


    <div>
      <header>
        <div className="top-bar">
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Hướng dẫn</a></li>
            <li><a href="#">Hỗ trợ</a></li>
            <li><a href="#">Bài viết</a></li>
          </ul>
          <div className="support">
            <span>Tư vấn bán hàng: <a href="tel:012346699" className="phone-number">012346699</a></span>
          </div>
        </div>
        <div className="main-menu">
          <div className="logo">
            <a href="#">
              <img src="logo.jpg" alt="Logo" />
            </a>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="user-cart">
            <a href="#"><i className="fas fa-user"></i></a>
            <a href="#"><i className="fas fa-shopping-cart"></i></a>
          </div>
        </div>
        <div className="nav-menu">
          <ul>
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Cửa hàng</a></li>
            <li><a href="#">Nồi các loại</a></li>
            <li><a href="#">Bếp điện</a></li>
            <li><a href="#">Lò vi sóng</a></li>
            <li><a href="#">Máy hút bụi</a></li>
            <li><a href="#">Máy xay sinh tố</a></li>
          </ul>
        </div>
      </header>

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
            <button onClick={handleCheckout}>Thanh toán</button>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-section">
          <h3>Địa chỉ</h3>
          <p><i className="fas fa-phone-alt"></i> ĐT: 0981.599.399</p>
          <p><i className="fas fa-map-marker-alt"></i> 17/20, ngõ Tân Lạc, Đại La, Hai Bà Trưng, Hà Nội</p>
          <p><i className="fas fa-map-marker-alt"></i> 54 Đông An, Tân Đông Hiệp, Dĩ An, Bình Dương</p>
          <p><i className="fas fa-map-marker-alt"></i> 51B Huỳnh Thị Tươi, KP.Tân Thắng, Tân Bình, Dĩ An, Bình Dương</p>
          <p><i className="fas fa-envelope"></i> Email: homenest.vn@gmail.com</p>
        </div>
        <div className="footer-section">
          <h3>Đại lý - Hỗ trợ</h3>
          <p>Danh sách các đại lý</p>
          <p>Hướng dẫn mua hàng</p>
          <p>Hướng dẫn mua trả góp</p>
          <p>Hỗ trợ khách hàng</p>
        </div>
        <div className="footer-section">
          <h3>Chính sách</h3>
          <p>Quy định, chính sách</p>
          <p>Chính sách bảo hành - đổi trả</p>
          <p>Giao hàng và lắp đặt</p>
          <p>Chính sách bảo mật TT cá nhân</p>
          <p>Tin tức Khuyến mại</p>
        </div>
        <div className="footer-section">
          <h3>Đăng ký nhận ưu đãi</h3>
          <p>Hãy đăng ký email của bạn để cập nhật thông tin khuyến mại nhanh nhất</p>
          <input type="email" placeholder="Nhập email của bạn" />
          <button>Đăng ký</button>
          <div className="social-icons">
            <img src="gg.svg" alt="Google" />
            <img src="fbb.jpg" alt="Facebook" />
            <img src="you.png" alt="YouTube" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
