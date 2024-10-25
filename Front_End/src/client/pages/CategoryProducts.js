import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/components/CategoryProducts.css';
function CategoryProducts() {
    const { Category_ID } = useParams();  // Lấy ID danh mục từ URL
    const [listsp, ganListSP] = useState( [] );  // Lưu danh sách sản phẩm
    const [category_Name, setCategoryName] = useState("");  // Lưu tên danh mục

    useEffect(() => {
        // Gọi API lấy danh mục theo Category_ID
        fetch(`http://localhost:3000/user/category/${Category_ID}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCategoryName(data.Category_Name);  // Lưu tên danh mục
                }
            })
            .catch(err => console.log("Lỗi lấy danh mục:", err));

        // Gọi API lấy sản phẩm thuộc danh mục
        fetch(`http://localhost:3000/user/Products/${Category_ID}`)
            .then(res => res.json())
            .then(data => {
                ganListSP(data);  // Lưu danh sách sản phẩm vào state
            })
            .catch(err => console.log("Lỗi lấy sản phẩm:", err));
    }, [Category_ID]);

    return (

        <div className="home">
            <div className="sptrongloai">
                <div className="left-image">
                    <img src="/assets/img/banner4.jpg" alt="" />
                </div>
                <div className="right-products">
                    <div className="header1">
                        <h1>Sản phẩm trong danh mục: {category_Name}</h1>
                        <div className="xem_them">
                            <h5>Xem thêm</h5> 
                            <i className="fa-solid fa-arrow-right"></i>
                        </div> 
                        </div>
                        <div className="product-list">
                        {listsp.slice(0, 4).map((sp, i) =>
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
                            </div>
                        )}
                    </div>
                    </div>
                </div>
           
        </div>
    );
}

export default CategoryProducts;
