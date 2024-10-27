// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css'


function SpMoi() {
    const [listsp, ganListSP] = useState( [] );

    useEffect ( () => {
       fetch("http://localhost:3000/user/productNew")
       .then(res=>res.json()).then(data => {
        ganListSP(data)
        console.log("data", data);
        
    }
    );
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
                <img src="/assets/img/banner20.jpg" alt="img1"/>
                <img src="/assets/img/banner20.jpg" alt="img2"/>
            </div>
            <div className="right-products">
                <div className="header1">
                    <p>SẢN PHẨM MỚI</p>
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
                                <img src={sp.Image} alt="" />
                            </div>
                            <Link to={"/productDetail/"+ sp.Product_ID}><a href="/">{sp.Product_Name}</a></Link>
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
                                <button className="add-to-cart">Giỏ hàng</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default SpMoi;