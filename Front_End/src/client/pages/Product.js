import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../pages/cartSlice"; // Đảm bảo đường dẫn đúng với file cartSlice

function Product({ spTrongTrang }) {
    const dispatch = useDispatch();

    const handleAddToCart = (sp) => {
        const cartItem = {
            id: sp.Product_ID,
            image: sp.Image,
            name: sp.Product_Name,
            price: sp.Price,
        };
        dispatch(addToCart(cartItem));
    };

    return (
        <div className="products-grid">
            {spTrongTrang.map((sp, i) => (
                <div className="product" key={i}>
                    <div className="discount-label">-20%</div>
                    <div className="img-wrapper">
                        <img src={sp.Image} alt="" />
                    </div>
                    <Link to={"/productDetail/" + sp.Product_ID}><h1>{sp.Product_Name}</h1></Link>
                    <div className="price">
                        <p className="old-price">{sp.Price}</p>
                        <p className="new-price">765,000đ</p>
                    </div>
                    <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>Thêm vào giỏ hàng</button>
                </div>
            ))}
        </div>
    );
}

export default Product;
