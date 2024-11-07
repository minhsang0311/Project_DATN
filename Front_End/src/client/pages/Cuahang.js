import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Cuahang.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Paginate from './paginate/Paginate';// Import component phân trang

function Cuahang() {
    const [listsp, setListSP] = useState([]);
    const [filteredSP, setFilteredSP] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    // Page size for pagination
    const pageSize = 6; // Số sản phẩm mỗi trang

    useEffect(() => {
        fetch("http://localhost:3000/user/productList")
            .then(res => res.json())
            .then(data => {
                setListSP(Array.isArray(data) ? data : []);
                setFilteredSP(Array.isArray(data) ? data : []);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/user/brands")
            .then(res => res.json())
            .then(data => setBrands(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handleFilter = () => {
        let url = `http://localhost:3000/user/filteredProducts?`;

        if (minPrice) url += `minPrice=${minPrice}&`;
        if (maxPrice) url += `maxPrice=${maxPrice}&`;
        if (sortOrder) url += `sortOrder=${sortOrder}&`;
        if (brand) url += `brand=${brand}&`;

        fetch(url)
            .then(res => res.json())
            .then(data => setFilteredSP(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching filtered products:', error));
        console.log(url);
    };

    const handleClearFilters = () => {
        setBrand("");
        setMinPrice("");
        setMaxPrice("");
        setSortOrder("");
        setFilteredSP(listsp); // Reset về danh sách đầy đủ
    };

    return (
        <Fragment>
            <Header />
            <div className="cuahang">
                <div className='thanh-dieu-huong'>
                    <Link to="/"><h3>Trang chủ</h3></Link> / 
                    <Link to="/cuahang"><h3>Cửa hàng</h3></Link>
                </div>
                <div className='noidung'>
                    <div className="left_box">
                        <h4>Lọc giá</h4>
                        <button onClick={() => setSortOrder('highToLow')} className={sortOrder === 'highToLow' ? 'active' : ''}>Giá giảm dần</button>
                        <button onClick={() => setSortOrder('lowToHigh')} className={sortOrder === 'lowToHigh' ? 'active' : ''}>Giá tăng dần</button>
                        
                        <div className="price-range">
                            <input
                                type="number"
                                placeholder="Giá tối thiểu"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Giá tối đa"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <h4>Thương hiệu</h4>
                        <select onChange={(e) => setBrand(e.target.value)} value={brand}>
                            <option value="">Chọn hãng</option>
                            {brands.map((brand) => (
                                <option key={brand.Brand_ID} value={brand.Brand_ID}>
                                    {brand.Brand_Name}
                                </option>
                            ))}
                        </select>
                        <div className='loc_boloc'>
                            <button onClick={handleFilter}>Lọc</button>
                            <button onClick={handleClearFilters} className="clear-filters">Bỏ lọc</button>
                        </div>
                    </div>

                    <div className="right-products">
                        <Paginate listSP={filteredSP} pageSize={pageSize} />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default Cuahang;
