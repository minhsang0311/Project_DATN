import React, { useState } from "react";
import ReactPaginate from 'react-paginate';
import Product from '../Product'

function Paginate({ listSP, pageSize }) {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * pageSize;
    const spTrong1Trang = listSP.slice(offset, offset + pageSize);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);

    return (
        <div>
            {/* Hiển thị sản phẩm trong trang hiện tại */}
            <div className="box-sp">
                {spTrong1Trang.map((sp, index) => (
                    <Product key={index} product={sp} />
                ))}
            </div>

            {/* Phân trang */}
            {tongSoTrang > 1 && (
                <ReactPaginate
                    nextLabel=">"
                    previousLabel="<"
                    pageCount={tongSoTrang}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            )}
        </div>
    );
}

export default Paginate;
