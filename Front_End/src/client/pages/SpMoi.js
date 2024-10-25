// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css'


function SpMoi() {
    const [listsp, ganListSP] = useState( [] );

    useEffect ( () => {
       fetch("http://localhost:3000/user/productNew")
       .then(res=>res.json()).then(data => ganListSP(data));
    } , []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    return (
            <div className="spbanchay">
                <div className="left-image">
                    <img src="/assets/img/banner20.jpg" alt=""/>
                    <img src="/assets/img/banner20.jpg" alt=""/>
                </div>
                <div className="right-products">
                    <div className="header1">
                        <h1>Sản phẩm mới</h1>
                        <div className="xem_them">
                            <h5>Xem thêm</h5> 
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                    <div className="box-sp">
                        {listsp.slice(0, 6).map((sp, i) =>
                            <div className="product" key={i}>
                                {sp.Promotion > 0 && (
                                    <div className="discount-label">
                                        -{sp.Promotion}%
                                    </div>
                                )}
                                <div className="img-wrapper">
                                    <img src={sp.Image} alt="" />
                                </div>
                                <Link to={"/productDetail/"+ sp.Product_ID}><h1>{sp.Product_Name}</h1></Link>
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
                                <button className="add-to-cart">Thêm vào giỏ hàng</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
}
export default SpMoi;
