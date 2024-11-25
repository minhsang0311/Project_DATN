import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../styles/components/Header.css';
import { useSelector } from 'react-redux';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState(null);//Lấy thông tin người dùng từ localStorage
  const [showDropdown, setShowDropdown] = useState(false);//Hiện mune dropdown
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Điều hướng với query
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser); // Parse chuỗi JSON từ localStorage
      if (user.role === 0) {
        setUserName(user.username); // Lấy tên người dùng từ dữ liệu và lưu vào state
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('user');
    setUserName(null);
    navigate('/');
  };

  const cartItems = useSelector((state) => state.cart.items);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <div className="top">
        <ul className="trai">
          <Link to="/about">Giới thiệu</Link>|
          <Link to="/contact">Liên hệ</Link>|
          <li>
            <a href="/#">
              Hotline: <span><b>077718379</b></span>
            </a>
          </li>
        </ul>
  <ul className="phai1">
    {userName ? (
      <li
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        Xin chào, {userName}
        {showDropdown && (
          <div className="dropdown">
            <Link to="/change-password" className='change-pw'>Đổi mật khẩu</Link>
            <button onClick={handleLogout}>Thoát</button>
          </div>
        )}
      </li>
    ) : (
      <li><Link to="">Xin chào!</Link></li>
    )}
  </ul>
      </div >
      <hr className="hr" />
      <div className="middle">
        <div className="logo_trangchu">
          <img src="../assets/img/logo3.png" alt="Logo" />
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
        <div className="icon_user">
          <Link to="/register_login">
            <i className="fa-solid fa-user fa-2x"></i>
          </Link>
        </div>
        <div className='giohang'>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping">{totalQuantity > 0 ? totalQuantity : ''}</i>
          </Link>
        </div>
        <div className='trangthai'>
        <Link to="/order"><i className="bi bi-truck"></i></Link></div>
      </div>
      <Nav />
    </header >
  );
}

export default Header;
