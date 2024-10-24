import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Cart.css';

const CartPage = () => {
    const { cartItems, removeFromCart } = useContext(CartContext); // Lấy dữ liệu từ CartContext
    const navigate = useNavigate();

    const handleQuantityChange = (productId, quantity) => {
        if (quantity < 1) return;
        // Xử lý thay đổi số lượng trong giỏ hàng
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartItems } });
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

    return (
        <div className="container">
            <div className="cart">
                <h2>Giỏ hàng của bạn</h2>
                <div className="box-cart">
                    {cartItems.map(item => (
                        <div className="cart-item" key={item.Product_ID}>
                            <button onClick={() => removeFromCart(item.Product_ID)}>Xóa</button>
                            <img src={item.Image} alt={item.Product_Name} className="product-image" />
                            <div>{item.Product_Name}</div>
                            <div>{item.Price.toLocaleString()} đ</div>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.Product_ID, parseInt(e.target.value))}
                            />
                            <div>{(item.Price * item.quantity).toLocaleString()} đ</div>
                        </div>
                    ))}
                </div>
                <h3>Tổng cộng: {totalPrice.toLocaleString()} đ</h3>
                <button onClick={handleCheckout}>Thanh toán</button>
            </div>
        </div>
    );
};

export default CartPage;
