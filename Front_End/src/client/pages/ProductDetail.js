import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/components/ProductDetail.css'; // Đảm bảo bạn đã tạo tệp CSS tương ứng
import SPLienQuan from './RelatedProducts';

const ProductDetail = () => {
    const [mainImage, setMainImage] = useState('');
    const [sp, setProduct] = useState(null);
    const [error, setError] = useState('');
    let { id } = useParams();
    const navigate = useNavigate();

    const handleThumbnailClick = (src) => {
        setMainImage(src);
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/productDetail/${id}`);
                const data = await response.json();
                if (data.message) {
                    setError(data.message);
                } else {
                    setProduct(data);
                    setMainImage(data.Image);
                    setError('');
                }
            } catch (err) {
                setError('Đã xảy ra lỗi trong quá trình lấy dữ liệu sản phẩm.');
            }
        };
        fetchProductDetail();
    }, [id]);

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Quay lại trang chủ</button>
            </div>
        );
    }

    if (!sp) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-images">
                    <div className="main-image">
                        <img id="mainImage" src={mainImage} alt="Sản phẩm" width="400px" />
                    </div>

                    <div className="thumbnail-images">
                        <img
                            className="thumbnail"
                            src={sp.Image}
                            alt="Thumbnail 1"
                            width="100px"
                            onClick={() => handleThumbnailClick(sp.Image)}
                        />
                        {/* Thêm các ảnh khác nếu cần */}
                    </div>
                </div>

                <div className="product-info">
                    <h1 className="product-title">{sp.Product_Name}</h1>
                    <hr />
                    <p className="product-description">{sp.Description}</p>
                    <div className="product-price">
                        <p className="old-price">3.560.000đ</p>
                        <p>Giá: {Number(sp.Price).toLocaleString('vi')} VNĐ</p>
                    </div>
                    <button className="btn-add-to-cart">Thêm vào giỏ</button>
                    <button className="btn-buy-now">Mua ngay</button>
                </div>
            </div>

            <div className="product-specifications">
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
                            <td>Thông số</td>
                            <td>{sp.Description}</td>
                        </tr>
                        {/* Các thông số khác */}
                    </tbody>
                </table>
            </div>
           
            <div className="related-products">
                <SPLienQuan id={id} sosp={5} />
            </div>
        </div>
    );
};

export default ProductDetail;
    