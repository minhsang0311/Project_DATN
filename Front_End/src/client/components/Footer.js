import React from "react"
import '../styles/components/Footer.css'
function Footer() {
    return (
        <div className="hrr">
            <hr></hr>
            <footer className="footer">
                <div className="footer-column">
                    <h3>Địa chỉ</h3>
                    <p> - Chi nhánh 1 : Phần mềm Quang Trung, Phường Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh</p>
                    <p> - Chi nhánh 2 : 54 Đông An, Tân Đông Hiệp, Dĩ An, Bình Dương</p>
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
                    <p> Chính sách bảo mật thông tin cá nhân</p>
                    <p> Tin tức Khuyến mại</p>
                </div>
                <div className="footer-column">
                    <h3>Kết nối với chúng tôi</h3>
                    <p>Facebook: HomeNestVN</p>
                    <p>Instagram: @homenest</p>
                    <p>Email: HomeNest@gmail.com</p>
                    <p>ĐT: 0981.599.399</p>                    
                </div>
            </footer>
        </div>
        );
}
export default Footer;
