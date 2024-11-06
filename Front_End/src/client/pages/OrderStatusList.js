import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/components/OrderStatus.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const orderStatusMap = {
    1: 'Chờ xác nhận',
    2: 'Đã xác nhận',
    3: 'Đang chuẩn bị hàng',
    4: 'Đang vận chuyển',
    5: 'Đã giao hàng',
    6: 'Đã hủy',
};

function OrderStatus() {
    const [orders, setOrderList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/user/order`)
            .then(res => res.json())
            .then(data => setOrderList(data))
            .catch(err => console.error(err)); // Bắt lỗi nếu có
    }, []);

    return (
        <Fragment>
            <Header/>
        <div className="order-status">
            <h2>Trạng thái đơn hàng của bạn</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Trạng thái</th>
                        <th>Ngày đặt hàng</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.Order_ID}>
                            <td>{order.Order_ID}</td>
                            <td>{orderStatusMap[order.Status] || 'Không xác định'}</td> {/* Ánh xạ ID trạng thái sang tên trạng thái */}
                            <td>{order.Order_Date}</td>
                            <td>{order.Address}</td>
                            <td>{order.Total_Price} VND</td>
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
