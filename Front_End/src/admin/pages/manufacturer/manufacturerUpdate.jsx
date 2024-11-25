import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
    
const ManufacturerUpdate = () => {
  const { id } = useParams();  // Get Brand_ID from URL
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch the current brand details when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3000/admin/brandDetail/${id}`)
      .then(response => {
        const { Brand_Name, Brand_Image } = response.data;
        setBrandName(Brand_Name);
        setImagePreview(`/uploads/brand_images/${Brand_Image}`);  // Assuming Brand_Image is the filename
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
    
    // If a new image is selected, append it to the formData
    if (brandImage) {
      formData.append('Brand_Image', brandImage);
    }

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

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      <h2>Update Manufacturer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand Name</label>
          <input
            type="text"
            className="form-control"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Brand Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Brand Preview" style={{ width: '100px', marginTop: '10px' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Brand'}
        </button>
      </form>
    </div>
  );
};

export default ManufacturerUpdate;
