// src/components/SpMoi.js
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice"; // Import hành động thêm vào giỏ hàng
import '../styles/components/Home.css';

function SpMoi() {
    const [listsp, ganListSP] = useState([]);
    const dispatch = useDispatch(); // Khởi tạo useDispatch

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

    const handleAddToCart = (product) => {
        const cartItem = {
            id: product.Product_ID,
            image: product.Image,
            name: product.Product_Name,
            price: product.Promotion > 0 ? product.Price - (product.Promotion * product.Price) / 100 : product.Price,
            quantity: 1 // Mặc định là 1
        };
        dispatch(addToCart(cartItem)); // Gửi hành động thêm vào giỏ hàng
    };

    return (
        <div className="spkhuyenmai">
            <div className="box">
                <div className="header1">
                    <i className="fas fa-tags"></i>
                    <h1>DEAL DÀNH CHO BẠN</h1>
                </div>
                <div className="box-sp">
                    {listsp.slice(0, 10).map((sp, i) =>
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

                                <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>Giỏ hàng</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SpMoi;
