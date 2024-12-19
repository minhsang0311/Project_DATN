import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "../../styles/pages/voucherList.css";

const VouchersList = ({ searchResults }) => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3000/admin`;
    const [vouchers, setVouchers] = useState([]);

    // Fetch voucher list
    useEffect(() => {
        if (!searchResults || searchResults.length === 0) {
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
        }
    }, [token, searchResults]);

    // Function to lock/unlock voucher
    const toggleVoucherLock = (id, expirationDate, isUsed, isLocked) => {
        const currentDate = new Date();
        const expiryDate = new Date(expirationDate);

        // Check if the voucher has been used and cannot be modified
        if (isUsed) {
            alert("Voucher đã được cung cấp cho người dùng và không thể thay đổi trạng thái.");
            return;
        }

        // Check if the voucher has expired
        if (expiryDate < currentDate) {
            alert("Voucher đã hết hạn và không thể thay đổi trạng thái.");
            return;
        }

        const action = isLocked ? 'Mở khóa' : 'Khóa';
        if (!window.confirm(`Bạn có chắc chắn muốn ${action.toLowerCase()} voucher này không?`)) {
            return;
        }

        // Gọi API để khóa/mở khóa voucher
        fetch(`${url}/vouchers/${id}/lock`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message.includes("không tồn tại")) {
                    alert(data.message);
                } else {
                    alert(`Voucher đã được ${action.toLowerCase()} thành công!`);
                    // Cập nhật lại trạng thái của voucher sau khi đã thay đổi
                    setVouchers(prev => 
                        prev.map(voucher =>
                            voucher.Voucher_ID === id ? { ...voucher, Locked: !isLocked } : voucher
                        )
                    );
                }
            })
            .catch(error => console.error("Error toggling voucher lock:", error));
    };

    const displayVouchers = searchResults && searchResults.length > 0 ? searchResults : vouchers;

    return (
        <div className="box-voucherList">
            <div className="headertop-admin-voucher">
                <div className="header_admin_voucher">
                    <h2>DANH SÁCH VOUCHER</h2>
                    <button className="button_admin_voucher">
                        <Link to="/admin/voucherAdd">THÊM VOUCHER</Link>
                    </button>
                </div>
            </div>
            <div className="grid-container-voucher">
                <div className="grid-header-voucher">STT</div>
                <div className="grid-header-voucher">Mã Voucher</div>
                <div className="grid-header-voucher">% Giảm Giá</div>
                <div className="grid-header-voucher">Thời Hạn</div>
                <div className="grid-header-voucher">Trạng thái</div>
                <div className="grid-header-voucher">Thao tác</div>
                {displayVouchers.map((voucher, index) => (
                    <Fragment key={voucher.Voucher_ID}>
                        <div className="grid-item-voucher">{index + 1}</div>
                        <div className="grid-item-voucher">{voucher.Code}</div>
                        <div className="grid-item-voucher">{voucher.Discount}%</div>
                        <div className="grid-item-voucher">
                            {voucher.Expiration_Date ? voucher.Expiration_Date.split('T')[0] : 'Không có hạn'}
                        </div>
                        <div className="grid-item-voucher">{voucher.Locked ? "Đã khóa" : "Hoạt động"}</div>
                        <div className="grid-item-voucher grid-item-button">
                            <Link
                                to={`/admin/voucherUpdate/${voucher.Voucher_ID}`}
                            >
                                ✏️
                            </Link>
                            <button
                                onClick={() => toggleVoucherLock(voucher.Voucher_ID, voucher.Expiration_Date, voucher.isUsed, voucher.Locked)} // Passing params
                                className={`delete-btn ${voucher.Locked ? "disabled" : ""}`}
                                disabled={voucher.Locked}
                            >
                                {voucher.Locked ? "Mở khóa" : "Khóa"}
                            </button>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default VouchersList;
