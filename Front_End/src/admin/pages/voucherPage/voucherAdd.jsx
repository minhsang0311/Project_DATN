import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VoucherAdd = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [voucher, setVoucher] = useState({
        Code: "",
        Discount: "",
        Expiration_Date: "",
    });

    const Submit = (evt) => {
        evt.preventDefault();

        // Kiểm tra dữ liệu trước khi gửi
        if (!voucher.Code || !voucher.Discount || !voucher.Expiration_Date) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const currentDate = new Date();
        const expirationDate = new Date(voucher.Expiration_Date);

        // Kiểm tra nếu ngày hết hạn nhỏ hơn ngày hiện tại
        if (expirationDate < currentDate) {
            alert("Ngày hết hạn của voucher phải lớn hơn ngày hiện tại.");
            return;
        }

        // Nếu dữ liệu hợp lệ, tiếp tục gửi yêu cầu đến server
        fetch(`${process.env.REACT_APP_HOST_URL}admin/postVoucher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(voucher), // Gửi dữ liệu dạng JSON
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                    if(data.message === "Thêm voucher thành công") {
                        navigate("/admin/vouchers")
                    }
                }

                // Chỉ reset form khi thêm voucher thành công
                if (data.result) {
                    setVoucher({ Code: "", Discount: "", Expiration_Date: "" });
                }
            })
            .catch((error) => {
                console.error("Lỗi thêm voucher:", error);
                alert("Lỗi kết nối đến server.");
            });
    };

    return (
        <div className="form-container-productadd">
            <div className="form-header-addproduct">
                <h2>THÊM VOUCHER</h2>
            </div>
            <form className="productadd-form" onSubmit={Submit}>
                <div className="form-group">
                    <label htmlFor="voucher-code">Mã voucher</label>
                    <input
                        type="text"
                        id="voucher-code"
                        placeholder="Nhập mã voucher ..."
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
                        placeholder="Nhập % giảm giá ..."
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
                        onChange={(e) =>
                            setVoucher({ ...voucher, Expiration_Date: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="submit-btn">
                    THÊM VOUCHER
                </button>
            </form>
        </div>
    );
};

export default VoucherAdd;
