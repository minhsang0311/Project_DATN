import React from "react"
import '../styles/components/Footer.css'
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-column">
                <h3>Địa chỉ</h3>
                <p>ĐT: 0981.599.399</p>
                <p>17/20, ngõ Tân Lạc, Đại La, Hai Bà Trưng, Hà Nội</p>
                <p>54 Đông An, Tân Đông Hiệp, Dĩ An, Bình Dương</p>
                <p>Bình Dương</p>
                <p>Email: thegioigiadungonline.vn@gmail.com</p>
            </div>
            <div className="footer-column">
                <h3>Đại lý – Hỗ trợ</h3>
                <p> DANH SÁCH CÁC ĐẠI LÝ</p>
                <p> Hướng dẫn mua hàng</p>
                <p> Hướng dẫn mua trả góp</p>
                <p> Hỗ trợ khách hàng</p>
            </div>
            <div className="footer-column">
                <h3>Chính sách</h3>
                <p> Quy định, chính sách</p>
                <p> Chính sách bảo hành – đổi trả</p>
                <p> Giao hàng và lắp đặt</p>
                <p> Chính sách bảo mật TT cá nhân</p>
                <p> Tin tức Khuyến mại</p>
            </div>
            <div className="footer-column">
                <h3>Đăng ký nhận ưu đãi</h3>
                <p>Hãy đăng ký email của bạn để cập nhật thông tin khuyến mại nhanh nhất</p>
                <input type="email" placeholder="Nhập email của bạn" />
                <button>Đăng ký</button>
            </div>
        </footer>);
}
export default Footer;