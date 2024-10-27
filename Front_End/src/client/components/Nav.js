import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/components/Nav.css';
const Nav = () =>{
    const [list, ganListLoai] = useState( [] );
    useEffect ( () => {
        fetch(`http://localhost:3000/user/categoryList`)
        .then(res=>res.json())
        .then( data => ganListLoai(data) );
    } , []);

    return(
        <div className="bottom_trangchu">
            <ul className="menu_trangchu"> 
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/cuahang">Cửa hàng</Link></li>
                { list.map( (loai, index)=>{ return (
                    <li key={index}>
                        <Link to = { "/loai/" + loai.Category_ID }>{loai.Category_Name}</Link> 
                    </li>
                )})
                }
            </ul>
        </div>
    )
}
export default Nav;