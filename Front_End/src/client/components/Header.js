import '../styles/components/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const [keyword, setKeyword] = useState(''); // State để lưu từ khóa tìm kiếm
    const navigate = useNavigate(); // Hook để điều hướng đến trang mới

    const handleSearch = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        if (keyword) {
            navigate(`/search?q=${keyword}`); // Điều hướng đến trang tìm kiếm với từ khóa
        }
    };

    return (
        <header>
            <div className="top">
                <ul>
                    <li><a href="gioithieu.html">Giới thiệu</a></li>
                    <Link to="/login">Đăng nhập</Link>
                    <li>Hướng dẫn</li>
                    <li>Bài viết</li>
                </ul>
                <ul>
                    <li>Liên hệ: <b>01234567</b></li>
                </ul>
            </div>
            <div className="bottom">
                <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='' />
                <div className="input">
                    <form className="d-flex ms-4" onSubmit={handleSearch}> {/* Sử dụng handleSearch khi submit */}
                        <input 
                            type="text" 
                            name="keyword" 
                            placeholder="Sản phẩm muốn tìm..." 
                            value={keyword} 
                            onChange={(e) => setKeyword(e.target.value)} 
                        />
                        <button className="btn btn-outline-success" type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>      
                </div>
                <div className="phai">
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;
