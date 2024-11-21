import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/Cuahang.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Paginate from './paginate/Paginate';

function CategoryProducts() {
    const { Category_ID } = useParams();
    const [listsp, ganListSP] = useState([]);
    const [category_Name, setCategoryName] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/user/category/${Category_ID}`)
            .then(res => res.json())
            .then(data => setCategoryName(data.Category_Name))
            .catch(err => console.log("Lỗi lấy danh mục:", err));

        fetch(`http://localhost:3000/user/Products/${Category_ID}`)
            .then(res => res.json())
            .then(data => ganListSP(data))
            .catch(err => console.log("Lỗi lấy sản phẩm:", err));
    }, [Category_ID]);

    return (
        <Fragment>
            <Header />
            <div className="cuahang">
                <div className="noidung">
                    <div className="left_box">

                      <img src="../assets/img/banner20.jpg" alt="Logo" />

                    </div>
                    <div className="right-products">
                        <div className="header1">
                            <h1> {category_Name}</h1>
                        </div>
                        <Paginate listSP={listsp} pageSize={6} />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CategoryProducts;
