import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Productsbycategory.css';


function Productsbycategory() {
    const [listsp, ganListSP] = useState( [] );
    let {id} = useParams();
    useEffect ( () => {
       fetch(`http://localhost:3000/productsbycategory/${id}`)
       .then(res=>res.json()).then(data => ganListSP(data));
    } , []);

    return (
        <div className="page-container">
            <div className="sidebar">
                <img src="https://thegioibepnhapkhau.vn/media/product/13307_e2rc1_320w_1.jpg" alt="Ad 1" />
                <img src="https://thegioibepnhapkhau.vn/media/product/13307_e2rc1_320w_1.jpg" alt="Ad 2" />
                <img src="https://thegioibepnhapkhau.vn/media/product/13307_e2rc1_320w_1.jpg" alt="Ad 3" />
            </div>
                <div className="bycategory">
                <div class="product-header">Sản Phẩm</div>
                    {listsp.slice(0, 12).map((sp, id) =>
                    <div className="sp" key={id}>
                            <img src={sp['Image']} alt={sp['Product_Name']} />
                            <h4><Link to={ "/product-detail/" + sp.Product_ID} > {sp['Product_Name']} </Link></h4>
                            <div className="price-container">
                            
                                <h6>{Number(sp['Price']).toLocaleString('vi-VN')} đ</h6>
                            </div>
                            <button> <Link to = {"/productDetail/"+ sp.Product_ID }>Xem sản phẩm</Link></button>
                    
                        </div>
                    )}
                </div>
                </div>
    );
}
export default Productsbycategory;