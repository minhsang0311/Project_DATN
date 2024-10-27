import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../styles/components/Header.css';
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
          <ul className="trai">
            <Link to="/about">Giới thiệu</Link>|
            <Link to="/tintuc">Tin tức</Link>|
            <li><a href="/#">Holine : <span><b>077718379</b></span></a></li>
          </ul>
          <ul className="phai1">
            <li><Link to="/register">Đăng kí</Link></li>|
            {/* <li><Link to="/login">Đăng nhập</Link></li> */}
          </ul>
        </div>
        <hr className="hr"/>
        <div className="middle">
            <div className="logo_trangchu">
              <img src="assets/img/logo3.png" alt="" />
            </div>
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
          <div classNameName="bottom">       
              <div classNameName="phai">
                  <i classNameName="fa-solid fa-user"></i>
              </div>
              <Link to="/productsaddtocart"><i classNameName="fa-solid fa-cart-shopping"></i></Link>

            </div>
        </div>
        <Nav/>
    </header>
  );
}

export default Header;