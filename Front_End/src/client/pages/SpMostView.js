<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice"; // Import hành động thêm vào giỏ hàng
import '../styles/components/Home.css';

function SpMostView() {
    const [listsp, ganListSP] = useState([]);
    const dispatch = useDispatch(); // Khởi tạo useDispatch

    useEffect(() => {
        fetch("http://localhost:3000/user/productMostView")
            .then(res => res.json())
            .then(data => ganListSP(data));
    }, []);
=======
// import { listsp } from "./data";
import { Link,useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import '../styles/components/Home.css';

function SpMostView() {
    const [listsp, setListSP] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); 


    useEffect(() => {
        fetch("http://localhost:3000/user/productMostView")
            .then(res => {return res.json();})
            .then(data => {
                setListSP(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
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
>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

<<<<<<< HEAD
    const handleAddToCart = (product) => {
        const cartItem = {
            id: product.Product_ID,
            image: product.Image,
            name: product.Product_Name,
            price: product.Promotion > 0 ? product.Price - (product.Promotion * product.Price) / 100 : product.Price,
            quantity: 1 // Số lượng mặc định là 1
        };
        dispatch(addToCart(cartItem)); // Gửi hành động thêm vào giỏ hàng
    };

    return (
        <div className="spbanchay">
            <div className="left-image">
                <img src="/assets/img/banner21.png" alt=""/>
                <img src="/assets/img/banner21.png" alt=""/>
            </div>
            <div className="right-products">
                <div className="header1">
                    <p>ĐƯỢC QUAN TÂM</p>
                    <div className="xem_them">
                        <h5>Xem thêm</h5> 
                    </div>
                </div>
                <div className="box-sp">
                    {listsp.slice(0,8).map((sp, i) =>
                        <div className="product" key={i}>
                            {sp.Promotion > 0 && (
                                <div className="discount-label">
                                    -{sp.Promotion}%
=======
    
    return (
            <div className="spbanchay">
                <div className="left-image">
                    <img src="/assets/img/banner21.png" alt=""/>
                    <img src="/assets/img/banner21.png" alt=""/>

                </div>
                <div className="right-products">
                    <div className="header1">
                        <p>ĐƯỢC QUAN TÂM</p>
                        <div className="xem_them">
                            <h5>Xem thêm</h5> 
                        </div>
                    </div>
                    <div className="box-sp">
                        {listsp.slice(0,8).map((sp, i) =>

                            <div className="product" key={i}>
                                {sp.Promotion > 0 && (
                                    <div className="discount-label">
                                        -{sp.Promotion}%
                                    </div>
                                )}
                                <div className="img-wrapper">
                                    <img src={sp.Image} alt={sp.Product_Name} />
>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a
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
<<<<<<< HEAD
                                <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>Giỏ hàng</button>
                            </div>
                        </div>
                    )}
=======
                                <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>
                                    Thêm vào giỏ hàng
                                </button> 
                            </div>

                            </div>
                        )}
                    </div>
>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a
                </div>
            </div>
        </div>
    );
}

export default SpMostView;
