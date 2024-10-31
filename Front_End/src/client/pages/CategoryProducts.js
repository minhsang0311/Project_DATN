import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/CategoryProducts.css';
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
            <div className="home">
                <div className="sptrongloai">
                    <div className="left-image">
                        <img src="/assets/img/banner4.jpg" alt="" />
                    </div>
                    <div className="right-products">
                        <div className="header1">
                            <h1>Sản phẩm trong danh mục: {category_Name}</h1>
                        </div>
                        <Paginate listSP={listsp} pageSize={4} />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CategoryProducts;
