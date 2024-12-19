import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminOrder.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminOrder = ({ searchResults }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hàm fetch danh sách đơn hàng từ server
  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/admin/order', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedOrders = response.data.sort((a, b) => b.Order_ID - a.Order_ID);
      setOrders(sortedOrders);
    } catch (err) {
      setError('Lỗi khi lấy danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchOrders khi component mount
  useEffect(() => {
    fetchOrders();
  }, []); // [] khiến hàm chỉ chạy khi component được mount

  // Hàm thay đổi trạng thái đơn hàng
  const handleUpdateStatus = async (orderId) => {
    const confirmChange = window.confirm(
      `Xác nhận thay đổi trạng thái đơn hàng ${orderId} sang trạng thái tiếp theo?`
    );
    
    if (!confirmChange) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:3000/admin/order/${orderId}`, 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      fetchOrders(); // Tải lại danh sách đơn hàng sau khi thay đổi trạng thái
    } catch (err) {
      toast.error('Đơn hàng đã hủy không thể chuyển trạng thái.');
    }
  };

  // Hàm hủy đơn hàng (không gọi API, chỉ cập nhật giao diện)
  const handleCancelOrder = async (orderId, paymentMethod) => {
    // Kiểm tra phương thức thanh toán trước khi cho phép hủy
    if (paymentMethod === 'Online') {
      alert('Không thể hủy đơn hàng đã thanh toán online.');
      return;
    }
  
    const confirmCancel = window.confirm(
      `Bạn có chắc chắn muốn hủy đơn hàng ${orderId}?`
    );
  
    if (!confirmCancel) return;
  
    try {
      // Gọi API để cập nhật trạng thái đơn hàng thành "Đã hủy"
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:3000/admin/order/cancel/${orderId}`, // API để hủy đơn hàng
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Kiểm tra phản hồi từ server và thông báo
      toast.success(response.data.message);
  
      // Sau khi hủy, tải lại dữ liệu đơn hàng từ server
      fetchOrders(); // Gọi lại fetchOrders() để lấy lại danh sách đơn hàng đã được cập nhật
  
    } catch (err) {
      toast.error('Lỗi khi hủy đơn hàng.');
    }
  };
  

  const handleViewDetail = (orderId) => {
    navigate(`${orderId}`);
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  const displayOrders = searchResults && searchResults.length > 0 ? searchResults : orders;

  return (
    <div className="box-productlist">
      <div className="headertop-admin">
        <div className="header_admin">
        <Toaster position="top-right" reverseOrder={false} /> {/* Thêm Toaster */}

          <h2>DANH SÁCH ĐƠN HÀNG</h2>
        </div>
      </div>
      <div className="grid-container-order">
        <div className="grid-header">ID</div>
        <div className="grid-header">Ngày giờ</div>
        <div className="grid-header">Tên khách hàng</div>
        <div className="grid-header">Trạng thái</div>
        <div className="grid-header">Cập nhật trạng thái</div>
        <div className="grid-header">Hủy đơn hàng</div>
        <div className="grid-header">Xem chi tiết</div>
        {displayOrders.map((order) => (
          <Fragment key={order.Order_ID}>
            <div className="grid-item grid-item-element">{order.Order_ID}</div>
            <div className="grid-item grid-item-element">{new Date(order.created_at).toLocaleString()}</div>
            <div className="grid-item grid-item-element">{order.User_Name}</div>
            <div className="grid-item grid-item-element">
              <span className="status-display">{order.Status}</span>
            </div>
            <div className="grid-item grid-item-element">
              <button className="update-button" onClick={() => handleUpdateStatus(order.Order_ID)}>Thay đổi trạng thái</button>
            </div>
            <div className="grid-item grid-item-element">
              <button className="cancel-button" onClick={() => handleCancelOrder(order.Order_ID, order.payment_method)} >Hủy</button>
            </div>
            <div className="grid-item grid-item-element">
              <button className="detail-button" onClick={() => handleViewDetail(order.Order_ID)}>Xem chi tiết</button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
