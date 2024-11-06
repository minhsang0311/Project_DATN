import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/pages/CategoryList.css';
function Loai_Ds() {
    const [listSP, setListSP] = useState([]);
    const navigate = useNavigate();
    let opt= {
        method:"get", 
        headers:{ 'Content-Type':'application/json' ,'Authorization':'Bearer '}
    }
    const xoaSP = (id) => {
        if (window.confirm('Bạn có muốn xóa loại không?') === false) return;
        fetch(`http://localhost:3000/admin/category/${id}`, {
            method: "delete",
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' }
        })
            .then(res => res.json())
            .then(() => navigate('/admin/category'));
    };
    useEffect(() => {
        fetch("http://localhost:3000/admin/category", opt)
            .then(res => res.json())
            .then(data => setListSP(data));
    }, []);

    return (
        <div className="box-categorylist">
            <div className="headertop-admin-cate">
                <div className="header_admin-cate">
                    <h2>Danh sách sản phẩm</h2>
                    <button className="button_admin-cate">
                        <Link to="/admin/categoryAdd">Thêm danh mục</Link>
                    </button>
                </div>
            </div>
            <div className="grid-container-cate">
                <div className="grid-header-cate">STT</div>
                <div className="grid-header-cate">Tên sản phẩm</div>
                <div className="grid-header-cate">Ẩn_Hiện</div>
                <div className="grid-header-cate">Thao tác</div>
                {listSP.map((category, index) => (
            <React.Fragment key={index}>
                <div className="grid-item-cate">{index + 1}</div>
                <div className="grid-item-cate">{category.Category_Name}</div>
                <div className="grid-item-cate">{category.Show_Hidden === 1 ? "Hiện" : "Ẩn"}</div>
                <div className="grid-item-cate grid-item-cate-button">
                    <Link to={`/admin/categoryUpdate/${category.Category_ID}`} className="edit-btn" >✏️</Link>
                    <button className="delete-btn-cate" onClick={() => xoaSP(category.Category_ID)}>🗑️</button>
                </div>
            </React.Fragment>
        ))}

            </div>
        </div>
    );
}

export default Loai_Ds;
