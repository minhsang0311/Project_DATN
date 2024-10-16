import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import '../styles/components/ProductDetail.css'; // Đảm bảo bạn tạo một tệp CSS tương ứng
import { useEffect } from 'react';
const ProductDetail = () => {
    // State để quản lý ảnh chính và trạng thái hiển thị của danh mục
    const [mainImage, setMainImage] = useState('../assets/img/sp1.webp');
    

    // Hàm xử lý khi click vào ảnh nhỏ
    const handleThumbnailClick = (src) => {
        setMainImage(src); // Đổi ảnh chính
    };

    let { id } = useParams();
    const [sp, ganSP] = useState([]);
    useEffect (()=>{
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url).then(res=>res.json()).then(data=> ganSP(data))
      },[id]);

    return (
        <div classNameName="container">
          
            <div className="home">
                <div className="spbanchay">
                    <div className="left-image">
                    <img src={sp["Image"]} alt={sp["ten_sp"]} />{" "}
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
                        <h1 className="h3"> {sp["Product_Name"]} </h1>
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
                                : {Number(sp["Price"]).toLocaleString("vi")} VNĐ
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
            
          
           
        </div>
    );
};

export default ProductDetail;
