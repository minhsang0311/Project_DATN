// import { listsp } from "./data";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css'


function SpMoi() {
    const [listsp, ganListSP] = useState( [] );
    const navigate = useNavigate(); 

    useEffect ( () => {
       fetch("http://localhost:3000/user/productKhuyenMai")
       .then(res=>res.json()).then(data => ganListSP(data));
    } , []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

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

    return (
        <div className="spkhuyenmai">
            <div className="box">
                <div className="header1">
                    <i class="fas fa-tags"></i> 
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
                            <Link to={"/productDetail/"+ sp.Product_ID}><a>{sp.Product_Name}</a></Link>
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
                                <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>
                                            Thêm vào giỏ hàng
                                        </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default SpMoi;
