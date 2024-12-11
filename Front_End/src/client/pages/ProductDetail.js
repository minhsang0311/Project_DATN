import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/components/ProductDetail.css';
import SPLienQuan from './RelatedProducts';
import Comments from './Comments';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addToCart } from './cartSlice';

const ProductDetail = () => {
    const [mainImage, setMainImage] = useState('');
    const [sp, setProduct] = useState(null);
    const [images, setImages] = useState([]); // Thêm state cho danh sách ảnh
    const [error, setError] = useState('');
    let { id } = useParams();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

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
                    setMainImage(data.Image); // Đặt hình ảnh chính mặc định
                    setImages(data.images);   // Lấy danh sách ảnh từ API
                    setError('');
                }
            } catch (err) {
                setError('Đã xảy ra lỗi trong quá trình lấy dữ liệu sản phẩm.');
            }
        };
        fetchProductDetail();
    }, [id]);

    // Kiểm tra giỏ hàng từ localStorage khi tải lại trang, tránh thêm lại sản phẩm
    useEffect(() => {
        if (sp) {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const isProductInCart = savedCart.find(item => item.id === sp.Product_ID);

            // Nếu sản phẩm đã có trong giỏ hàng, chỉ cần không thêm vào nữa
            if (!isProductInCart) {
                localStorage.setItem('cart', JSON.stringify(savedCart));
            }
        }
    }, [sp]); // Chỉ gọi effect này khi sp thay đổi

    const handleThumbnailClick = (src) => {
        setMainImage(src);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: sp?.Product_ID,
            image: sp?.Image,
            name: sp?.Product_Name,
            price: sp?.Price,
            quantity: 1, // Đảm bảo số lượng là 1 khi thêm vào
        };

        // Lấy giỏ hàng hiện tại từ localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = currentCart.find(item => item.id === cartItem.id);

        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push(cartItem); // Thêm sản phẩm mới vào giỏ
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));

        // Dispatch hành động thêm sản phẩm vào Redux
        dispatch(addToCart(cartItem));

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // Hiện thông báo trong 3 giây
    };

    const handleBuyNow = () => {
        const productDetails = {
            id: sp.Product_ID,
            image: sp.Image,
            name: sp.Product_Name,
            price: sp.Price,
            quantity: 1,
        };

        navigate('/payment', { state: { productDetails } });
    };

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
                <div className='thanh-dieu-huong'>
                    <Link to="/"><h3>Trang chủ</h3></Link> 
                    <Link to="/cuahang"><h3>{sp.Product_Name}</h3></Link>
                </div>
                {showToast && <div className="toast">Đã thêm vào giỏ hàng</div>}
                <div className="spchitiet">

                    <div className="left-image">
                        <img src="../assets/img/banner4.jpg" alt="" />
                    </div>
                    <div className="right-products">
                        <div className="product-detail">
                            <div className="product-images">
                                <div className="main-image">
                                    <img id="mainImage" src={mainImage} alt="Sản phẩm" height="380px" />
                                </div>
                                <div className="thumbnail-images">
                                    {images.map((imageSrc, index) => (
                                        <img
                                            key={index}
                                            className="thumbnail"
                                            src={imageSrc}
                                            alt={`Thumbnail ${index + 1}`}
                                            width="100px"
                                            onClick={() => handleThumbnailClick(imageSrc)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="product-info">
                                <h1 className="product-title">{sp.Product_Name}</h1>
                                <hr />
                                <p className="product-description">{sp.Description.split('\n').map((desc, index) => (
                                    <li key={index}>{desc.replace('-', '')}</li>
                                ))}</p>
                                <div className="product-price">
                                    {sp.Promotion > 0 ? (
                                        <>
                                            <p className="old-price">{formatCurrency(sp.Price)}</p>
                                            <p className="new-price">{formatCurrency(sp.Price - (sp.Promotion * sp.Price) / 100)}</p>
                                        </>
                                    ) : (
                                        <p className="new-price">{formatCurrency(sp.Price)}</p>
                                    )}
                                </div>
                                <button onClick={handleAddToCart} className="btn-add-to-cart">Thêm vào giỏ</button>
                                <button onClick={handleBuyNow} className="btn-buy-now">Mua ngay</button>
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
                                        <td>{sp.Brand_Name}</td>
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        <td>
                                            <ul style={{ padding: 0, margin: 0 }}>
                                                {sp.Description.split('\n').map((desc, index) => (
                                                    <li key={index}>{desc.replace('-', '').trim()}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Comments productId={id}/>
                <div className='ralated-products'></div>
                <SPLienQuan id = {id} sosp={5}  />
            </div>
            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
