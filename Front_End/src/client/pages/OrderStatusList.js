import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/components/OrderStatus.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function OrderStatus() {
    const [orders, setOrderList] = useState([]);
    const [error, setError] = useState(null);
    const [reason, setReason] = useState('');
    const [orderIdToCancel, setOrderIdToCancel] = useState(null);  // ID của đơn hàng cần hủy
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('tokenUser'); // Assuming token is stored as "token" in localStorage
        const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored as "user"
        const userId = user?.id; // Get User_ID from the stored user info

        if (!token) {
            alert('Bạn cần phải đăng nhập để xem trạng thái đơn hàng');
            navigate('/register_login');
        } else {
            if (user.role !== 0) {
                alert('Tài khoản không thể đổi mật khẩu');
                navigate('/register_login');
            }
        }

        if (userId && token) {
            axios.get(`http://localhost:3000/user/orders/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => setOrderList(res.data))
            .catch(err => setError("Không thể lấy dữ liệu đơn hàng")); // Set an error message
        }
    }, [navigate]);

    const handleCancelOrder = async (orderId) => {
        if (!reason) {
            alert("Vui lòng nhập lý do hủy đơn hàng");
            return;
        }
        const token = localStorage.getItem('tokenUser');
        try {
            await axios.put(`http://localhost:3000/user/cancelOrder/${orderId}`, 
                { reason },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            // Cập nhật lại danh sách đơn hàng sau khi hủy
            setOrderList((prevOrders) =>
                prevOrders.filter(order => order.Order_ID !== orderId)
            );
            alert("Đơn hàng đã được hủy");
            setReason('');
            setOrderIdToCancel(null);
        } catch (err) {
            setError("Không thể hủy đơn hàng");
        }
    };

    return (
        <Fragment>
            <Header />
            <div className="order-status">
                <h2>Trạng thái đơn hàng của bạn</h2>
                {error && <p className="error">{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Trạng thái đơn hàng</th>
                            <th>Ngày đặt hàng</th>
                            <th>Địa chỉ</th>
                            <th>Tổng tiền</th>
                            <th>Hủy đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.Order_ID}>
                                <td>{order.Order_ID}</td>
                                <td>{order.Status}</td> 
                                <td>{order.created_at}</td>
                                <td>{order.Address}</td>
                                <td>{order.total_amount} VND</td>
                                <td>
                                    {order.Status === 'Chờ xác nhận' && (
                                        <button onClick={() => setOrderIdToCancel(order.Order_ID)}>
                                            Hủy đơn hàng
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {orderIdToCancel && (
                    <div className="cancel-modal">
                        <h3>Nhập lý do hủy đơn hàng</h3>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Nhập lý do..."
                        />
                        <button onClick={() => handleCancelOrder(orderIdToCancel)}>Hủy đơn hàng</button>
                        <button onClick={() => setOrderIdToCancel(null)}>Hủy</button>
                    </div>
                )}
            </div>
            <Footer />
        </Fragment>
    );
}

export default OrderStatus;
