import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css';

function SpMostView() {
    const [listsp, setListSP] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedProducts, setLikedProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST_URL}user/productMostView`)
            .then(res => res.json())
            .then(data => {
                setListSP(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
        const fetchWishlist = async () => {
            const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
            if (userId) {
                const response = await fetch(`${process.env.REACT_APP_HOST_URL}user/wishlist/${userId}`);
                const data = await response.json();
                setLikedProducts(data.map(item => item.Product_ID)); // Lưu ID sản phẩm đã yêu thích
            }
        }
        fetchWishlist();
    }, []);

    const handleAddToCart = (product) => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = savedCart.find(item => item.Product_ID === product.Product_ID);

        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            savedCart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(savedCart));
        navigate('/cart');
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };
    const handleWishlistToggle = async (product) => {
        const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
        if (!userId) {
            alert('Bạn cần đăng nhập để thêm sản phẩm vào yêu thích!');
            return;
        }

        try {
            const isLiked = likedProducts.includes(product.Product_ID);
            const url = `${process.env.REACT_APP_HOST_URL}user/wishlist`;
            const method = isLiked ? 'DELETE' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: product.Product_ID
                }),
            });
            const data = await response.json();

            if (response.ok) {
                // Cập nhật trạng thái yêu thích
                if (isLiked) {
                    setLikedProducts(prev => prev.filter(id => id !== product.Product_ID));
                } else {
                    setLikedProducts(prev => [...prev, product.Product_ID]);
                }
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Lỗi khi thêm/xóa sản phẩm khỏi yêu thích:", error);
        }
    };

    const isProductInWishlist = (productId) => {
        return likedProducts.includes(productId);
    };
    return (
        <div className="spbanchay">
            <div className="left-image">
                <img src="/assets/img/banner21.1.jpg" alt="" />
                <img src="/assets/img/banner21.2.jpg" alt="" />
            </div>
            <div className="right-products">
                <div className="header1">
                    <p>ĐƯỢC QUAN TÂM</p>

                </div>
                <div className="box-sp">
                    {listsp.slice(0, 8).map((sp, i) => (
                        <div className="product" key={i}>
                            {sp.Promotion > 0 && (
                                <div className="discount-label">
                                    -{sp.Promotion}%
                                </div>
                            )}
                            <div className="img-wrapper">
                                <img src={sp.Image} alt={sp.Product_Name} />
                            </div>
                            <Link to={`/productDetail/${sp.Product_ID}`}>{sp.Product_Name}</Link>
                            <div className="price_giohang">
                                <div className="price">
                                    {sp.Promotion > 0 ? (
                                        <>
                                            <p className="old-price">{formatCurrency(sp.Price)}</p>
                                            <p className="new-price">{formatCurrency(sp.Price - (sp.Promotion * sp.Price) / 100)}</p>
                                        </>
                                    ) : (
                                        <p className="new-price">{formatCurrency(sp.Price)}</p>
                                    )}
                                </div>
                                <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>Giỏ hàng</button>
                                <div
                                    className={`heart-icon ${isProductInWishlist(sp.Product_ID) ? 'liked' : ''}`}
                                    onClick={() => handleWishlistToggle(sp)}
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        cursor: "pointer"
                                    }}
                                >
                                    <i
                                        className={`fa${isProductInWishlist(sp.Product_ID) ? 's' : 'r'} fa-heart`}
                                        style={{ fontSize: "24px", color: isProductInWishlist(sp.Product_ID) ? "red" : "#ccc" }}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SpMostView;
