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

    const submitData = (evt) => {
        evt.preventDefault();
        const opt = {
            method: "put",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '
            }
        };
<<<<<<< HEAD
        fetch(`http://localhost:3000/admin/category/${id}`, opt)
=======

        fetch(`http://localhost:3000/admin/categoryUpdate/${id}`, opt)
>>>>>>> f81fcf3944b3d9aa639b8b10b87130179cde4683
            .then(res => res.json())
            .then(data => {
                console.log("Kết quả =", data);
                navigate("/admin/category");
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
        <form className="category-update-form col-md-11 border border-danger border-2 m-auto mt-2" onSubmit={submitData}>
            <div className="input-group">
                <div className="input-field">
                    <label htmlFor="category-name">Tên danh mục</label>
                    <input
                        type="text"
                        id="category-name"
                        placeholder="Nhập tên sản phẩm ..."
                        value={category.Category_Name || ''} 
                        onChange={handleInputChange} 
                        name="Category_Name" 
                    />
                </div>
                <div className="input-field">
                    <label>Ẩn/Hiện</label>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="Show_Hidden"
                                value="0"
                                checked={category.Show_Hidden === 0}
                                onChange={() => setCategory({ ...category, Show_Hidden: 0 })}
                            /> Ẩn
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="Show_Hidden"
                                value="1"
                                checked={category.Show_Hidden === 1}
                                onChange={() => setCategory({ ...category, Show_Hidden: 1 })}
                            /> Hiện
                        </label>
                    </div>
                </div>
            </div>

            <div className="button-group m-3 d-flex">
                <button type="submit" className="btn btn-warning fw-bolder">Cập nhật danh mục</button>
            </div>
        </form>
    );
}

export default CategoryUpdate;
