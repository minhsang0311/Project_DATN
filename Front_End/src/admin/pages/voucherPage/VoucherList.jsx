import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "../../styles/pages/voucherList.css";

const VouchersList = () => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3000/admin`;
    const [vouchers, setVouchers] = useState([]);

    // Fetch danh sách voucher
    useEffect(() => {
        fetch(`${url}/vouchers`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setVouchers(data))
            .catch(error => console.error('Error fetching voucher list:', error));
    }, [token]);

    // Hàm xóa voucher
    const deleteVoucher = (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa voucher này không?')) return;

        fetch(`${url}/vouchers/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message.includes("Không thể xóa")) {
                    alert(data.message);
                } else {
                    alert("Đã xóa voucher thành công!");
                    setVouchers(prev => prev.filter(voucher => voucher.Voucher_ID !== id));
                }
            })
            .catch(error => console.error('Error deleting voucher:', error));
    };

    return (
        <div className="box-voucherList">
            <div className="headertop-admin-voucher">
                <div className="header_admin_voucher">
                    <h2>Danh sách voucher</h2>
                    <button className="button_admin_voucher">
                        <Link to="/admin/voucherAdd">Thêm voucher</Link>
                    </button>
                </div>
            </div>
            <div className="grid-container-voucher">
                <div className="grid-header-voucher">STT</div>
                <div className="grid-header-voucher">Mã Voucher</div>
                <div className="grid-header-voucher">% Giảm Giá</div>
                <div className="grid-header-voucher">Thời Hạn</div>
                <div className="grid-header-voucher">Thao tác</div>
                {vouchers.map((voucher, index) => (
                    <Fragment key={voucher.Voucher_ID}>
                        <div className="grid-item-voucher">{index + 1}</div>
                        <div className="grid-item-voucher">{voucher.Code}</div>
                        <div className="grid-item-voucher">{voucher.Discount}%</div>
                        <div className="grid-item-voucher">{voucher.Expiration_Date}</div>
                        <div className="grid-item-voucher grid-item-button">
                            <Link to={`/admin/voucher-update/${voucher.Voucher_ID}`} className="edit-btn">✏️</Link>
                            <button onClick={() => deleteVoucher(voucher.Voucher_ID)} className="delete-btn">🗑️</button>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default VouchersList;
