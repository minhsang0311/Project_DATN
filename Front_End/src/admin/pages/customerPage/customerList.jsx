import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/customerList.css'; 
import { Link } from "react-router-dom";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Không thể tải danh sách khách hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Function to delete a customer by ID
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

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="customer-list">
      <h2>Danh sách khách hàng</h2>
      <button className="customer-add-button">
                    <Link to="/admin/customerAdd">Thêm khách hàng</Link>
                </button>
      {customers.length > 0 ? (
        <table className="customer-table">
          <thead className="customer-thead">
            <tr className="customer-tr">
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr className="customer-tr" key={customer.User_ID}>
                <td>{customer.User_ID}</td>
                <td>{customer.User_Name}</td>
                <td>{customer.Email || 'N/A'}</td>
                <td>{customer.Phone || 'N/A'}</td>
                <td>{customer.Role === 1 ? 'Admin' : 'User'}</td>
                <td>
                <Link to={`/admin/customerUpdate/${customer.User_ID}`}  className="customer-edit-btn">✏️</Link>
                <button className="customer-delete-btn" onClick={() => handleDelete(customer.User_ID)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có khách hàng nào để hiển thị.</p>
      )}
    </div>
  );
};

export default CustomerList;



