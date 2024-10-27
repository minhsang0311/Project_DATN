import { useEffect, useState } from 'react';
import '../styles/components/Banner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDanhMucVisible, setIsDanhMucVisible] = useState(false);
  const totalImages = 4;
  const [list, ganListLoai] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/user/categoryList`)
      .then((res) => res.json())
      .then((data) => ganListLoai(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalImages]);

  const images = [
    '../assets/img/banner1.jpg',
    '../assets/img/banner2.jpg',
    '../assets/img/banner3.webp',
    '../assets/img/banner4.jpg',
  ];

  const toggleDanhMuc = () => {
    setIsDanhMucVisible(!isDanhMucVisible);
  };

  return (
    <div className="banner">
      {/* Menu danh mục */}
      <div className="menu-doc">
        <div className="danh-muc" onClick={toggleDanhMuc}>
          <i className="fa-solid fa-bars"></i> <p>Danh mục</p>
        </div>

        <ul
          id="danh-muc-list"
          style={{ display: isDanhMucVisible ? 'block' : 'none' }}
        >
          {list.map((loai, index) => (
            <li key={index}>
              <Link to={`/loai/${loai.Category_ID}`}>{loai.Category_Name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Banner chính */}
      <div className="trai">
        <div className="image-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Banner ${index + 1}`}
              className="banner-image"
            />
          ))}
        </div>


        {/* Nút chuyển ảnh */}
        <div className="prev-next">
          <i
            className="fa-solid fa-chevron-left"
            onClick={() =>
              setCurrentIndex((currentIndex === 0 ? totalImages : currentIndex) - 1)
            }
          ></i>
          <i
            className="fa-solid fa-chevron-right"
            onClick={() => setCurrentIndex((currentIndex + 1) % totalImages)}
          ></i>
        </div>

        {/* Chỉ báo ảnh */}
        <div className="indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      </div>

  );
};

export default Banner;
