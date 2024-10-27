// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css'


function SpMoi() {
    const [listsp, ganListSP] = useState( [] );

    useEffect ( () => {
       fetch("http://localhost:3000/user/productNew")
       .then(res=>res.json())
       .then(data => {ganListSP(data);
        console.log(data)
       });
       
    } , []);

    return (
        <div className="home">
            <div className="spbanchay">
                <div className="left-image">
                    <img src="/assets/img/banner4.jpg" alt=""/>
                </div>
                <div className="right-products">
                    <div className="header1">
                        <h1>Sản phẩm mới</h1>
                        <div className="xem_them">
                            <h5>Xem thêm</h5> 
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                    <div className="product-list">
                        {listsp.map((sp, i) =>{
                            return(
                            <div className="product" key={i}>
                                <div className="discount-label">-20%</div>
                                <div className="img-wrapper">
                                    <img src={sp.Image} alt="" />
                                </div>
                                <Link to={"/productDetail/"+ sp.Product_ID}><h1>{sp.Product_Name}</h1></Link>
                                <div className="price">
                                    <p className="old-price">{sp.Price}</p>
                                    <p className="new-price">765,000đ</p>
                                </div>
                                <button className="add-to-cart">Thêm vào giỏ hàng</button>
                            </div>)}
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SpMoi;
