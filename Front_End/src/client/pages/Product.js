import React from 'react';
import { Link } from 'react-router-dom';

function Product({ product }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    return (
        <div className="product">
            {product.Promotion > 0 && (
                <div className="discount-label">-{product.Promotion}%</div>
            )}
            <div className="img-wrapper">
                <img src={product.Image} alt={product.Product_Name} />
            </div>
            <Link to={`/productDetail/${product.Product_ID}`}>
                <p>{product.Product_Name}</p>
            </Link>
            <div className="price_giohang">
                <div className="price">
                    {product.Promotion > 0 ? (
                        <>
                            <p className="old-price">{formatCurrency(product.Price)}</p>
                            <p className="new-price">{formatCurrency(product.Price - (product.Promotion * product.Price) / 100)}</p>
                        </>
                    ) : (
                        <p className="new-price">{formatCurrency(product.Price)}</p>
                    )}
                </div>
                <button className="add-to-cart">Giỏ hàng</button>
            </div>
        </div>
    );
}

export default Product;
