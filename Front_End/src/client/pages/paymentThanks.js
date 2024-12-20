import { Fragment, useEffect, useState } from "react";
import '../styles/components/paymentThanks.css'
import { Link } from "react-router-dom";
function PaymentThanks() {
    const [getOrder, setGetOrder] = useState()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST_URL}user/getOrderReturn`, {
            method: 'GET',
            credentials: 'include', // Để gửi cookie
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch order details");
                }
                return res.json();
            })
            .then(data => {
                setGetOrder(data);
            })
            .catch(err => {
                console.error("Error fetching order details:", err);
            });
    }, []);

    console.log("get order", getOrder)
    return (
        <Fragment>
            <div class="container-paymentthanks">
                <h1 className="h1_paymentthanks">Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</h1>
                <p className="p_paymentthanks">Chúng tôi đã nhận được thanh toán của bạn và đơn hàng của bạn sẽ được xử lý ngay lập tức.</p>

                <div class="order-info">
                    <h3>Thông tin đơn hàng</h3>
                    <p><strong>Mã đơn hàng: </strong>{getOrder?.orderCode}</p>
                    <p><strong>Ngày thanh toán: </strong>{getOrder?.created_at && new Intl.DateTimeFormat('vi-VN').format(new Date(getOrder.created_at))}</p>
                    <p><strong>Tổng tiền: </strong>{Number(getOrder?.totalAmount).toLocaleString('vi')} VNĐ</p>
                </div>
                <Link to="/" className="button_paymentthnkas">Tiếp tục mua sắm</Link>
                <div class="footer">
                    <p>Chúng tôi sẽ gửi email xác nhận cho bạn ngay khi đơn hàng được xử lý.</p>
                </div>
            </div>
        </Fragment>
    )
}
export default PaymentThanks;