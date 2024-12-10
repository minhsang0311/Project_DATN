import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/components/OrderStatus.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

function OrderStatus() {
    const [orders, setOrderList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming token is stored as "token" in localStorage
        const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored as "user"
        const userId = user?.id; // Get User_ID from the stored user info
        console.log(userId)

        if (userId && token) {
            axios.get(`http://localhost:3000/user/orders/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => setOrderList(res.data))
            .catch(err => setError("Không thể lấy dữ liệu đơn hàng")); // Set an error message
        }
    }, []);

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </Fragment>
    );
}

export default OrderStatus;
