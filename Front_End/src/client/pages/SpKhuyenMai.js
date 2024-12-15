
// src/components/SpMoi.js
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice"; // Import hành động thêm vào giỏ hàng
import '../styles/components/Home.css';

function SpMoi() {
    const [listsp, ganListSP] = useState([]);
    const [sp] = useState(null);
    const [likedProducts, setLikedProducts] = useState([]);
    const dispatch = useDispatch(); // Khởi tạo useDispatch
    const [showToast, setShowToast] = useState(false);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST_URL}user/productKhuyenMai`)
            .then(res => res.json()).then(data => ganListSP(data));
        // Fetch danh sách yêu thích của người dùng
        const fetchWishlist = async () => {
            const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
            if (userId) {
                const response = await fetch(`${process.env.REACT_APP_HOST_URL}user/wishlist/${userId}`);
                const data = await response.json();
                setLikedProducts(data.map(item => item.Product_ID)); // Lưu ID sản phẩm đã yêu thích
            }
        };

        fetchWishlist();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handleAddToCart = (sp) => {
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
        <div className="spkhuyenmai">
            <div className="box">
                 {showToast && <div className="toast">Đã thêm vào giỏ hàng</div>}
                <div className="header1">
                    <i className="fas fa-tags"></i>
                    <h1>DEAL DÀNH CHO BẠN</h1>
                </div>
                <div className="box-sp">
                    {listsp.slice(0, 10).map((sp, i) =>(
                        <div className="product" key={i}>
                            {sp.Promotion > 0 && (
                                <div className="discount-label">
                                    -{sp.Promotion}%
                                </div>
                            )}
                            <div className="img-wrapper">
                                <img src={sp.Image} alt="" />
                            </div>
                            <Link to={"/productDetail/" + sp.Product_ID}><a>{sp.Product_Name}</a></Link>
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


                                <button onClick={()=> handleAddToCart(sp)} className="add-to-cart">Thêm vào giỏ</button>
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

export default SpMoi;
