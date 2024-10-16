
import { Link } from "react-router-dom"
const Header = () => {
    return (
        <header className="App-header">

          <Link to="/" className="App-link">Trang Chủ</Link>
          <Link to="/product-detail" className="App-link">Xem Chi Tiết Sản Phẩm</Link>
          <Link to="/register" className="App-link">Đăng ký</Link>
          <Link to="/login" className="App-link">Đăng nhập</Link>
        </header>
    )
}
export default Header;