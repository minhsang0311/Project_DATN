import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../../styles/pages/customerList.css";

const CustomerList = ({ searchResults }) => {
  const token = localStorage.getItem('token');
  const url = `http://localhost:3000/admin`;
  const [customers, setcustomersList] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!searchResults || searchResults.length === 0) {
        // Fetch toàn bộ danh sách khách hàng khi không có kết quả tìm kiếm
        fetch(`${url}/customers`, {
            method: 'GET',
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              setcustomersList(data)
            })
            .catch(error => console.error('Error fetching customer list:', error));
    }
  }, [token, searchResults]);

  const handleLockToggle = async (userId, currentLockStatus) => {
    const action = currentLockStatus ? "mở khóa" : "khóa";
    if (window.confirm(`Bạn có chắc chắn muốn ${action} khách hàng này?`)) {
      try {
        const response = await fetch(`${url}/customerLock/${userId}`, {
          method: 'PUT',
          headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token
          }
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          alert(errorResponse.message || `Không thể ${action} khách hàng.`);
        } else {
          alert(`Đã ${action} khách hàng.`);
          setcustomersList(prev =>
            prev.map(customer =>
              customer.User_ID === userId ? { ...customer, is_locked: !currentLockStatus } : customer
            )
          );
        }
      } catch (error) {
        console.error('Error locking/unlocking customer:', error);
        setError(`Không thể ${action} khách hàng.`);
      }
    }
  };

  // Hiển thị searchResults nếu có, nếu không sẽ hiển thị toàn bộ customers
  const displayCustomers = searchResults && searchResults.length > 0 ? searchResults : customers;

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="box-productlist">
      <div className="headertop-admin">
        <div className="header_admin">
          <h2>DANH SÁCH KHÁCH HÀNG</h2>
          <button className="button_admin">
            <Link to="/admin/customerAdd">THÊM KHÁCH HÀNG</Link>
          </button>
        </div>
      </div>
      <div className="grid-container-customer">
        <div className="grid-header">ID</div>
        <div className="grid-header">Tên người dùng</div>
        <div className="grid-header">Email</div>
        <div className="grid-header">Điện thoại</div>
        <div className="grid-header">Vai trò</div>
        <div className="grid-header">Thao tác</div>
        {displayCustomers.map((customer, index) => (
          <Fragment key={customer.User_ID}>
            <div className="grid-item grid-item-element">{index + 1}</div>
            <div className="grid-item grid-item-element">{customer.User_Name}</div>
            <div className="grid-item grid-item-element">{customer.Email || 'N/A'}</div>
            <div className="grid-item grid-item-element">{customer.Phone || 'N/A'}</div>
            <div className="grid-item grid-item-element">{customer.Role === 1 ? 'Admin' : 'User'}</div>
            <div className="grid-item grid-item-button">
              <Link to={`/admin/customerUpdate/${customer.User_ID}`} className="edit-btn">✏️</Link>
              <button
                className="delete-btn"
                onClick={() => handleLockToggle(customer.User_ID, customer.is_locked)}
              >
                {customer.is_locked ? 'Mở khóa 🔓' : 'Khóa 🔒'}
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
