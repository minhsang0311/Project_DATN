
import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/components/HomeAdmin.css';
import ProductList from '../pages/productPage/ProductList';
import CategoryList from '../pages/categoryPage/CategoryList';
import CategoryAdd from '../pages/categoryPage/CategoryAdd';
import CategoryUpdate from '../pages/categoryPage/CategoryUpdate';
import ProductAdd from '../pages/productPage/ProductAdd';
import ProductUpdate from '../pages/productPage/ProductUpdate';
import Statistics from '../pages/Statistics/Statistics';
import Comments from '../pages/commentPage/commentList';

const HomeAdmin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn cần đăng nhập để truy cập trang này.');
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
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
                        <Link to="/customers">
                            <i className="bi bi-people"></i>
                            <span>Khách hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
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
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Nhập tìm kiếm..." />
                    </div>
                    <div className="user--info">
                        <div className="box-english">
                            <img src="img/english.svg" alt="" />
                            <select>
                                <option value="english">English</option>
                                <option value="vietnamese">Tiếng Việt</option>
                            </select>
                        </div>
                        <img src="img/logo.png" alt="" />
                    </div>
                </div>

                <div className="main--wrapper">
                    <Routes>
                        <Route path="/" element={<Statistics />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="product-add" element={<ProductAdd />} />
                        <Route path="productUpdate/:id" element={<ProductUpdate />} />
                        <Route path="category" element={<CategoryList />} />
                        <Route path="categoryAdd" element={<CategoryAdd />} />
                        <Route path="categoryUpdate/:id" element={<CategoryUpdate />} />
                        <Route path="comments" element={<Comments />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
