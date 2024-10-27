import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "../../styles/pages/productList.css";

const ProductList = () => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    console.log("token", token);
    
    let url = `http://localhost:3000/admin`;
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        let opt = {
            method: 'GET',
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        };
        
        fetch(`${url}/productList`, opt)
            .then(res => res.json())
            .then(data => setProductList(data))
            .catch(error => console.error('Error fetching product list:', error));
    }, [token]); // Đảm bảo useEffect chạy lại khi token thay đổi

    const deleteProduct = (id) => {
        if (window.confirm('Bạn có muốn xóa sản phẩm không?') === false) return;
        
        fetch(`${url}/productDelete/${id}`, {
            method: 'DELETE',
            headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(() => window.location.href = '/admin/products')
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="box-productlist">
            <div className="headertop-admin">
                <div className="header_admin">
                    <h2>Danh sách sản phẩm</h2>
                    <button className="button_admin">
                        <Link to="/admin/product-add">Thêm sản phẩm</Link>
                    </button>
                </div>
            </div>
            <div className="grid-container">
                <div className="grid-header">STT</div>
                <div className="grid-header">Tên sản phẩm</div>
                <div className="grid-header">Hình ảnh</div>
                <div className="grid-header">Giá</div>
                <div className="grid-header">Mô tả</div>
                <div className="grid-header">Lượt xem</div>
                <div className="grid-header">Ẩn_Hiện</div>
                <div className="grid-header">Thao tác</div>
                {productList.map((product, index) => (
                    <Fragment key={index}>
                        <div className="grid-item">{product.Product_ID}</div>
                        <div className="grid-item">{product.Product_Name}</div>
                        <div className="grid-item">
                            <img src={product.Image} alt={product.Product_Name} className="product-img" />
                        </div>
                        <div className="grid-item">{Number(product.Price).toLocaleString("vi")} VNĐ</div>
                        <div className="grid-item">{product.Description}</div>
                        <div className="grid-item">{product.Views}</div>
                        <div className="grid-item">{product.Show_Hidden === 1 ? "Hiện" : "Ẩn"}</div>
                        <div className="grid-item grid-item-button">
                            <Link to={`/admin/productUpdate/${product.Product_ID}`} className="edit-btn">✏️</Link>
                            <Link className="delete-btn" onClick={() => deleteProduct(product.Product_ID)}>🗑️</Link>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
