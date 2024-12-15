import React, { Fragment, useState, useEffect } from 'react';
import '../styles/components/PaymentPage.css';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const PaymentPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [note, setNote] = useState('');
    const [userId, setUserId] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [voucherMessage, setVoucherMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { productDetails } = location.state || {}; // Access the passed product details

    //mua ngay
    useEffect(() => {
        if (productDetails) {
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            currentCart.push(productDetails);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    }, [productDetails]);
    useEffect(() => {
        // Lấy giỏ hàng và User ID từ localStorage
        const storedUserId = JSON.parse(localStorage.getItem('user'));
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const userID = storedUserId.id
        setCartItems(storedCartItems);
        setUserId(userID);
        if (!storedUserId) {
            alert('Bạn cần phải đăng nhập để thanh toán');
            navigate('/register_login');
        } else {
            if (storedUserId.role !== 0) {
                alert('Tài khoản không thể mua hàng');
                navigate('/register_login');
            }
        }

    }, [navigate]);
    useEffect(() => {
        const tokenUser = localStorage.getItem("tokenUser");
        const debounceTimeout = setTimeout(() => {
            if (voucherCode) {
                fetch(`${process.env.REACT_APP_HOST_URL}user/voucher`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenUser}`
                    },
                    body: JSON.stringify({ code: voucherCode }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data.success === true) {
                            setDiscount(data.discount);
                            setVoucherMessage(`Voucher áp dụng thành công! Giảm ${data.discount}%`);
                        } else if (data.success === false) {
                            setDiscount(0);
                            setVoucherMessage(data.message);
                        }
                    })
                    .catch(() => {
                        setDiscount(0);
                        setVoucherMessage('Lỗi xảy ra vui lòng kiểm tra voucher.');
                    });
            } else {
                setDiscount(0);
                setVoucherMessage('');
            }
        }, 1000); // 1 giây debounce

        // Dọn dẹp timeout khi voucherCode thay đổi trước khi timeout kết thúc
        return () => clearTimeout(debounceTimeout);
    }, [voucherCode]);
    const handleVoucherChange = (e) => {
        setVoucherCode(e.target.value);
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const finalAmount = total - (total * (discount / 100));
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handlePayment = () => {
        if (!name || !address || !phone || !email || !userId) {
            return alert("Vui lòng nhập đầy đủ thông tin mua hàng trước khi thanh toán.");
        }
        if (!paymentMethod) {
            return alert('Vui lòng chọn phương thức thanh toán.');
        }

        const orderData = {
            User_Name: name,
            Address: address,
            Phone: phone,
            Email: email,
            payment_method: paymentMethod,
            total_amount: finalAmount,
            total_quantity: totalQuantity,
            items: cartItems.map(item => ({
                Product_ID: item.id,
                Quantity: item.quantity,
                Price: item.price
            })),
            User_ID: userId,
            Voucher_ID: voucherCode || null,
            Note: note || null
        };

        // Xử lý theo phương thức thanh toán
        if (paymentMethod === 'COD') {
            // Xử lý thanh toán COD
            fetch(`${process.env.REACT_APP_HOST_URL}user/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        alert('Thanh toán COD thành công!');
                        console.log(localStorage.removeItem('cart'));
                        navigate('/order'); 
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Lỗi khi xử lý thanh toán COD.');
                });
        } else if (paymentMethod === 'Online') {
            // Xử lý thanh toán Online
            fetch(`${process.env.REACT_APP_HOST_URL}user/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        if (data.url) {
                            window.location.href = data.url;
                            localStorage.removeItem('cart');
                        } else {
                            alert('Không thể chuyển đến cổng thanh toán. Vui lòng thử lại.');
                        }
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Lỗi khi xử lý thanh toán online.');
                });
        } else {
            alert('Phương thức thanh toán không hợp lệ.');
        }
    };



    return (
        <Fragment>
            <Header />
            <div className='container-pay'>
                <h1>THANH TOÁN</h1>
                <div className="container-payment">
                    <div className="section">
                        <h2>Thông tin mua hàng</h2>
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
                        <h2>Phương thức thanh toán</h2>
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
                        <h2>Ghi chú</h2>
                        <textarea
                            name="ghi-chu"
                            id="ghi-chu"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hoặc chỉ dẫn địa điểm giao hàng chi tiết hơn."
                        ></textarea>
                    </div>

                    <div className="section">
                        <h2>Đơn hàng ({cartItems.length} sản phẩm)</h2>
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
                                    onChange={handleVoucherChange}
                                />
                            </label>
                            {/* <button onClick={applyVoucher}>Áp Dụng</button> */}
                            {voucherMessage && <p className="voucher-message">{voucherMessage}</p>}
                        </div>
                        <div className='money'>
                            <p className='total_money'><span>Tổng tiền: </span>{total.toLocaleString('vi')}₫</p>
                            <p className='total_sale'><span>Tổng tiền sau giảm giá: </span>{finalAmount.toLocaleString('vi')}₫</p>
                        </div>
                        <button className='payment_button' onClick={handlePayment}>Thanh toán</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PaymentPage;
