import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../styles/components/Header.css';

function Header() {
  return (
    <header>
        <div class="top">
          <ul class="trai">
            <Link to="/about">Giới thiệu</Link>|
            <Link to="/tintuc">Tin tức</Link>|
            <li><a href="/#">Holine : <span><b>077718379</b></span></a></li>
          </ul>
          <ul class="phai1">
            <li><a href="/#">Đăng kí</a></li>|
            <li><a href="/#">Đăng nhập</a></li>
          </ul>
        </div>
        <hr class="hr"/>
        <div class="middle">
            <div class="logo_trangchu">
              <img src="assets/img/logo3.png" alt="logo" />
            </div>
            <div class="input">
                <input type="text" placeholder="Sản phẩm muốn tìm..." />
                <i class="fa-solid fa-magnifying-glass"></i> 
            </div>
            <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <Menu/>
    </header>
  );
}

export default Header;