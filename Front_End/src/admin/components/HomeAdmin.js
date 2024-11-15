import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/HomeAdmin.css';
import ProductList from '../pages/productPage/ProductList';
import CategoryList from '../pages/categoryPage/CategoryList';
import CategoryAdd from '../pages/categoryPage/CategoryAdd';
import CategoryUpdate from '../pages/categoryPage/CategoryUpdate';
import ProductAdd from '../pages/productPage/ProductAdd';
import ProductUpdate from '../pages/productPage/ProductUpdate';
import Statistics from '../pages/Statistics/Statistics';
import Comments from '../pages/commentPage/commentList';
import AdminOrder from '../pages/orderPage/AdminOrder';
import Customer from '../pages/customerPage/customerList';

const HomeAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [entityType, setEntityType] = useState('products'); // Loại đối tượng mặc định là sản phẩm

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenRole = JSON.parse(localStorage.getItem("user"));
        if (!token) {
            alert('Bạn cần đăng nhập để truy cập trang này.');
            navigate('/register_login');
        } else {
            if (tokenRole.role !== 1) {
                alert('Tài khoản chưa đủ quyền để vào');
                navigate('/register_login');
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/register_login');
    };

    const handleSearch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3000/admin/searchAdmin', {
                headers: { "Authorization": 'Bearer ' + token },
                params: { searchTerm, entityType }
            });
            setSearchResults(response.data);

            // Điều hướng đến trang tương ứng với entityType
            if (entityType === 'products') {
                navigate('/admin/products');
            } else if (entityType === 'categories') {
                navigate('/admin/category');
            } else if (entityType === 'users') {
                navigate('/customers');
            }
        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
        }
    };

    return (
        <div className="home_admin">
            <div className="sidebar">
                <div className="logo">
                    <img src="assets/img/logo.png" alt="" />
                </div>
                <ul className="menu">
                    <li>
                        <Link to="/admin">
                            <i className="bi bi-house-door"></i>
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products">
                            <i className="bi bi-bag-dash"></i>
                            <span>Sản phẩm</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/category">
                            <i className="bi bi-list"></i>
                            <span>Danh mục</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customers">
                            <i className="bi bi-people"></i>
                            <span>Khách hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/order">
                            <i className="bi bi-receipt"></i>
                            <span>Đơn hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/comments">
                            <i className="bi bi-chat-dots"></i>
                            <span>Bình luận</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/promotions">
                            <i className="bi bi-bar-chart-line"></i>
                            <span>Khuyến mãi</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/statistics">
                            <i className="bi bi-bar-chart-line"></i>
                            <span>Thống kê</span>
                        </Link>
                    </li>
                    <li className="logout" onClick={handleLogout}>
                        <Link>
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Thoát</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="main--content">
                <div className="header--wrapper">
                    <div className="header--title">
                        <h1>Admin</h1>
                    </div>
                    <div className="header--search">
                        <input
                            type="text"
                            placeholder="Nhập tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* <select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
                            <option value="products">Sản phẩm</option>
                            <option value="categories">Danh mục</option> 
                            <option value="users">Người dùng</option>
                        </select> */}
                        {/* <button onClick={handleSearch}> <i className="bi bi-search"></i>Tìm kiếm</button> */}


                    </div>
                </div>

                <div className="main--wrapper">
                    <Routes>
                        <Route path="/" element={<Statistics />} />
                        <Route path="products" element={<ProductList searchResults={searchResults} />} />
                        <Route path="product-add" element={<ProductAdd />} />
                        <Route path="productUpdate/:id" element={<ProductUpdate />} />
                        <Route path="category" element={<CategoryList />} />
                        <Route path="categoryAdd" element={<CategoryAdd />} />
                        <Route path="categoryUpdate/:id" element={<CategoryUpdate />} />
                        <Route path="comments" element={<Comments />} />
                        <Route path="order" element={<AdminOrder searchResults={searchResults} />} />
                        <Route path="customers" element={<Customer />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
