import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/pages/CategoryList.css';

function CategoryList({ searchResults }) {
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('token');

    const fetchOptions = {
        method: "get",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    };

    // Hàm để lấy danh sách danh mục
    const fetchCategories = () => {
        fetch("http://localhost:3000/admin/category", fetchOptions)
            .then(res => res.json())
            .then(data => setCategories(data));
    };

    // Hàm để xóa danh mục
    const deleteCategory = (id) => {
        if (window.confirm('Bạn có muốn xóa loại không?') === false) return;

        fetch(`http://localhost:3000/admin/category/${id}`, {
            method: "delete",
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.json())
        .then(response => {
            if (response.thongbao.includes("Không thể xóa danh mục")) {
                alert("Không thể xóa danh mục vì có sản phẩm trong danh mục này!");
            }
            fetchCategories(); // Tải lại danh sách danh mục sau khi xóa
        });
    };

    // Sử dụng useEffect để lấy danh sách danh mục khi component được mount
    useEffect(() => {
        if (!searchResults || searchResults.length === 0) {
            fetchCategories();
        }
    }, [searchResults]);

    // Sử dụng searchResults nếu có, nếu không sẽ hiển thị toàn bộ categories
    const displayCategories = searchResults && searchResults.length > 0 ? searchResults : categories;

    return (
        <div className="category-list-container">
            <div className="category-list-header">
                <h2>Danh sách danh mục</h2>
                <button className="category-add-button">
                    <Link to="/admin/categoryAdd">Thêm danh mục</Link>
                </button>
            </div>
            <div className="category-grid">
                <div className="category-grid-title">STT</div>
                <div className="category-grid-title">Tên danh mục</div>
                <div className="category-grid-title">Ẩn/Hiện</div>
                <div className="category-grid-title">Thao tác</div>
                {displayCategories.map((category, index) => (
                    <React.Fragment key={category.Category_ID}>
                        <div className="category-grid-item">{index + 1}</div>
                        <div className="category-grid-item">{category.Category_Name}</div>
                        <div className="category-grid-item">{category.Show_Hidden === 1 ? "Hiện" : "Ẩn"}</div>
                        <div className="category-grid-item category-actions">
                            <Link to={`/admin/categoryUpdate/${category.Category_ID}`} className="category-edit-btn">✏️</Link>
                            <button className="category-delete-btn" onClick={() => deleteCategory(category.Category_ID)}>🗑️</button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;
