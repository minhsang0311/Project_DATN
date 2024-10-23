import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/components/Nav.css'
function Nav() {
    const [isDanhMucOpen, setIsDanhMucOpen] = useState(false);

    const toggleDanhMuc = () => {
        setIsDanhMucOpen(!isDanhMucOpen);
    };

    return (
        <nav>
            <div className="menu-doc">
                <div className="danh-muc" onclick={toggleDanhMuc}><i className="fa-solid fa-bars"></i> Danh mục</div>
                <ul id="danh-muc-list">
                    <li><i className="fa-solid fa-laptop"></i><a href="/#">Danh mục 1</a></li>
                    <li><i className="fa-solid fa-mobile"></i><a href="/#">Danh mục 2</a></li>
                    <li><i className="fa-solid fa-tv"></i><a href="/#">Danh mục 3</a></li>
                    <li><i className="fa-solid fa-headphones"></i><a href="/#">Danh mục 4</a></li>
                    <li><i className="fa-solid fa-tablet"></i><a href="/#">Danh mục 5</a></li>
                    <li><i className="fa-solid fa-microchip"></i><a href="/#">Danh mục 6</a></li>
                    <li><i className="fa-solid fa-camera"></i><a href="/#">Danh mục 7</a></li>
                    <li><i className="fa-solid fa-gamepad"></i><a href="/#">Danh mục 8</a></li>
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
                    <img src="../img/banner1.jpg" className="active" alt=''/>
                    <img src="../img/banner2.webp" alt=''/>
                    <img src="../img/banner3.jpg" alt=''/>
                    <img src="../img/banner4.jpg" alt=''/>

                    <div className="nav">
                        <i className="fa-solid fa-chevron-left" id="prev"></i>
                        <i className="fa-solid fa-chevron-right" id="next"></i>
                    </div>

                    <div className="indicators">
                        <div className="dot active" data-index="0"></div>
                        <div className="dot" data-index="1"></div>
                        <div className="dot" data-index="2"></div>
                        <div className="dot" data-index="3"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;