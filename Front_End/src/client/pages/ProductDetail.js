import React, { useState } from 'react';
import '../styles/components/ProductDetail.css'; // Đảm bảo bạn tạo một tệp CSS tương ứng

const ProductDetail = () => {
    // State để quản lý ảnh chính và trạng thái hiển thị của danh mục
    const [mainImage, setMainImage] = useState('../assets/img/sp1.webp');
    const [isDanhMucOpen, setIsDanhMucOpen] = useState(false);

    // Hàm xử lý khi click vào ảnh nhỏ
    const handleThumbnailClick = (src) => {
        setMainImage(src); // Đổi ảnh chính
    };

    // Hàm bật/tắt hiển thị danh mục
    const toggleDanhMuc = () => {
        setIsDanhMucOpen(!isDanhMucOpen); // Đổi trạng thái hiển thị của danh mục
    };

    return (
        <div classNameName="container">
            <header>
                <div className="top">
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Hỗ trợ</li>
                        <li>Hướng dẫn</li>
                        <li>Bài viết</li>
                    </ul>
                    <ul>
                        <li>Liên hệ: <b>01234567</b></li>
                    </ul>
                </div>
                <div className="bottom">
                    <img alt="" src="../assets/img/logo.png" />
                    <div className="phai">
                        <div className="input">
                            <input type="text" placeholder="Sản phẩm muốn tìm..." style={{ fontSize: '15px' }} />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <i className="fa-solid fa-user"></i>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
                <nav>
                    <div className="menu-doc">
                        <div className="danh-muc" onClick={toggleDanhMuc}>
                            <i className="fa-solid fa-bars"></i> Danh mục
                        </div>
                        <ul id="danh-muc-list" style={{ display: isDanhMucOpen ? 'block' : 'none' }}>
                            <li><i className="fa-solid fa-laptop"></i> Danh mục 1</li>
                            <li><i className="fa-solid fa-mobile"></i> Danh mục 2</li>
                            <li><i className="fa-solid fa-tv"></i> Danh mục 3</li>
                            <li><i className="fa-solid fa-headphones"></i> Danh mục 4</li>
                            <li><i className="fa-solid fa-tablet"></i> Danh mục 5</li>
                            <li><i className="fa-solid fa-microchip"></i> Danh mục 6</li>
                            <li><i className="fa-solid fa-camera"></i> Danh mục 7</li>
                            <li><i className="fa-solid fa-gamepad"></i> Danh mục 8</li>
                        </ul>
                    </div>
                    <div className="menu-ngang-banner">
                        <ul className="menu-ngang">
                            <li>TRANG CHỦ</li>
                            <li>CỬA HÀNG</li>
                            <li>DANH MỤC 1</li>
                            <li>DANH MỤC 2</li>
                            <li>DANH MỤC 3</li>
                            <li>DANH MỤC 4</li>
                            <li>DANH MỤC 5</li>
                        </ul>
                        <div className="banner">
                            <img alt="" src="../assets/img/banner1.jpg" />
                        </div>
                    </div>
                </nav>
            </header>
            <div className="home">
                <div className="spbanchay">
                    <div className="left-image">
                        <img alt="" src="../assets/img/banner1.jpg" />
                    </div>

                    {/* <div className="breadcrumbs">
                        <p>Trang chủ  Đồ gia dụng  Máy xay sinh tố</p>
                    </div> */}

                    <div className="product-section">
                        <div className="product-image">
                            <img id="mainImage" src={mainImage} alt="Sản phẩm" width="400px" />
                            <div className="thumbnail-images">
                                <img className="thumbnail" src="../assets/img/sp1.webp" alt="Thumbnail 1" width="100px" onClick={() => handleThumbnailClick('../assets/img/sp1.webp')} />
                                <img className="thumbnail" src="../assets/img/sp2.jpg" alt="Thumbnail 2" width="100px" onClick={() => handleThumbnailClick('../assets/img/sp2.jpg')} />
                                <img className="thumbnail" src="../assets/img/sp3.webp" alt="Thumbnail 3" width="100px" onClick={() => handleThumbnailClick('../assets/img/sp3.webp')} />
                                <img className="thumbnail" src="../assets/img/sp4.jpg" alt="Thumbnail 4" width="100px" onClick={() => handleThumbnailClick('../assets/img/sp4.jpg')} />
                            </div>
                        </div>

                        <div className="product-info">
                            <h1>Máy xay sinh tố BLACK FRIDAY SIÊU SALE</h1>
                            <hr />
                            <p>– CHỈ TRONG DỊP BLACK FRIDAY 23/11</p>
                            <p>– Mã sp: HP 308H</p>
                            <p>– Trọng lượng: 5,5kg</p>
                            <p>– Dung tích cối đựng: 1,75 lít</p>
                            <p>– Công suất nấu 800W; Công suất xay: tối đa 1450W</p>
                            <p>– Tốc độ vòng quay: 45.000 vòng/phút</p>
                            <p>– Công dụng: Xay, nấu thực phẩm đa năng (cháo, súp, thịt, xương, sinh tố, đá …)</p>
                            <p>– Màu: Đỏ mận – Xuất xứ: ĐÀI LOAN</p>
                            <div className="price">
                                <p className="old-price">3.560.000đ</p>
                                <p className="sale-price">3.150.000đ</p>
                            </div>
                            <button className="add-to-cart">Thêm vào giỏ</button>
                            <button className="buy-now">Mua ngay</button>
                        </div>
                    </div>
                </div>
                </div>
                <div className="product-details">
                    <h3>Thông số kỹ thuật</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tên sản phẩm</td>
                                <td>Máy xay nấu đa năng Haipai HP 308H</td>
                            </tr>
                            <tr>
                                <td>Hãng</td>
                                <td>Promix</td>
                            </tr>
                            <tr>
                                <td>Model</td>
                                <td>PM-9003</td>
                            </tr>
                            <tr>
                                <td>Chất liệu</td>
                                <td>Thân máy kim loại, nhựa, nút bấm cơ</td>
                            </tr>
                            <tr>
                                <td>Công suất đầu vào</td>
                                <td>1200W</td>
                            </tr>
                            <tr>
                                <td>Dung tích chứa</td>
                                <td>2 lít</td>
                            </tr>
                            <tr>
                                <td>Điện áp/Tần số</td>
                                <td>220 V – 50Hz</td>
                            </tr>
                            <tr>
                                <td>Trọng lượng</td>
                                <td>4 Kg</td>
                            </tr>
                            <tr>
                                <td>Kích thước</td>
                                <td>32 x 28 x 52,5 Cm</td>
                            </tr>
                            <tr>
                                <td>Tính năng</td>
                                <td>
                                    <p>- Máy xay công nghiệp Promix 9003 được cấp bằng sáng chế về tốc độ và thời gian xay</p>
                                    <p>- Vỏ chống ổn có thể giảm 60% tiếng ồn khi xay</p>
                                    <p>- Màn hình LED có hiển thị thời gian xay và tốc độ xay</p>
                                    <p>- Chế độ phá đá để trộn, xay các nguyên liệu đặc biệt</p>
                                    <p>- Lưỡi dao sắc bén và bền bỉ</p>
                                    <p>- Động cơ mạnh mẽ đảo bảo xay trộn được tất cả các nguyên liệu.</p>
                                    <p>- Bảo vệ an toàn gấp 3 lần máy xay bình thường</p>
                                    <p>- Xay được nhiều loại thực phẩm</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="comment-section">
                    <h3>Bình luận</h3>
                    <div className="comment">
                        <strong>Nguyễn Văn A:</strong>
                        <p>Sản phẩm rất tốt, chất lượng đúng như quảng cáo!</p>
                    </div>
                    <div className="comment">
                        <strong>Nguyễn Văn B:</strong>
                        <p>Giao hàng nhanh, đóng gói cẩn thận!</p>
                    </div>
                    <textarea placeholder="Viết bình luận..." rows="3"></textarea>
                    <button className="submit-comment">Gửi bình luận</button>
                </div>
            
            <div class="products">
                <div className="header">
                    <h1>Sản phẩm liên quan</h1>
                    <div className="xem_them">
                        <h5>Xem thêm</h5>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
                <div className="product-list">
                    <div className="product">
                        <div className="discount-label">-20%</div>
                        <div className="img-wrapper">
                            <img alt="" src="../assets/img/sp1.webp" />
                        </div>
                        <h1>name product</h1>
                        <div className="price">
                            <p className="old-price">900,000đ</p>
                            <p className="new-price">765,000đ</p>
                        </div>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                    <div className="product">
                        <div className="discount-label">-20%</div>
                        <div className="img-wrapper">
                            <img alt="" src="../assets/img/sp1.webp" />
                        </div>
                        <h1>name product</h1>
                        <div className="price">
                            <p className="old-price">900,000đ</p>
                            <p className="new-price">765,000đ</p>
                        </div>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                    <div className="product">
                        <div className="discount-label">-20%</div>
                        <div className="img-wrapper">
                            <img alt="" src="../assets/img/noi2.jpg" />
                        </div>
                        <h1>name productproduct product product </h1>
                        <div className="price">
                            <p className="old-price">900,000đ</p>
                            <p className="new-price">765,000đ</p>
                        </div>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                    <div className="product">
                        <div className="discount-label">-20%</div>
                        <div className="img-wrapper">
                            <img alt="" src="../assets/img/sp1.webp" />
                        </div>
                        <h1>name product</h1>
                        <div className="price">
                            <p className="old-price">900,000đ</p>
                            <p className="new-price">765,000đ</p>
                        </div>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                    <div className="product">
                        <div className="discount-label">-20%</div>
                        <div className="img-wrapper">
                            <img alt="" src="../assets/img/sp1.webp" />
                        </div>
                        <h1>name product</h1>
                        <div className="price">
                            <p className="old-price">900,000đ</p>
                            <p className="new-price">765,000đ</p>
                        </div>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                </div>

            </div>
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
        </footer>
        </div>
    );
};

export default ProductDetail;
