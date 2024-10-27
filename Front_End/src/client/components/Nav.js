import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Nav.css';
const Nav = () =>{
    const [list, ganListLoai] = useState( [] );
    useEffect ( () => {
        fetch(`http://localhost:3000/user/categoryList`)
        .then(res=>res.json())
        .then( data => ganListLoai(data) );
    } , []);

<<<<<<< HEAD
    return(
        <div className="bottom_trangchu">
            <ul className="menu_trangchu"> 
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/cuahang">Cửa hàng</Link></li>
                { list.map( (loai, index)=>{ return (
                    <li key={index}>
                        <Link to = { "/loai/" + loai.Category_ID }>{loai.Category_Name}</Link> 
                    </li>
                )})
                }
            </ul>
        </div>
    )
=======
function Nav() {
    const [isDanhMucOpen, setIsDanhMucOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [categories, setCategories] = useState([]);  // Lưu trữ danh mục sản phẩm từ API

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

    // Gọi API để lấy danh mục sản phẩm
    useEffect(() => {
        fetch("http://localhost:3000/user/category")  
            .then((res) => res.json())
            .then((data) => setCategories(data))  // Lưu danh mục vào state
            .catch((err) => console.log("Lỗi lấy danh mục:", err));
    }, []);

    return (
        <nav>
            <div className="menu-doc">
                <div className="danh-muc" onClick={toggleDanhMuc}>
                    <i className="fa-solid fa-bars"></i> Danh mục
                </div>
                {isDanhMucOpen && (
                    <ul id="danh-muc-list">
                        {categories.map((category) => (
                            <li key={category.Category_ID}>
                                <i className="fa-solid fa-laptop"></i>
                                <Link to={`/category/${category.Category_ID}`}>
                                    {category.Category_Name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="menu-ngang-banner">
                <ul className="menu-ngang">

                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/shop">CỬA HÀNG</Link></li>
                    {categories.slice(0, 6).map((category) => (  // Hiển thị 5 danh mục đầu
                        <li key={category.Category_ID}>
                            <Link to={`/category/${category.Category_ID}`}>{category.Category_Name}</Link>
                        </li>
                    ))}

                  

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
>>>>>>> fe753cdf80419924f9e394cf48b851567b1a2e75
}
export default Nav;