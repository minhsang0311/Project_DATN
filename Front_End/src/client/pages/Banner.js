import { useEffect, useState } from 'react';
import '../styles/components/Banner.css';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 4; // Số lượng ảnh trong banner

  // Cập nhật banner khi currentIndex thay đổi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 4000); // Tự động chuyển ảnh sau mỗi 4 giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [totalImages]);

  const updateBanner = (index) => {
    setCurrentIndex(index);
  };

  const images = [
    '../assets/img/banner1.jpg',
    '../assets/img/banner2.jpg',
    '../assets/img/banner3.webp',
    '../assets/img/banner4.jpg',
  ];

  

  return (
    <div className="banner">
      <div className='trai'>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`poi ${index + 1}`}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}

        <div className="prev-next">
          <i className="fa-solid fa-chevron-left" id="prev"
            onClick={() => setCurrentIndex((currentIndex === 0 ? totalImages : currentIndex) - 1)}></i>
          
          <i className="fa-solid fa-chevron-right" id="next" 
            onClick={() => setCurrentIndex((currentIndex + 1) % totalImages)}></i>
        </div>

        <div className="indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => updateBanner(index)}
            ></div>
          ))}
          </div>
      </div>
      <div className='phai'>
        <img src="../assets/img/banner10.webp" alt="" />
        <img src="../assets/img/banner11.webp" alt="" />
      </div>
    </div>
  );
};

export default Banner;
