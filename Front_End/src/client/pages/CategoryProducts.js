import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from './Product';
import ReactPaginate from 'react-paginate';
import usePagination from "./paginate/Paginate";

function CategoryProducts() {
    const { Category_ID } = useParams();
    const [listsp, setListSP] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    const pageSize = 6; // Số sản phẩm mỗi trang
    const { spTrong1Trang, tongSoTrang, currentPage, handlePageChange } = usePagination(listsp, pageSize);

    useEffect(() => {
        fetch(`http://localhost:3000/user/Products/${Category_ID}`)
            .then(res => res.json())
            .then(data => {
                setListSP(data); // usePagination tự động reset currentPage về 0
            });
    }, [Category_ID]);

    return (
        <Fragment>
            <Header />
            <div className="cuahang">
                <h1>{categoryName}</h1>
                <div className="noidung">

                    <div className="left_box">

                      <img src="../assets/img/banner20.jpg" alt="Logo" />
                    </div>
                <div className="right-products">
                    <div className="box-sp">
                        {spTrong1Trang.map((sp, index) => (
                            <Product key={index} product={sp} />
                        ))}
                    </div>
                    {tongSoTrang > 1 && (
                        <ReactPaginate
                            pageCount={tongSoTrang}
                            forcePage={currentPage}
                            onPageChange={(event) => handlePageChange(event.selected)}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    )}
                </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CategoryProducts;
