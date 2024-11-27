import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../styles/pages/manufacturerList.css';

const ManufacturerList = ({ searchResults }) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManufacturers = async () => {
      if (searchResults) {
        // Nếu có dữ liệu từ tìm kiếm, hiển thị luôn
        setManufacturers(searchResults);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/admin/brands'); // API lấy danh sách tất cả
        setManufacturers(response.data);
      } catch (err) {
        console.error('Error fetching manufacturers:', err);
        setError('Không thể tải danh sách nhà sản xuất.');
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturers();
  }, [searchResults]);

  const deleteManufacturer = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc là bạn muốn xóa nhà sản xuất này?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/brandDelete/${id}`);
      setManufacturers(manufacturers.filter(manufacturer => manufacturer.Brand_ID !== id));
    } catch (err) {
      console.error('Lỗi xóa nhà sản xuất:', err);
      if (err.response && err.response.data && err.response.data.message) {
        window.alert(err.response.data.message);
      } else {
        window.alert('Không xóa được nhà sản xuất.');
      }
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manufacturerList-list">
      <div className="manufacturerList-header">
        <h2 className='manufacturerList-h2'>Danh sách nhà sản xuất</h2>
        <button className="manufacturerList-add-button">
          <Link to="/admin/manufacturerAdd" className='manufacturerList-add-button-Link'>Thêm nhà sản xuất</Link>
        </button>
      </div>
      {manufacturers.length > 0 ? (
        <table className="manufacturerList-table">
          <thead className="manufacturerList-thead">
            <tr className="manufacturerList-tr">
              <th>ID</th>
              <th>Tên nhà sản xuất</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="manufacturerList-tbody">
            {manufacturers.map(manufacturer => (
              <tr key={manufacturer.Brand_ID} className="manufacturerList-tr">
                <td>{manufacturer.Brand_ID}</td>
                <td>{manufacturer.Brand_Name}</td>
                <td>
                  <Link to={`/admin/manufacturerUpdate/${manufacturer.Brand_ID}`} className="manufacturerList-edit-btn">✏️</Link>
                  <button className="manufacturerList-delete-btn" onClick={() => deleteManufacturer(manufacturer.Brand_ID)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='manufacturerList-p'>Không có nhà sản xuất nào để hiển thị.</p>
      )}
    </div>
  );
};

export default ManufacturerList;
