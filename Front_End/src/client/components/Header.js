import React, { useState } from 'react';

function Header() {
    const [isDanhMucOpen, setIsDanhMucOpen] = useState(false);

    const toggleDanhMuc = () => {
        setIsDanhMucOpen(!isDanhMucOpen);
    };

    return (
        <header>
            <div className="top">
                <ul>
                    <li>Giới thiệu</li>
                    <li>Hỗ trợ</li>
                    <li>Hướng dẫn</li>
                    <li>Bài viết</li>
                </ul>
                <ul>
                    <li>Liên hệ: <b>01234567</b></li>
                </ul>
            </div>
            <div className="bottom">
                <img alt="" src="../assets/img/logo.png" />
                <div className="phai">
                    <div className="input">
                        <input type="text" placeholder="Sản phẩm muốn tìm..." style={{ fontSize: '15px' }} />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
            <nav>
                <div className="menu-doc">
                    <div className="danh-muc" onClick={toggleDanhMuc}>
                        <i className="fa-solid fa-bars"></i> Danh mục
                    </div>
                    <ul id="danh-muc-list" style={{ display: isDanhMucOpen ? 'block' : 'none' }}>
                        <li><i className="fa-solid fa-laptop"></i> Danh mục 1</li>
                        <li><i className="fa-solid fa-mobile"></i> Danh mục 2</li>
                        <li><i className="fa-solid fa-tv"></i> Danh mục 3</li>
                        <li><i className="fa-solid fa-headphones"></i> Danh mục 4</li>
                        <li><i className="fa-solid fa-tablet"></i> Danh mục 5</li>
                        <li><i className="fa-solid fa-microchip"></i> Danh mục 6</li>
                        <li><i className="fa-solid fa-camera"></i> Danh mục 7</li>
                        <li><i className="fa-solid fa-gamepad"></i> Danh mục 8</li>
                    </ul>
                </div>
                <div className="menu-ngang-banner">
                    <ul className="menu-ngang">
                        <li>TRANG CHỦ</li>
                        <li>CỬA HÀNG</li>
                        <li>DANH MỤC 1</li>
                        <li>DANH MỤC 2</li>
                        <li>DANH MỤC 3</li>
                        <li>DANH MỤC 4</li>
                        <li>DANH MỤC 5</li>
                    </ul>
                    <div className="banner">
                        <img alt="" src="../assets/img/banner1.jpg" />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
