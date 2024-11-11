import React, { Fragment, useState, useEffect } from 'react';
import '../styles/components/PaymentPage.css';
import Header from '../components/Header';

const PaymentPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Lấy giỏ hàng và User ID từ localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const storedUserId = JSON.parse(localStorage.getItem('user'));
        const userID = storedUserId.id
        setCartItems(storedCartItems);
        setUserId(userID);
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePayment = () => {
        // Kiểm tra thông tin thanh toán
        if (!name || !address || !phone || !email || !userId) {
            return alert("Vui lòng nhập đầy đủ thông tin trước khi thanh toán.");
        }
        if(!paymentMethod) {
            return alert('Vui lòng chọn phương thức thanh toán.');
        }

        // Chuẩn bị dữ liệu đơn hàng
        const orderData = {
            Product_Name: cartItems.map(item => item.name).join(', '),
            Address: address,
            Phone: phone,
            Email: email,
            payment_method: paymentMethod,
            total_amount: total,
            items: cartItems.map(item => ({
                Product_ID: item.id,
                Quantity: item.quantity,
                Price: item.price
            })),
            User_ID: userId,  // ID người dùng từ localStorage
            Voucher_ID: voucherCode ? 1 : null,  // Mã Voucher từ người dùng (Ví dụ Voucher_ID=1)
        };

        // Gửi yêu cầu thanh toán
        fetch('http://localhost:3000/user/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                alert('Mua hàng thành công');
                localStorage.removeItem('cart'); // Xoá giỏ hàng sau khi thanh toán thành công
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại');
            }
        })
        .catch(error => {
            console.log('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại');
        });
    };

    return (
        <Fragment>
            <Header />
            <div className='container-pay'>
                <h1>THANH TOÁN</h1>
                <div className="container-payment">
                    <div className="section">
                        <h2>THÔNG TIN MUA HÀNG</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="ho-ten">Họ và Tên*</label>
                                <input
                                    type="text"
                                    id="ho-ten"
                                    name="ho-ten"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dia-chi">Địa chỉ nhận hàng*</label>
                                <input
                                    type="text"
                                    id="dia-chi"
                                    name="dia-chi"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="so-dien-thoai">Số điện thoại*</label>
                                <input
                                    type="tel"
                                    id="so-dien-thoai"
                                    name="so-dien-thoai"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div className="section">
                        <h2>Chọn phương thức thanh toán</h2>
                        <div className='method-pay'>
                            <div className='section_radio'>
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label>Thanh toán khi nhận hàng</label>
                            </div>
                            <div className='section_radio'>
                                <input
                                    type="radio"
                                    value="Online"
                                    checked={paymentMethod === 'Online'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label>Thanh toán online</label>
                            </div>
                        </div>
                        <h2>THÔNG TIN THÊM</h2>
                        <textarea
                            name="ghi-chu"
                            id="ghi-chu"
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hoặc chỉ dẫn địa điểm giao hàng chi tiết hơn."
                        ></textarea>
                    </div>

                    <div className="section">
                        <h2>ĐƠN HÀNG ({cartItems.length} sản phẩm)</h2>
                        {cartItems.map((item, index) => (
                            <div key={index} className="product-payment">
                                <img src={item.image} alt={item.name} />
                                <div className="product-info">
                                    <p><span>Tên sản phẩm:</span> {item.name}</p>
                                    <p><span>Số lượng:</span> x{item.quantity}</p>
                                    <p><span>Giá:</span> {item.price.toLocaleString('vi')}₫</p>
                                </div>
                            </div>
                        ))}
                        <div className='voucher'>
                            <label>
                                Nhập voucher
                                <input
                                    type='text'
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                />
                            </label>
                            <button>Áp Dụng</button>
                        </div>
                        <p>Tổng tiền: {total.toLocaleString('vi')}₫</p>
                        <button onClick={handlePayment}>Thanh toán</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PaymentPage;
