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
      <div id="data">
        {listsp.map((sp, i) => {
          return (
            <div className="sp" key={i}>
              {/* Sử dụng đúng tên trường trong JSON trả về từ API */}
              <img src={sp['Image']} alt={sp['Product_Name']} />
              <h4>
                <Link to={"/sp/" + sp['Product_ID']}> {sp['Product_Name']} </Link>
              </h4>
              <div className="price-container">
                <h4>{Number(sp['Price']).toLocaleString('vi-VN')} đ</h4>
                {/* Nếu có giá khuyến mãi */}
                {sp['gia_km'] && (
                  <h6>{Number(sp['gia_km']).toLocaleString('vi-VN')} đ</h6>
                )}
              </div>
              <button>
                <Link to={"/sp/" + sp['Product_ID']}>Xem sản phẩm</Link>
              </button>
              <p>
                {/* <a href="#" onClick={() => dispatch(themSP(sp))}>
               
                </a> */}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SPLienQuan;
