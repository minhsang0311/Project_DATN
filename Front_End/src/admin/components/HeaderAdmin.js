import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HeaderAdmin = () => {
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
        <header>
            <header className="admin-header">
                <h2>Admin Panel</h2>
                <nav>
                    <Link to="/admin" className="App-link">Dashboard</Link>
                    <Link to="/admin/sp" className="App-link">Danh Sách Sản Phẩm</Link>
                    <Link to="/admin/spthem" className="App-link">Thêm Sản Phẩm</Link>
                    <Link to="/admin/spsua" className="App-link">Sửa Sản Phẩm</Link>
                    {/* Thêm các link admin khác nếu cần */}
                </nav>
            </header>
            <button onClick={handleLogout}>Đăng Xuất</button>
        </header>
    );
};

export default HeaderAdmin;
