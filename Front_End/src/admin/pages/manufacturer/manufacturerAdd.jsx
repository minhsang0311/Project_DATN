import React, { useState } from 'react';

const ManufacturerAdd = () => {
    const [manufacturer, setManufacturer] = useState({ Brand_Name: '' });
    const [logo, setLogo] = useState(null);
    const [error, setError] = useState('');

    const handleFileUpload = (event) => {
        setLogo(event.target.files[0]);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // FormData to send both Brand_Name and Brand_Image
        const formData = new FormData();
        formData.append('Brand_Name', manufacturer.Brand_Name);

        // Only append the logo if it's available (not null)
        if (logo) {
            formData.append('Brand_Image', logo);
        }

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
                setLogo(null);
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
        <div className="form-container-manufactureradd">
            <div className="form-header">
                <h2>THÊM NHÀ SẢN XUẤT</h2>
            </div>
            <form className="manufactureradd-form" onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <label htmlFor="manufacturer-logo">Hình ảnh</label>
                    <input
                        type="file"
                        id="manufacturer-logo"
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-btn">THÊM NHÀ SẢN XUẤT</button>
            </form>
        </div>
    );
};

export default ManufacturerAdd;

