import { Link, useLocation } from "react-router-dom";
import { useState, useEffect ,Fragment} from "react";
import '../styles/components/Search.css';
import Header from '../components/Header';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Use useLocation to get the current search query from URL
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        setSearchQuery(query || "");

        if (query) {
            fetch(`http://localhost:3000/user/products_search/?query=${query}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then(data => {
                    setSearchResults(data);
                    console.log("Search results", data); // Log the fetched data
                })
                .catch(error => console.error("Error fetching search results:", error));
        } else {
            setSearchResults([]);
        }
    }, [location.search]); // Run the effect when the search query changes

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    return (
        <Fragment>
            <Header/>
        <div className="search-page">
            <div className="header1">
                <p>KẾT QUẢ TÌM KIẾM</p>
            </div>
            <div className="box-sp">
                {searchResults.length > 0 ? (
                    searchResults.map((sp, i) => (
                        <div key={i} className="product">
                            {sp.Promotion > 0 && (
                                <span className="discount-label">-{sp.Promotion}%</span>
                            )}
                            <div className="img-wrapper">
                                <img src={sp.Image} alt={sp.Product_Name} />
                            </div>
                            <Link to={`/productDetail/${sp.Product_ID}`}>{sp.Product_Name}</Link>
                            <div className="price_giohang">
                                <div className="price">
                                    {sp.Promotion > 0 ? (
                                        <>
                                            <span className="old-price">{formatCurrency(sp.Price)}</span>
                                            <span className="new-price">{formatCurrency(sp.Price - (sp.Promotion * sp.Price) / 100)}</span>
                                        </>
                                    ) : (
                                        <span className="new-price">{formatCurrency(sp.Price)}</span>
                                    )}
                                </div>
                                <button className="add-to-cart">Giỏ hàng</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào được tìm thấy.</p>
                )}
            </div>
        </div>
        </Fragment>
    );
}

export default Search;
