// src/pages/PaymentPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/components/PaymentPage.css';

const PaymentPage = () => {
    const items = useSelector(state => state.cart.items);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePaymentMethod = (method) => {
        alert(`Bạn đã chọn phương thức thanh toán: ${method}`);
        // Thực hiện các bước thanh toán tương ứng
    };

    return (
        <div className="payment-page">
            <h2>Trang Thanh Toán</h2>
            {items.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.</p>
            ) : (
                <>
                    <h3>Tổng tiền: {total.toLocaleString('vi')} VNĐ</h3>
                    <div className="payment-methods">
                        <h4>Chọn phương thức thanh toán:</h4>
                        <button onClick={() => handlePaymentMethod('Thanh toán khi nhận hàng')}>
                            Thanh toán khi nhận hàng
                        </button>
                        <button onClick={() => handlePaymentMethod('Thanh toán qua MoMo')}>
                            Thanh toán qua MoMo
                        </button>
                        <button onClick={() => handlePaymentMethod('Thanh toán qua VNPay')}>
                            Thanh toán qua VNPay
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentPage;
