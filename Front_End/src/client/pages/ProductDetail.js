import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Thêm useSelector
import '../styles/components/ProductDetail.css';
import SPLienQuan from './RelatedProducts';
import Comments from './Comments';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addToCart } from './cartSlice';

const ProductDetail = ({ product }) => {
    const [mainImage, setMainImage] = useState('');
    const [sp, setProduct] = useState(null);
    const [error, setError] = useState('');
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy dữ liệu giỏ hàng từ Redux Store
    const cartItems = useSelector((state) => state.cart.items); // Đặt ở đây

    // Lấy dữ liệu từ localStorage khi component được mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        savedCart.forEach(item => {
            dispatch(addToCart(item));
        });
    }, [dispatch]); // Đặt useEffect ở đây

    const handleThumbnailClick = (src) => {
        setMainImage(src);
    };

    // Hàm thêm vào giỏ hàng
    const handleAddToCart = () => {
        const cartItem = {
            id: sp.Product_ID,
            image: sp.Image,
            name: sp.Product_Name,
            price: sp.Price,
        };
        dispatch(addToCart(cartItem));

        // Lưu vào localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    };

    // Lấy dữ liệu chi tiết sản phẩm
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
        <Fragment>
            <Header />
            <div className="home">
                <div className="spchitiet">
                    <div className="left-image">
                        <img src="/assets/img/banner4.jpg" alt="" />
                    </div>
                    <div className="right-products">
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
                                <button onClick={handleAddToCart} className="btn-add-to-cart">Thêm vào giỏ</button>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Comments productId={id} />
                <div className="related-products">
                    <SPLienQuan id={id} sosp={5} />
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
