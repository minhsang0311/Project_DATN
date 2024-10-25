import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Nav.css';

function Nav() {
    const [isDanhMucOpen, setIsDanhMucOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        `${process.env.PUBLIC_URL}/assets/img/banner1.jpg`,
        `${process.env.PUBLIC_URL}/assets/img/banner2.webp`,
        `${process.env.PUBLIC_URL}/assets/img/banner3.jpg`,
        `${process.env.PUBLIC_URL}/assets/img/banner4.jpg`
    ];

    const toggleDanhMuc = () => {
        setIsDanhMucOpen(!isDanhMucOpen);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Chuyển đổi hình ảnh mỗi 3 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
    }, [images.length]);

    return (
        <nav>
            <div className="menu-doc">
                <div className="danh-muc" onClick={toggleDanhMuc}>
                    <i className="fa-solid fa-bars"></i> Danh mục
                </div>
                {isDanhMucOpen && (
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
                )}
            </div>
            <div className="menu-ngang-banner">
                <ul className="menu-ngang">
                    <li>
                        TRANG CHỦ
                    </li>
                    <li>CỬA HÀNG</li>
                    <li>DANH MỤC 1</li>
                    <li>DANH MỤC 2</li>
                    <li>DANH MỤC 3</li>
                    <li>DANH MỤC 4</li>
                    <li>DANH MỤC 5</li>
                </ul>
                <div className="banner">
                    <img src={images[currentImageIndex]} className="active" alt='' />
                    <div className="nav">
                        <i 
                            className="fa-solid fa-chevron-left" 
                            id="prev" 
                            onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
                        ></i>
                        <i 
                            className="fa-solid fa-chevron-right" 
                            id="next" 
                            onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
                        ></i>
                    </div>
                    <div className="indicators">
                        {images.map((_, index) => (
                            <div 
                                key={index} 
                                className={`dot ${index === currentImageIndex ? 'active' : ''}`} 
                                data-index={index} 
                                onClick={() => setCurrentImageIndex(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
