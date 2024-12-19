import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/pages/OrderDetail.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/admin/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data.order);
        setOrderDetails(response.data.order_details);
      } catch (err) {
        setError('Không thể tải chi tiết đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-detail-container">
      <h2>Chi Tiết Đơn Hàng </h2>

      {/* Thông tin đơn hàng */}
      <div className="order-info">
        <p><strong>Người đặt:</strong> {order.User_Name}</p>
        <p><strong>Email:</strong> {order.Email}</p>
        <p><strong>Số điện thoại:</strong> {order.Phone}</p>
        <p><strong>Địa chỉ:</strong> {order.Address}</p>
        <p><strong>Phương thức thanh toán:</strong> {order.Payment_Method === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán Online'}</p>
        <p><strong>Ngày đặt hàng:</strong> {new Date(order.Created_At).toLocaleString()}</p>
      </div>

      {/* Chi tiết sản phẩm */}
      <table className="order-detail-table">
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((item) => (
            <tr key={item.Order_Detail_ID}>
              <td>{item.Product_ID}</td>
              <td>{item.Product_Name}</td>
              <td>{item.Price.toLocaleString()} VND</td>
              <td>{item.Quantity}</td>
              <td>{(item.Price * item.Quantity).toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-summary">
        <h3>Tổng số sản phẩm: {order.Total_Quantity}</h3>
        <h3>
          Tổng tiền: {order.Total_Amount.toLocaleString()} VND
        </h3>
      </div>
    </div>
  );
};

export default OrderDetail;
