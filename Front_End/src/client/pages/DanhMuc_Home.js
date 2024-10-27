import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Home.css'


function DanhMuc_Home() {
    const [list, ganListLoai] = useState( [] );
    useEffect ( () => {
        fetch(`http://localhost:3000/user/categoryList`)
        .then(res=>res.json())
        .then( data => ganListLoai(data) );
    } , []);
    return (
        <div className="home">
            <div className="listdanhmuc_home">
                <h1>DANH MỤC NỔI BẬT</h1>
                <div className="box">
                { list.map( (loai, index)=>{ return (
                    <div className="box-dm" key={index}>
                        <img src={loai.Category_Image} alt={loai.Category_Name} />
                        <Link to = { "/loai/" + loai.Category_ID }>{loai.Category_Name}</Link> 
                    </div>
                )})}
                </div>
            </div>
        </div>
    );
}
export default DanhMuc_Home;
