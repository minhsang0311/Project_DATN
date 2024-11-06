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
          <Link to="/lienhe">Liên hệ</Link>|
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
        <div>
        <form className="timkiem" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sản phẩm muốn tìm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        </div>
        <div className='giohang'>
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping"><h2>{totalQuantity > 0 ? totalQuantity : ''}</h2></i>
        </Link>
      </div>
      </div>
      <Nav />  
    </header>
  );
}

export default Header;
