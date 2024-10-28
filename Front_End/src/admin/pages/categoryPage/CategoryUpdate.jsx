import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../styles/pages/CategoryUpdate.css';
function CategoryUpdate() {
    const [category, setCategory] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const opt = {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            }
        };

        fetch(`http://localhost:3000/admin/categoryDetail/${id}`, opt)
            .then(res => res.json())
            .then(data => setCategory(data))
            .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
    }, [id]);

    const submitDuLieu = (evt) => {
        evt.preventDefault();

        const opt = {
            method: "put",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '
            }
        };

        fetch(`http://localhost:3000/admin/category/${id}`, opt)
            .then(res => res.json())
            .then(data => {
                console.log("Kết quả =", data);
                navigate("/admin/loai");
            })
            .catch(error => console.error("Lỗi khi cập nhật:", error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: value
        }));
    };

    return (
        <form className="col-md-11 border border-danger border-2 m-auto mt-2" onSubmit={submitDuLieu}>
            <div className="m-3 d-flex">
                <div className="col-6 p-1">
                    <label htmlFor="categoryName">Tên loại</label>
                    <input 
                        type="text" 
                        id="categoryName"
                        name="Category_Name"
                        value={category.Category_Name || ''}
                        onChange={handleInputChange}
                        className="form-control shadow-none border-danger" 
                    />
                </div>
                <div className="col-6 p-1">
                    <label>Ẩn hiện</label>
                    <div>
                        <input 
                            type="radio"  
                            value={false} 
                            name="Show_Hidden"
                            checked={category.Show_Hidden === false}
                            onChange={handleInputChange}
                        /> Ẩn
                        <input 
                            type="radio"  
                            value={true} 
                            name="Show_Hidden"
                            checked={category.Show_Hidden === true}
                            onChange={handleInputChange}
                        /> Hiện
                    </div>
                </div>
            </div>
            <div className="m-3 d-flex">
                <button type="submit" className="btn btn-warning fw-bolder">Cập nhật danh mục</button>
            </div>
        </form>
    );
}

export default CategoryUpdate;
