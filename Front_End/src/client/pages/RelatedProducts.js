import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/components/sanphamlienquan.css'


const SPLienQuan = ({ id, sosp }) => {
  const [listsp, setListSP] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/user/san_pham_lien_quan/${id}/${sosp}`)
      .then((res) => res.json())
      .then((data) => setListSP(data));
  }, [id, sosp]);

  return (
    
    <div id="splienquan">
      <h2>Sản phẩm liên quan</h2>
      <div className="products-grid">
                        {listsp.slice(0, 5).map((sp, i) =>
                            <div className="product" key={i}>
                                <div className="discount-label">-20%</div>
                                <div className="img-wrapper">
                                    <img src={sp.Image} alt="" />
                                </div>
                                <Link to={"/productDetail/" + sp.Product_ID}><h1>{sp.Product_Name}</h1></Link>
                                <div className="price">
                                    <p className="old-price">{sp.Price}</p>
                                    <p className="new-price">765,000đ</p>
                                </div>
                                <button className="add-to-cart">Thêm vào giỏ hàng</button>
                            </div>
                        )}
                    </div>
    </div>
  );
};

export default SPLienQuan;
