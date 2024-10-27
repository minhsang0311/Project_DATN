import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import '../styles/components/Header.css';

function Header() {
  return (
    <header>
        <div className="top">
          <ul className="trai">
            <Link to="/about">Giới thiệu</Link>|
            <Link to="/tintuc">Tin tức</Link>|
            <li><a href="/#">Holine : <span><b>077718379</b></span></a></li>
          </ul>
          <ul className="phai1">
            <li><a href="/#">Đăng kí</a></li>|
            <li><a href="/#">Đăng nhập</a></li>
          </ul>
        </div>
        <hr className="hr"/>
        <div className="middle">
            <div className="logo_trangchu">
              <img src="assets/img/logo3.png" alt="logo" />
            </div>
            <div className="input">
                <input type="text" placeholder="Sản phẩm muốn tìm..." />
                <i className="fa-solid fa-magnifying-glass"></i> 
            <i className="fa-solid fa-cart-shopping"></i>
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