import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../styles/components/Header.css';
import { useSelector } from 'react-redux';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Điều hướng với query
    }
  };

  const cartItems = useSelector((state) => state.cart.items);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header>
      <div className="top">
        <ul className="trai">
          <Link to="/about">Giới thiệu</Link>|
          <Link to="/tintuc">Tin tức</Link>|
          <li>
            <a href="/#">
              Hotline: <span><b>077718379</b></span>
            </a>
          </li>
        </ul>
        <ul className="phai1">
          <li><Link to="/register_login">Đăng kí</Link></li>|
        </ul>
      </div>
      <hr className="hr" />
      <div className="middle">
        <div className="logo_trangchu">
          <img src="assets/img/logo3.png" alt="Logo" />
        </div>
        <form className="timkiem" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sản phẩm muốn tìm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="bottom">
          <Link to="/productsaddtocart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <hr className="hr" />
          <div className="middle">
            <div className="logo_trangchu">
              <img src="assets/img/logo3.png" alt="" />
            </div>
            <div className="input">
              <input type="text" placeholder="Sản phẩm muốn tìm..." />
              <i className="fa-solid fa-magnifying-glass"></i>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping">{totalQuantity > 0 ? totalQuantity : ''}</i>
              </Link>
            </div>
            <div classNameName="bottom">
              <div classNameName="phai">
                <i classNameName="fa-solid fa-user"></i>
              </div>
              <Link to="/productsaddtocart"><i classNameName="fa-solid fa-cart-shopping"></i></Link>

            </div>
          </div>
        </div>
        <Nav />
        </div>
    </header>
  );
}

export default Header;
