import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminOrder.css';

const AdminOrder = ({ searchResults }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (searchResults && searchResults.length > 0) {
        setOrders(searchResults);  // Use the search results directly if available
        setLoading(false);
      } else {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`http://localhost:3000/admin/order`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError('Lỗi khi lấy danh sách đơn hàng');
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [searchResults]); // Re-run effect when searchResults change

  const handleStatusChange = async (orderId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/admin/order/${orderId}`, 
        { Status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.Order_ID === orderId ? { ...order, Status: newStatus } : order
        )
      );
      setNewStatus('');
      setSelectedOrder(null);
    } catch (err) {
      setError('Lỗi khi cập nhật trạng thái đơn hàng');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-management">
      <h1 className="order-title">Quản lý đơn hàng</h1>
      <table className="order-table">
        <thead>
          <tr className="table-header">
            <th className="header-item">Order ID</th>
            <th className="header-item">User ID</th>
            <th className="header-item">Status</th>
            <th className="header-item">Email</th>
            <th className="header-item">Phone</th>
            <th className="header-item">Address</th>
            <th className="header-item">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.Order_ID} className="table-row">
              <td className="row-item">{order.Order_ID}</td>
              <td className="row-item">{order.User_ID}</td>
              <td className="row-item">
                {selectedOrder === order.Order_ID ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="status-select"
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value={1}>Chờ xác nhận</option>
                    <option value={2}>Đã xác nhận</option>
                    <option value={3}>Đang chuẩn bị hàng</option>
                    <option value={4}>Đang vận chuyển</option>
                    <option value={5}>Đã giao hàng</option>
                    <option value={6}>Đã hủy</option>
                  </select>
                ) : (
                  <span className="status-display">{order.Status}</span>
                )}
              </td>
              <td className="row-item">{order.Email}</td>
              <td className="row-item">{order.Phone}</td>
              <td className="row-item">{order.Address}</td>
              <td className="row-item">
                {selectedOrder === order.Order_ID ? (
                  <button className="update-button" onClick={() => handleStatusChange(order.Order_ID)}>Cập nhật</button>
                ) : (
                  <button className="change-status-button" onClick={() => { setSelectedOrder(order.Order_ID); setNewStatus(order.Status); }}>
                    Thay đổi trạng thái
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrder;

