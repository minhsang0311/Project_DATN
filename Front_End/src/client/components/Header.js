
import '../styles/components/Header.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header>
             <div className="top">
                <ul>
                    <li><a href="gioithieu.html">Giới thiệu</a></li>
                    <Link to="/login">Đăng nhập</Link>
                    <li>Hướng dẫn</li>
                    <li>Bài viết</li>
                </ul>
                <ul>
                    <li>Liên hệ: <b>01234567</b></li>
                </ul>
            </div>
            <div className="bottom">
                <img src="../img/logo.png" alt=''/>
                <div className="input">
                    <input type="text" placeholder="Sản phẩm muốn tìm..."/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="phai">
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;