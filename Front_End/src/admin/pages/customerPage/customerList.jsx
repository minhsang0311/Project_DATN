import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/customer');
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

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="customer-list">
      <h2>Danh sách khách hàng</h2>
      {customers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.User_ID}>
                <td>{customer.User_ID}</td>
                <td>{customer.User_Name}</td>
                <td>{customer.Email || 'N/A'}</td>
                <td>{customer.Phone || 'N/A'}</td>
                <td>{customer.Role === 1 ? 'Admin' : 'User'}</td>
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