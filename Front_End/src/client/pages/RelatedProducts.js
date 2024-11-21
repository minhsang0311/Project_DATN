import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch từ Redux
import { addToCart } from "./cartSlice"; // Import action addToCart từ cartSlice
import '../styles/components/sanphamlienquan.css';

const SPLienQuan = ({ id, sosp }) => {
  const [listsp, setListSP] = useState([]);
  const dispatch = useDispatch(); // Khởi tạo useDispatch
  useEffect(() => {
    fetch(`http://localhost:3000/user/san_pham_lien_quan/${id}/${sosp}`)
      .then((res) => res.json())
      .then((data) => setListSP(data));
  }, [id, sosp]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.Product_ID,
      image: product.Image,
      name: product.Product_Name,
      price: product.Promotion > 0 ? product.Price - (product.Promotion * product.Price) / 100 : product.Price,
      quantity: 1 // Mặc định là 1
    };
    dispatch(addToCart(cartItem)); // Gửi hành động thêm vào giỏ hàng
  };

  return (
    <div id="splienquan">
      <h2>Sản phẩm liên quan</h2>
      <div className="products-grid">
        {listsp.slice(0, 5).map((sp, i) =>
          <div className="product" key={i}>
            {sp.Promotion > 0 && (
              <div className="discount-label">
                -{sp.Promotion}%
              </div>
            )}
            <div className="img-wrapper">
              <img src={sp.Image} alt="" />
            </div>
            <Link to={`/productDetail/${sp.Product_ID}`}>
              <h1>{sp.Product_Name}</h1>
            </Link>
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
            <button className="add-to-cart" onClick={() => handleAddToCart(sp)}>Thêm vào giỏ hàng</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SPLienQuan;
