
import React, { useState } from "react";
import ReactPaginate from 'react-paginate';
import Product from '../Product';

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
            <Product spTrongTrang={spTrong1Trang} />
            {/* Chỉ hiển thị ReactPaginate nếu tổng số trang lớn hơn 1 */}
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
