import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../styles/pages/manufacturerList.css';

const ManufacturerList = ({ searchResults }) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch manufacturers from the API
  useEffect(() => {
    if (!searchResults || searchResults.length === 0) {
      const fetchManufacturers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/admin/brands'); // Adjust the API endpoint as necessary
          setManufacturers(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching manufacturers:', err);
          setError('Failed to load manufacturers');
          setLoading(false);
        }
      };

      fetchManufacturers();
    }
  }, [searchResults]);

  const deleteManufacturer = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc là bạn muốn xóa nhà sản xuất này?');
    if (!confirmDelete) return;

    try {
      // Gửi yêu cầu xóa đến phụ trợ
      await axios.delete(`http://localhost:3000/admin/brandDelete/${id}`);
      setManufacturers(manufacturers.filter(manufacturer => manufacturer.Brand_ID !== id));
    } catch (err) {
      console.error('Lỗi xóa nhà sản xuất:', err);

      if (err.response && err.response.data && err.response.data.message) {
        window.alert(err.response.data.message);
      } else {
        window.alert('Không xóa được nhà sản xuất');
      }
    }
  };
  const displayManufacturers = searchResults && searchResults.length > 0 ? searchResults : manufacturers;
  return (
    <div className="box-productlist">
      <div className="headertop-admin">
        <div className="header_admin">
          <h2>DANH SÁCH NHÀ SẢN XUẤT</h2>
          <button className="button_admin">
            <Link to="/admin/manufacturerAdd">THÊM NHÀ SẢN XUẤT</Link>
          </button>
        </div>
      </div>
      {manufacturers.length > 0 ? (
        <div className="grid-container-manufacturerList">
              <div className="grid-header">ID</div>
              <div className="grid-header">Tên nhà sản xuất</div>
              <div className="grid-header">Thao tác</div>
            {displayManufacturers.map(manufacturer => (
              <Fragment key={manufacturer.Brand_ID}>
                <div className="grid-item grid-item-element">{manufacturer.Brand_ID}</div>
                <div className="grid-item grid-item-element">{manufacturer.Brand_Name}</div>
                <div className="grid-item grid-item-button">
                  <Link to={`/admin/manufacturerUpdate/${manufacturer.Brand_ID}`} className="edit-btn">✏️</Link>
                  <button className="delete-btn" onClick={() => deleteManufacturer(manufacturer.Brand_ID)}>🗑️</button>
                </div>
              </Fragment>
            ))}
        </div>
      ) : (
        <p className='manufacturerList-p'>Không có nhà sản xuất nào để hiển thị.</p>
      )}
    </div>
  );
};

export default ManufacturerList;
