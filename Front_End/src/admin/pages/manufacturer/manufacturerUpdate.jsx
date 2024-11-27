import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
import '../../styles/pages/manufacturerUpdate.css';
const ManufacturerUpdate = () => {
  const { id } = useParams();  // Get Brand_ID from URL
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch the current brand details when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3000/admin/brandDetail/${id}`)
      .then(response => {
        const { Brand_Name } = response.data;
        setBrandName(Brand_Name);
      })
      .catch(error => {
        console.error('Error fetching brand details:', error);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Brand_Name', brandName);

    setLoading(true);

    axios.put(`http://localhost:3000/admin/brandUpdate/${id}`, formData)
      .then(() => {
        setLoading(false);
        navigate('/admin/manufacturerList'); // Redirect to the list of brands after successful update
      })
      .catch(error => {
        setLoading(false);
        console.error('Error updating brand:', error);
      });
  };

  return (
    <div className="manufacturerUpdate-container">
      <h2 className='manufacturerUpdate-h2'>Sửa nhà sản xuất</h2>
      <form onSubmit={handleSubmit}>
        <div className="manufacturerUpdate-form-group">
          <label>Brand Name</label>
          <input
            type="text"
            className="form-control"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-manufacturerUpdate" disabled={loading}>
          {loading ? 'Updating...' : 'Update Brand'}
        </button>
      </form>
    </div>
  );
};

export default ManufacturerUpdate;
