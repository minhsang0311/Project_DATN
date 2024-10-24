
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import '../../styles/pages/productAdd.css'
const ProductAdd = () => {
    const [product, setProduct] = useState({})
    const [image, setImage] = useState(null)
    // const token = useSelector(state => state.auth.token);
    const uploadFile = (event) => {
        setImage(event.target.files[0]);
    };
    const Submit = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('Product_Name', product.Product_Name);
        formData.append('Price', product.Price);
        formData.append('Category_ID', product.Category_ID)
        formData.append('Brand_ID', product.Brand_ID)
        formData.append('Image', image);
        formData.append('Views', product.Views);
        formData.append('Description', product.Description);
        formData.append('Show_Hidden', product.Show_Hidden);
        let url = `http://localhost:3000/admin/productAdd`;
        let opt = {
            method: "post",
            body: formData,
            // headers: { 'Authorization': 'Bearer ' + token }
            headers: { 'Authorization': 'Bearer ' }
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                setProduct({})
                console.log("data", data)
                window.location.href = '/admin/products'
            })
            .catch(error => {
                console.log("Đã có lỗi thêm sản phẩm", error)
                alert("Đã có lỗi thêm sản phẩm", error)
            })
    }
    return (
        <div className="form-container-productadd">
            <div className="form-header">
                <h2>THÊM SẢN PHẨM</h2>
            </div>
            <form action="#" className="productadd-form">
                <div className="input-productadd">
                    <div className="form-group-left">
                        <div className="form-group">
                            <label htmlForfor="product-name">Tên sản phẩm</label>
                            <input
                                type="text"
                                id="product-name"
                                placeholder="Nhập tên sản phẩm ..."
                                value={product.Product_Name || ''}
                                onChange={e =>
                                    setProduct({ ...product, Product_Name: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForfor="product-price">Giá sản phẩm</label>
                            <input
                                type="number"
                                id="product-price"
                                placeholder="Nhập giá sản phẩm ..."
                                value={product.Price || ''}
                                onChange={e =>
                                    setProduct({ ...product, Price: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForfor="product-category">Chọn danh mục</label>
                            <input
                                type="number"
                                id="product-category"
                                placeholder="Chọn danh mục sản phẩm ..."
                                value={product.Category_ID || ''}
                                onChange={e =>
                                    setProduct({ ...product, Category_ID: e.target.value })
                                } />
                        </div>
                        <div className="form-group">
                            <label htmlForfor="product-category">Chọn hãng</label>
                            <input
                                type="number"
                                id="product-brand"
                                placeholder="Chọn hãng sản phẩm ..."
                                value={product.Brand_ID || ''}
                                onChange={e =>
                                    setProduct({ ...product, Brand_ID: e.target.value })
                                } />
                        </div>
                    </div>
                    <div className="form-group-right">
                        <div className="form-group">
                            <label htmlForfor="product-image">Hình sản phẩm</label>
                            <input
                                type="file"
                                id="product-image"
                                onChange={uploadFile}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForfor="product-description">Mô tả sản phẩm</label>
                            <input
                                type="text"
                                id="product-description"
                                placeholder="Nhập mô tả sản phẩm ..."
                                value={product.Description || ''}
                                onChange={e => {
                                    setProduct({ ...product, Description: e.target.value })
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForfor="product-category">Lượt xem</label>
                            <input
                                type="number"
                                id="product-view"
                                placeholder="Nhập số lượt xem ..."
                                value={product.Views || ''}
                                onChange={e =>
                                    setProduct({ ...product, Views: e.target.value })
                                } />
                        </div>
                        <div className="form-group">
                            <label>Ẩn_hiện</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value={false}
                                        onChange={e => 
                                            setProduct({...product, Show_Hidden: e.target.value})
                                        }
                                    /> Ẩn
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value={true}
                                        onChange={e => 
                                            setProduct({...product, Show_Hidden: e.target.value})
                                        }
                                    /> Hiện
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn" onClick={Submit}>SUBMIT</button>
            </form>
        </div>
    )
}
export default ProductAdd;