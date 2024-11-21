const { useState, useEffect } = require("react");

const VoucherAdd = () => {
    const token = localStorage.getItem('token');
    const [voucher, setVoucher] = useState({})
    const Submit = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('Code', voucher.Code);
        formData.append('Discount', voucher.Discount);
        formData.append('Expiration_Date', voucher.Expiration_Date);
        useEffect(() => {
            fetch(`http://localhost:3000/admin/postVoucher`, {
                method: "POST",
                body: formData,
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.message){
                        alert(data.message)
                    }
                    setVoucher(data)
                })
        })
    }
    return (
        <div className="form-container-productadd">
            <div className="form-header">
                <h2>THÊM VOUCHER</h2>
            </div>
            <form action="#" className="productadd-form">
                <div className="form-group">
                    <label htmlForfor="product-name">Mã voucher</label>
                    <input
                        type="text"
                        id="product-name"
                        placeholder="Nhập mã voucher ..."
                        value={voucher.Code || ''}
                        onChange={e =>
                            setVoucher({ ...voucher, Code: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlForfor="product-name">& giảm giá</label>
                    <input
                        type="text"
                        id="product-name"
                        placeholder="Nhập tên sản phẩm ..."
                        value={voucher.Discount || ''}
                        onChange={e =>
                            setVoucher({ ...voucher, Discount: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlForfor="product-name">Hạn sử dụng</label>
                    <input
                        type="date"
                        id="product-name"
                        placeholder="Nhập tên sản phẩm ..."
                        value={voucher.Expiration_Date || ''}
                        onChange={e =>
                            setVoucher({ ...voucher, Expiration_Date: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="submit-btn" onClick={Submit}>SUBMIT</button>
            </form>
        </div>
    )
}
export default VoucherAdd;