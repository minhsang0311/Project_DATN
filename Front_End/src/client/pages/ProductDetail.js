import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate để điều hướng
import '../styles/components/ProductDetail.css'; // Đảm bảo bạn đã tạo tệp CSS tương ứng
import SPLienQuan from './RelatedProducts';
const ProductDetail = () => {
    const [mainImage, setMainImage] = useState(''); // Bỏ giá trị mặc định
    const [sp, setProduct] = useState(null); // Khởi tạo state để chứa thông tin sản phẩm
    const [error, setError] = useState(''); // State để lưu thông báo lỗi
    let { id } = useParams();
    const navigate = useNavigate(); // Sử dụng để điều hướng

    // Hàm xử lý khi click vào ảnh nhỏ
    const handleThumbnailClick = (src) => {
        setMainImage(src); // Đổi ảnh chính
    };

    // Lấy thông tin sản phẩm từ API
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productDetail/${id}`);
                const data = await response.json();
                if (data.message) {
                    setError(data.message); // Lưu thông báo lỗi
                } else {
                    setProduct(data); // Nếu tìm thấy sản phẩm thì lưu vào state
                    setMainImage(data.Image); // Gán ảnh sản phẩm chính từ API
                    setError(''); // Xóa lỗi nếu có
                }
            } catch (err) {
                setError('Đã xảy ra lỗi trong quá trình lấy dữ liệu sản phẩm.');
            }
        };
        fetchProductDetail();
    }, [id]);

    // Kiểm tra nếu có lỗi và hiển thị thông báo
    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Quay lại trang chủ</button> {/* Nút quay lại trang chủ */}
            </div>
        );
    }

    // Kiểm tra xem dữ liệu sản phẩm đã được tải chưa
    if (!sp) {
        return <div>Loading...</div>; // Hiển thị loading trong khi dữ liệu đang được lấy
    }

    return (
        <div className="container">
            <div className="home">
                <div className="spbanchay">
                    <div className="left-image">
                        {/* Ở đây bạn có thể thêm ảnh lớn */}
                    </div>

                    <div className="product-section">
                        <div className="product-image">
                            {/* Hiển thị ảnh chính từ API */}
                            <img id="mainImage" src={mainImage} alt="Sản phẩm" width="400px" />
                            <div className="thumbnail-images">
                                {/* Các ảnh thumbnail được lấy từ API, ở đây bạn có thể thêm các ảnh phụ từ sp */}
                                <img
                                    className="thumbnail"
                                    src={sp.Image} // Hiển thị ảnh từ API
                                    alt="Thumbnail 1"
                                    width="100px"
                                    onClick={() => handleThumbnailClick(sp.Image)} // Đổi ảnh chính khi click vào thumbnail
                                />
                                {/* Thêm các ảnh khác nếu cần, bạn có thể thêm một array các ảnh phụ từ API nếu có */}
                            </div>
                        </div>

                        <div className="product-info">
                            <h1 className="h3">{sp.Product_Name}</h1> {/* Hiển thị tên sản phẩm */}
                            <hr />
                            <p className= "h4">{sp.Description}</p>
                            <div className="price">
                                <p className="old-price">3.560.000đ</p>
                                <p>Giá: {Number(sp.Price).toLocaleString('vi')} VNĐ</p>
                            </div>
                            <button className="add-to-cart">Thêm vào giỏ</button>
                            <button className="buy-now">Mua ngay</button>
                        </div>
                    </div>
                </div>

                <div className="product-details">
                    <h3>Thông số kỹ thuật</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tên sản phẩm</td>
                                <td>{sp.Product_Name}</td>
                            </tr>
                            <tr>
                                <td>Hãng</td>
                                <td>{sp.Shop_Hidden}</td>
                            </tr>
                            <tr>
                                <td>Model</td>
                                <td>{sp.Product_ID}</td>
                            </tr>
                            <tr>
                                <td>Thông số</td>
                                <td>{sp.Description}</td>
                            </tr>
                            {/* Các thông số khác */}
                        </tbody>
                    </table>
                </div>
               
            </div> <div id="row2"> 
                    <SPLienQuan id={id} sosp={5} />
                </div>
        </div>
    );
};

export default ProductDetail;
