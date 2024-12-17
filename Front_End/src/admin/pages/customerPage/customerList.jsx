import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/customerList.css';
import { Link } from "react-router-dom";

const CustomerList = ({ searchResults }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let response;
        if (searchResults && searchResults.length > 0) {
          // Sử dụng kết quả từ tìm kiếm
          setCustomers(searchResults);
        } else {
          // Nếu không có searchResults, fetch toàn bộ danh sách khách hàng
          response = await axios.get('http://localhost:3000/admin/customers');
          setCustomers(response.data);
        }

      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Không thể tải danh sách khách hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [searchResults]);

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        await axios.delete(`http://localhost:3000/admin/customerDelete/${userId}`);
        setCustomers(customers.filter(customer => customer.User_ID !== userId));
      } catch (error) {
        console.error("Error deleting customer:", error);
        setError("Không thể xóa khách hàng.");
      }
    }
  };
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
      {customers.length > 0 ? (
        <div className="grid-container-customer">
              <div className="grid-header">ID</div>
              <div className="grid-header">Tên người dùng</div>
              <div className="grid-header">Email</div>
              <div className="grid-header">Điện thoại</div>
              <div className="grid-header">Vai trò</div>
              <div className="grid-header">Thao tác</div>
            {displayCustomers.map(customer => (
              <Fragment key={customer.User_ID}>
                <div className="grid-item grid-item-element">{customer.User_ID}</div>
                <div className="grid-item grid-item-element">{customer.User_Name}</div>
                <div className="grid-item grid-item-element">{customer.Email || 'N/A'}</div>
                <div className="grid-item grid-item-element">{customer.Phone || 'N/A'}</div>
                <div className="grid-item grid-item-element">{customer.Role === 1 ? 'Admin' : 'User'}</div>
                <div className="grid-item grid-item-button">
                  <Link to={`/admin/customerUpdate/${customer.User_ID}`} className="edit-btn">✏️</Link>
                  <button className="delete-btn" onClick={() => handleDelete(customer.User_ID)}>🗑️</button>
                </div>
              </Fragment>
            ))}
        </div>
      ) : (
        <p>Không có khách hàng nào để hiển thị.</p>
      )}
    </div>
  );
};

export default CustomerList;
