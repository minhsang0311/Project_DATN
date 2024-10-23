// import { listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";



function Home() {
    const [listsp, ganListSP] = useState( [] );

    useEffect ( () => {
       fetch("http://localhost:3000/admin/productList")
       .then(res=>res.json()).then(data => ganListSP(data));
    } , []);

    return (
        <div className="home">
            {listsp.slice(0, 12).map((sp, i) =>
               <div className="sp" key={i}>
                    <img src={sp['Image']} alt={sp['Product_Name']} />
                     <h4><Link to={ "productDetail/" + sp.Product_ID} > {sp['Product_Name']} </Link></h4>
                    <div className="price-container">
                      
                        <h6>{Number(sp['Price']).toLocaleString('vi-VN')} đ</h6>
                    </div>
                    <button> <Link to = {"/productDetail/"+ sp.Product_ID }>Xem sản phẩm</Link></button>
                  
                </div>
            )}
        </div>
    );
}
export default Home;
