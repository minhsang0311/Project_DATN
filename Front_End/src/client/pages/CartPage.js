import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/components/Cart.css'


const CartPage = () => {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();  
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/products/1');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const product = await response.json();
          setCartItems([{ ...product, quantity: 1 }]);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }, []);
  
  
  
  
  
  
    // Hàm xử lý xóa sản phẩm
    const handleRemoveItem = (productId) => {
      setCartItems((prevItems) => prevItems.filter(item => item.Product_ID !== productId));
    };
  
    // Hàm xử lý thay đổi số lượng
    const handleQuantityChange = (productId, quantity) => {
      if (quantity < 1) return; // Không cho phép số lượng < 1
      setCartItems((prevItems) => 
        prevItems.map(item => 
          item.Product_ID === productId ? { ...item, quantity } : item
        )
      );
    };
  
    // Hàm xử lý thanh toán
    const handleCheckout = () => {
      // Chuyển hướng đến trang thanh toán và truyền cartItems
      navigate('/checkout', { state: { cartItems } });
    };
  
    const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  




    return(
        <div>
            <div className="container">
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
              <div className="cart-item" key={item.Product_ID}>
                <button className="delete-btn" onClick={() => handleRemoveItem(item.Product_ID)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
                <img src={item.Image} alt={item.Product_Name} className="product-image" />
                <div className="product-name">{item.Product_Name}</div>
                <div className="product-price">{item.Price.toLocaleString()} đ</div>
                <div className="product-quantity">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.Product_ID, parseInt(e.target.value))}
                  />
                </div>
                <div className="product-total">{(item.Price * item.quantity).toLocaleString()} đ</div>
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
        </div>
    )
}
export default CartPage;