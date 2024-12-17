import React, { useState } from 'react';
import '../../styles/pages/ManufacturerAdd.css';
const ManufacturerAdd = () => {
    const [manufacturer, setManufacturer] = useState({ Brand_Name: '' });
    const [error, setError] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // FormData to send only Brand_Name (no image)
        const formData = new FormData();
        formData.append('Brand_Name', manufacturer.Brand_Name);

        const token = localStorage.getItem('authToken');

        // Make the API request
        fetch('http://localhost:3000/admin/brandAdd', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Brand added successfully') {
                // Reset form after successful submission
                setManufacturer({ Brand_Name: '' });
                console.log("Manufacturer added:", data);
                window.location.href = '/admin/manufacturerList';  // Redirect after successful addition
            } else {
                setError(data.message || 'Error adding manufacturer');
            }
        })
        .catch(error => {
            console.log("Error adding manufacturer:", error);
            setError('Error adding manufacturer.');
        });
    };

    return (
        <div className="form-container-productadd">
            <div className="form-header-addproduct">
                <h2>THÊM NHÀ SẢN XUẤT</h2>
            </div>
            <form className="productadd-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="manufacturer-name">Tên Nhà Sản Xuất</label>
                    <input
                        type="text"
                        id="manufacturer-name"
                        placeholder="Nhập tên nhà sản xuất ..."
                        value={manufacturer.Brand_Name}
                        onChange={e =>
                            setManufacturer({ Brand_Name: e.target.value })
                        }
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-btn">THÊM NHÀ SẢN XUẤT</button>
            </form>
        </div>
    );
};

export default ManufacturerAdd;
