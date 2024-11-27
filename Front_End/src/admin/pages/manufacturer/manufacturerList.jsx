import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../styles/pages/manufacturerList.css';


const ManufacturerList = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch manufacturers from the API
  useEffect(() => {
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
  }, []);

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


  return (
    <div className="manufacturer-list">
      <div className="manufacturer-header" >
        <h2 className='manufacturer-h2'>Danh sách nhà sản xuất</h2>
        <button className="manufacturer-add-button">
          <Link to="/admin/manufacturerAdd" className='manufacturer-add-button-Link' >Thêm nhà sản xuất</Link>
        </button>
      </div>
      {manufacturers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên nhà sản xuất</th>
              <th>Hình ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map(manufacturer => (
              <tr key={manufacturer.Brand_ID}>
                <td>{manufacturer.Brand_ID}</td>
                <td>{manufacturer.Brand_Name}</td>
                <td>
                  {manufacturer.Brand_Image ? (
                    <img src={`${manufacturer.Brand_Image}`} alt={manufacturer.Brand_Name} width="50" />
                  ) : 'N/A'}
                </td>
                <td>
                  <Link to={`/admin/manufacturerUpdate/${manufacturer.Brand_ID}`} className="category-edit-btn">✏️</Link>
                  <button className="category-delete-btn" onClick={() => deleteManufacturer(manufacturer.Brand_ID)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có nhà sản xuất nào để hiển thị.</p>
      )}
    </div>
  );
};

export default ManufacturerList;
