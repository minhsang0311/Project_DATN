
// src/components/SpMoi.js
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice"; // Import hành động thêm vào giỏ hàng
import '../styles/components/Home.css';

function SpMoi() {
    const [listsp, ganListSP] = useState([]);
    const [sp] = useState(null);
    const dispatch = useDispatch(); // Khởi tạo useDispatch
    const [showToast, setShowToast] = useState(false);
    useEffect(() => {
        fetch("http://localhost:3000/user/productKhuyenMai")
            .then(res => res.json()).then(data => ganListSP(data));
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SpMoi;
