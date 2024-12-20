import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VoucherUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const [voucher, setVoucher] = useState({
        Code: "",
        Discount: "",
        Expiration_Date: "",
        Locked: 0,
    });


    useEffect(() => {
        // Lấy chi tiết voucher
        fetch(`${process.env.REACT_APP_HOST_URL}admin/getVoucherDetail/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Lỗi tải dữ liệu voucher.");
                }
                return res.json();
            })
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                    navigate("/admin/vouchers");
                } else {
                    setVoucher(data);
                }
            })
            .catch((err) => {
                console.error("Lỗi lấy chi tiết voucher:", err);
                alert("Lỗi kết nối server.");
            })
    }, [id, token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!voucher.Code || !voucher.Discount || !voucher.Expiration_Date) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        const currentDate = new Date();
        const expirationDate = new Date(voucher.Expiration_Date);

        // Kiểm tra nếu ngày hết hạn nhỏ hơn ngày hiện tại
        if (expirationDate < currentDate) {
            alert("Ngày hết hạn của voucher phải lớn hơn ngày hiện tại.");
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/admin/putVoucher/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...voucher,
                    Locked: parseInt(voucher.Locked, 10), // Đảm bảo Locked là số
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Lỗi cập nhật voucher.");
                return;
            }

            const data = await response.json();
            alert(data.message);
            if (data.message.includes("thành công")) {
                navigate("/admin/vouchers");
            }
        } catch (err) {
            setError("Không thể kết nối đến server.");
            console.error("Lỗi cập nhật voucher:", err);
        }
    };

    return (
        <div className="form-container-productadd">
            <div className="form-header-addproduct">
                <h2>SỬA VOUCHER</h2>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form className="productadd-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="voucher-code">Mã voucher</label>
                    <input
                        type="text"
                        id="voucher-code"
                        value={voucher.Code}
                        onChange={(e) =>
                            setVoucher({ ...voucher, Code: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="voucher-discount">% giảm giá</label>
                    <input
                        type="number"
                        id="voucher-discount"
                        value={voucher.Discount}
                        onChange={(e) =>
                            setVoucher({ ...voucher, Discount: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="voucher-expiration">Hạn sử dụng</label>
                    <input
                        type="date"
                        id="voucher-expiration"
                        value={voucher.Expiration_Date}
                        onChange={(e) => {
                            const dateValue = e.target.value; // YYYY-MM-DD
                            setVoucher({ ...voucher, Expiration_Date: dateValue });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="voucher-locked">Trạng thái</label>
                    <select
                        id="voucher-locked"
                        value={voucher.Locked}
                        onChange={(e) =>
                            setVoucher({ ...voucher, Locked: parseInt(e.target.value, 10) })
                        }
                    >
                        <option value={0}>Hoạt động</option>
                        <option value={1}>Đã khóa</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">
                    CẬP NHẬT
                </button>
            </form>
        </div>
    );
};

export default VoucherUpdate;
