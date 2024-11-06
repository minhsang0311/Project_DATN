import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/pages/CategoryList.css';
<<<<<<< HEAD
function Loai_Ds() {
    const [listSP, setListSP] = useState([]);
    const navigate = useNavigate();
    let opt= {
        method:"get", 
        headers:{ 'Content-Type':'application/json' ,'Authorization':'Bearer '}
    }
    const xoaSP = (id) => {
        if (window.confirm('Bạn có muốn xóa loại không?') === false) return;
=======

function CategoryList() {
    const [categories, setCategories] = useState([]);
   

    const fetchOptions = {
        method: "get",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' }
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

>>>>>>> f81fcf3944b3d9aa639b8b10b87130179cde4683
        fetch(`http://localhost:3000/admin/category/${id}`, {
            method: "delete",
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' }
        })
        .then(res => res.json())
        .then(response => {
            if (response.thongbao.includes("Không thể xóa danh mục")) {
                alert("Không thể xóa danh mục vì có sản phẩm trong danh mục này!"); // Thông báo khi không thể xóa
            } 
            fetchCategories(); // Tải lại danh sách danh mục
        });
    };

    // Sử dụng useEffect để lấy danh sách danh mục khi component được mount
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="category-list-container">
         
            <div className="category-list-header">
                <h2>Danh sách sản phẩm</h2>
                <button className="category-add-button">
                    <Link to="/admin/categoryAdd">Thêm danh mục</Link>
                </button>
            </div>
            <div className="category-grid">
                <div className="category-grid-title">STT</div>
                <div className="category-grid-title">Tên sản phẩm</div>
                <div className="category-grid-title">Ẩn/Hiện</div>
                <div className="category-grid-title">Thao tác</div>
                {categories.map((category, index) => (
                    <React.Fragment key={index}>
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
