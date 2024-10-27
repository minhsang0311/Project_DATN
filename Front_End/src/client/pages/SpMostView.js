import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css';

function SpMostView() {
    const [listsp, setListSP] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

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
    
    return (
        <div className="home">
            <div className="spbanchay">
                <div className="left-image">
                    <img src="/assets/img/banner4.jpg" alt="Banner" />
                </div>
                <div className="right-products">
                    <div className="header1">
                        <h1>Sản phẩm bán chạy</h1>
                        <div className="xem_them">
                            <h5>Xem thêm</h5> 
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                    <div className="product-list">
                        {listsp.slice(0, 4).map((sp, i) => (
                            <div className="product" key={i}>
                                <div className="discount-label">-20%</div>
                                <div className="img-wrapper">
                                    <img src={sp.Image} alt={sp.Product_Name} />
                                </div>
                                <Link to={`/productDetail/${sp.Product_ID}`}>
                                    <h1>{sp.Product_Name}</h1>
                                </Link>
                                <div className="price">
                                    <p className="old-price">{sp.Price.toLocaleString()}đ</p>
                                    <p className="new-price">765,000đ</p>
                                </div>
                                <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>
                                    Thêm vào giỏ hàng
                                </button> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpMostView;
